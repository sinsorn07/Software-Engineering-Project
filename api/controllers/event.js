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
  const q = `
    SELECT e.*, u.name AS creatorName, l.locationName, l.link,
           (SELECT COUNT(*) FROM participants WHERE eventId = e.id) AS participantCount
    FROM events AS e
    JOIN users AS u ON u.id = e.creator
    LEFT JOIN location AS l ON l.eventId = e.id
    ORDER BY participantCount DESC, e.start_date DESC
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data); // Send all events to the client
  });
};

//get all joined events (My event)

export const getUserEvents = [verifyToken, (req, res) => {
  const { selectedDate } = req.query;

  // Validate selectedDate format
  if (selectedDate && !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
    return res.status(400).json("Invalid date format.");
  }

  // Base query
  let q = `
    SELECT e.*, u.name AS creatorName, l.locationName, l.link,
           (SELECT COUNT(*) FROM participants WHERE eventId = e.id) AS participantCount
    FROM events AS e
    JOIN users AS u ON u.id = e.creator
    JOIN participants AS p ON p.eventId = e.id
    LEFT JOIN location AS l ON l.eventId = e.id
    WHERE p.userId = ?
  `;

  const values = [req.userInfo.id];

  // Add date filter if selectedDate is provided
  if (selectedDate) {
    q += ` AND ? BETWEEN DATE(e.start_date) AND DATE(e.end_date)`;
    values.push(selectedDate);
  }
  q += ` ORDER BY participantCount DESC, e.start_date DESC`;


  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    // If no events, return empty array with consistent format
    if (!data || data.length === 0) {
      console.log("No events available for the user.");
      return res.status(200).json([]);
    }

    // Helper function to convert UTC to Thailand time
    const convertToThailandTime = (utcDate) => {
      const date = new Date(utcDate);
      const thailandTimeOffset = 7 * 60 * 60 * 1000; // UTC+7 offset in milliseconds
      return new Date(date.getTime() + thailandTimeOffset);
    };

    // Generate date ranges including the last day, in Thailand time
    const expandedEvents = data.map((event) => {
      const startDate = convertToThailandTime(event.start_date);
      const endDate = convertToThailandTime(event.end_date);

      if (isNaN(startDate) || isNaN(endDate)) {
        console.error("Invalid date for event:", event);
        return { ...event, dateRange: [] };
      }

      // Calculate the date range (Thailand time)
      const dateRange = [];
      for (
        let d = new Date(startDate);
        d <= new Date(new Date(endDate).setDate(new Date(endDate).getDate())); 
        d.setDate(d.getDate() + 1)
      ) {
        dateRange.push(d.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      }

      return {
        ...event,
        start_date: startDate.toISOString(), // Return Thailand start_date
        end_date: endDate.toISOString(),     // Return Thailand end_date
        dateRange,
      };
    });

    console.log("Expanded events with date ranges (Thailand time):", expandedEvents);
    return res.status(200).json(expandedEvents);
  });
}];

// Fetch event details by ID
export const getEventById = (req, res) => {
  const eventId = req.params.eventId; // Get event ID from URL parameter
  const q = "SELECT * FROM events WHERE id = ?"; // Query to fetch event details

  db.query(q, [eventId], (err, data) => {
    if (err) return res.status(500).json(err); // Handle database errors
    if (data.length === 0) return res.status(404).json("Event not found!"); // Handle event not found
    return res.status(200).json(data[0]); // Return event details
  });
};


// Add a new event
export const addEvent = [verifyToken, (req, res) => {
  const { eventName, description, start_date, end_date, start_time, end_time, img, location_name, link } = req.body;

  // Validation for required fields
  // if (!eventName || !start_date || !end_date || !location_name || !link) {
  //   return res.status(400).json("Required fields are missing!");
  // }

  // Query to check if the event already exists
  const q = `
    SELECT * FROM events 
    WHERE eventName = ? AND creator = ? AND start_date = ? AND end_date = ?
  `;

  const values = [eventName, req.userInfo.id, start_date, end_date];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(409).json("Event already exists!");
    }

    // Insert into events table
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

      const eventId = data.insertId; // Get the newly created event ID

      // Insert into location table
      const q = `
        INSERT INTO location(location_name, link, eventId)
        VALUES (?, ?, ?)
      `;

      const values = [location_name, link, eventId];

      db.query(q, values, (err, locationResult) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Event has been created.");
      });
    });
  });
}];





// Edit an event
export const editEvent = [verifyToken, (req, res) => {
  const { eventName, description, start_date, end_date, start_time, end_time, img, location_name, link } = req.body;

  // Validation for required fields
  if (!eventName || !start_date || !end_date) {
    return res.status(400).json("Required fields are missing!");
  }

  // Update event details in the events table
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
    req.params.eventId,  // Event ID
    req.userInfo.id // Logged-in user must be the creator
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows > 0) {
      // If location details are provided, update them in the location table
      if (location_name && link) {
        const locationUpdateQuery = `
          UPDATE location 
          SET location_name = ?, link = ? 
          WHERE eventId = ?
        `;
        const locationUpdateValues = [location_name, link, req.params.eventId];

        db.query(locationUpdateQuery, locationUpdateValues, (err) => {
          if (err) return res.status(500).json({ error: "Event updated, but location update failed", details: err });
        });
      }

      return res.status(200).json("Event updated successfully.");
    }

    return res.status(403).json("You can only edit your own events.");
  });
}];


// Delete an event
export const deleteEvent = [verifyToken, (req, res) => {
  const eventId = req.params.eventId; // Event ID from the route parameter

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
