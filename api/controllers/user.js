import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get user profile information
export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0]; // Exclude the password field
    return res.json(info); // Send user profile data without password
  });
};

// Update user profile
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      UPDATE users 
      SET username = ?, email = ?, name = ?, description = ?, profilePic = ?, coverPic = ? 
      WHERE id = ?
    `;

    const values = [
      req.body.username || userInfo.username,  // Using existing username if not provided
      req.body.email || userInfo.email,        // Using existing email if not provided
      req.body.name || userInfo.name,          // Using existing name if not provided
      req.body.description || userInfo.description, // Optional description
      req.body.profilePic || userInfo.profilePic, // Optional profile picture
      req.body.coverPic || userInfo.coverPic,   // Optional cover picture
      userInfo.id, // User ID from the token
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.json("User profile updated successfully.");
      }
      return res.status(403).json("You can update only your own profile!");
    });
  });
};
