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

// Get comments for a specific post
export const getComments = [verifyToken, (req, res) => {
  const postId = req.query.postId;

  if (!postId) return res.status(400).json("Post ID is required!");

  const q = `
    SELECT c.*, u.id AS userId, u.name, u.profilePic 
    FROM comments AS c 
    JOIN users AS u ON u.id = c.userId 
    WHERE c.postId = ? 
    ORDER BY c.create_datetime DESC
  `;

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data); // Return all comments for the post
  });
}];

// Add a comment to a post
export const addComment = [verifyToken, (req, res) => {
  const postId = req.body.postId;

  if (!postId) return res.status(400).json("Post ID is required!");

  const q = `
    INSERT INTO comments(\`description\`, \`create_datetime\`, \`userId\`, \`postId\`) 
    VALUES (?)
  `;

  const values = [
    req.body.description, // Comment description
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // Current timestamp
    req.userInfo.id, // User ID from the token
    postId // Post ID for the comment
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Comment has been created.");
  });
}];

// Delete a comment
export const deleteComment = [verifyToken, (req, res) => {
  const commentId = req.params.commentId;

  if (!commentId) return res.status(400).json("Comment ID is required!");

  const q = `
    DELETE FROM comments 
    WHERE id = ? AND userId = ?
  `;

  db.query(q, [commentId, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.status(200).json("Comment has been deleted.");
    return res.status(403).json("You can delete only your own comments.");
  });
}];
