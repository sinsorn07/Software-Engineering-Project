import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.userInfo = userInfo;
    next();
  });
};

// Get all posts for a specific user or event
export const getPosts = [verifyToken, (req, res) => {
  const { userId } = req.query; // Filter by userId

  const q = `
    SELECT p.*, u.name, u.profilePic 
    FROM posts AS p
    JOIN users AS u ON u.id = p.userId
    WHERE p.userId = ? 
    ORDER BY p.created_datetime DESC`;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
}];

// Add a new post
export const addPost = [verifyToken, (req, res) => {
  const { desc, img, eventId } = req.body;

  const q = `
    INSERT INTO posts (\`description\`, \`img\`, \`created_datetime\`, \`userId\`, \`eventId\`)
    VALUES (?, ?, ?, ?, ?)`;

  const values = [desc, img, moment().format("YYYY-MM-DD HH:mm:ss"), req.userInfo.id, eventId];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Post has been created.");
  });
}];

// Delete a post
export const deletePost = [verifyToken, (req, res) => {
  const q = `DELETE FROM posts WHERE id = ? AND userId = ?`;

  db.query(q, [req.params.id, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(403).json("Unauthorized action.");
    res.status(200).json("Post has been deleted.");
  });
}];
