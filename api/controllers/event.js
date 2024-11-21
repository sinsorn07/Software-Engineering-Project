import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.userInfo = userInfo; // Attach user info to the request
    next();
  });
};

// Get all events (Home Page)
export const getAllEvents = (req, res) => {
  const q = `SELECT e.*, u.name AS creatorName 
             FROM events AS e 
             JOIN users AS u ON u.id = e.creator 
             ORDER BY e.start_date DESC`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data); // Send all events to the client
  });
};

// Get events joined by the user (MyEvent Page)
export const getUserEvents = [verifyToken, (req, res) => {
  const q = `SELECT e.*, u.name AS creatorName 
             FROM events AS e 
             JOIN users AS u ON u.id = e.creator 
             JOIN participants AS p ON p.eventId = e.id 
             WHERE p.userId = ? 
             ORDER BY e.start_date DESC`;

  db.query(q, [req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data); // Send events joined by the user
  });
}];

// Add a new event
export const addEvent = [verifyToken, (req, res) => {
  const { eventName, description, start_date, end_date, start_time, end_time, img } = req.body;

  // Validation for required fields
  if (!eventName || !start_date || !end_date) {
    return res.status(400).json("Required fields are missing!");
  }

  // Query to check if the event already exists
  const q = `
    SELECT * FROM events 
    WHERE eventName = ? AND creator = ? AND start_date = ? AND end_date = ?
  `;

  const values = [eventName, req.userInfo.id, start_date, end_date];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(409).json("Event already exists!"); // Return conflict error
    }

    // If no duplicate event is found, proceed to insert the new event
    const q = `
      INSERT INTO events(eventName, description, creator, start_date, end_date, start_time, end_time, img) 
      VALUES (?)
    `;

    const values = [
      eventName,
      description,
      req.userInfo.id, // Creator is the logged-in user
      start_date,
      end_date,
      start_time,
      end_time,
      img || null // Optional image
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Event has been created.");
    });
  });
}];



// Edit an event
export const editEvent = [verifyToken, (req, res) => {
  const { eventName, description, start_date, end_date, start_time, end_time, img } = req.body;

  // Validation for required fields
  if (!eventName || !start_date || !end_date) {
    return res.status(400).json("Required fields are missing!");
  }

  const q = `
    UPDATE events 
    SET eventName = ?, description = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?, img = ? 
    WHERE id = ? AND creator = ?
  `;

  const values = [
    eventName,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    img || null,
    req.params.id,  // Event ID
    req.userInfo.id // Logged-in user must be the creator
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.status(200).json("Event updated successfully.");
    return res.status(403).json("You can only edit your own events.");
  });
}];

// Delete an event
export const deleteEvent = [verifyToken, (req, res) => {
  const eventId = req.params.id; // Event ID from the route parameter

  // Query to check if the event exists and if the current user is the creator
  const qCheck = `
    SELECT * FROM events WHERE id = ? AND creator = ?
  `;
  
  db.query(qCheck, [eventId, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(403).json("You can only delete your own events or this event does not exist.");

    // Query to delete the event
    const qDelete = `
      DELETE FROM events WHERE id = ?
    `;

    db.query(qDelete, [eventId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Event has been deleted.");
    });
  });
}];

// Join an event
export const joinEvent = [verifyToken, (req, res) => {
  const qCheck = "SELECT * FROM participants WHERE userId = ? AND eventId = ?";
  const values = [req.userInfo.id, req.body.eventId];

  // Check for duplicate entry
  db.query(qCheck, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(400).json("You have already joined this event.");

    const q = "INSERT INTO participants(userId, eventId) VALUES (?)";
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Successfully joined the event.");
    });
  });
}];

// Leave an event
export const leaveEvent = [verifyToken, (req, res) => {
  const q = "DELETE FROM participants WHERE userId = ? AND eventId = ?";
  const values = [req.userInfo.id, req.body.eventId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.status(200).json("Successfully left the event.");
    return res.status(403).json("You are not part of this event.");
  });
}];

// Check if the user is a participant of an event
export const isParticipant = [verifyToken, (req, res) => {
  const q = "SELECT * FROM participants WHERE userId = ? AND eventId = ?";
  const values = [req.userInfo.id, req.query.eventId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.length > 0); // Return true if user is a participant
  });
}];
