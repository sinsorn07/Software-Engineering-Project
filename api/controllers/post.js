import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!"); // Unauthorized if no token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Forbidden if token is invalid
    req.userInfo = userInfo; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Get all posts for a specific user or event
export const getPosts = [verifyToken, (req, res) => {
  const { userId, eventId } = req.query; // Extract userId and eventId from query parameters

  // Base SQL query
  let query = `
    SELECT 
      p.*, 
      u.username AS userName, 
      u.profilePic AS profilePic, 
      e.eventName 
    FROM 
      posts AS p
    JOIN 
      users AS u ON u.id = p.userId
    LEFT JOIN 
      events AS e ON e.id = p.eventId
  `;

  // Dynamic query conditions
  const conditions = [];
  const values = [];

  // Add conditions based on filters
  if (userId) {
    conditions.push("p.userId = ?");
    values.push(userId);
  }
  if (eventId) {
    conditions.push("p.eventId = ?");
    values.push(eventId);
  }

  // Append WHERE clause if conditions exist
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Append ORDER BY clause
  query += " ORDER BY p.created_datetime DESC";

  // Execute the query
  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err); // Handle database error
    res.status(200).json(data); // Return query results
  });
}];

// Add a new post
export const addPost = [verifyToken, (req, res) => {
  const { desc, img, eventId } = req.body;

  // Ensure required fields are provided
  if (!desc || !eventId) {
    return res.status(400).json("Description and eventId are required!"); // Bad request
  }

  const query = `
    INSERT INTO posts (\`description\`, \`img\`, \`created_datetime\`, \`userId\`, \`eventId\`)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [desc, img || null, moment().format("YYYY-MM-DD HH:mm:ss"), req.userInfo.id, eventId];

  db.query(query, values, (err) => {
    if (err) return res.status(500).json(err); // Internal server error
    res.status(200).json("Post has been created."); // Post created successfully
  });
}];

// Delete a post
export const deletePost = [verifyToken, (req, res) => {
  const query = `DELETE FROM posts WHERE id = ? AND userId = ?`;

  db.query(query, [req.params.id, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err); // Internal server error
    if (data.affectedRows === 0) {
      return res.status(403).json("Unauthorized action."); // Forbidden if no matching rows
    }
    res.status(200).json("Post has been deleted."); // Post deleted successfully
  });
}];
