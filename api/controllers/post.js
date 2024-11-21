import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

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

// Helper: Check if the user is a participant of the event
const isEventParticipant = (userId, eventId, callback) => {
  const q = `
    SELECT * FROM participants 
    WHERE userId = ? AND eventId = ?`;
  db.query(q, [userId, eventId], (err, data) => {
    callback(err, data.length > 0); // Returns true if the user is a participant
  });
};

// Get all posts for an event
export const getPosts = [verifyToken, (req, res) => {
  const eventId = req.query.eventId;

  if (!eventId) return res.status(400).json("Event ID is required!");

  const q = `
    SELECT p.*, u.id AS userId, u.name, u.profilePic 
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId) 
    WHERE p.eventId = ? 
    ORDER BY p.created_datetime DESC`;

  db.query(q, [eventId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}];

// Add a new post
export const addPost = [verifyToken, (req, res) => {
  const eventId = req.body.eventId;

  if (!eventId) return res.status(400).json("Event ID is required!");

  isEventParticipant(req.userInfo.id, eventId, (err, isParticipant) => {
    if (err) return res.status(500).json(err);
    if (!isParticipant) {
      return res.status(403).json("You must be a participant of this event to post!");
    }

    const q = `
      INSERT INTO posts(\`description\`, \`img\`, \`created_datetime\`, \`userId\`, \`eventId\`) 
      VALUES (?)`;

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.userInfo.id,
      eventId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
}];

// Delete a post
export const deletePost = [verifyToken, (req, res) => {
  const q = `
    DELETE FROM posts 
    WHERE id = ? AND userId = ?`;

  db.query(q, [req.params.id, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
    return res.status(403).json("You can delete only your own post.");
  });
}];
