import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get user profile information
export const getUser = (req, res) => {
  const userId = req.params.userId; // Get user ID from the URL parameter
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Database Error:", err); // Log any database errors
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      console.warn("User not found for ID:", userId); // Log if no user is found
      return res.status(404).json("User not found");
    }
    const { password, ...info } = data[0]; // Exclude the password field
    return res.json(info); // Send user profile data without the password
  });
};

// Update user profile
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken; // Get the token from cookies
  if (!token) {
    console.error("Authentication token is missing."); // Log if token is missing
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      console.error("Invalid token:", err); // Log if token verification fails
      return res.status(403).json("Token is not valid!");
    }

    console.log("User Info from Token:", userInfo); // Log the decoded user information

    const q = `
      UPDATE users 
      SET username = ?, email = ?, name = ?, description = ?, profilePic = ?, coverPic = ? 
      WHERE id = ?
    `;

    const values = [
      req.body.username || userInfo.username, // Default to token value if not provided
      req.body.email || userInfo.email || "",       // Default to token value if not provided
      req.body.name || userInfo.name,         // Default to token value if not provided
      req.body.description || userInfo.description, // Optional description
      req.body.profilePic || userInfo.profilePic,   // Optional profile picture
      req.body.coverPic || userInfo.coverPic,       // Optional cover picture
      userInfo.id, // User ID from the token
    ];

    console.log("Query Values:", values); // Log the values being sent to the database

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database Error:", err); // Log database query errors
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.json("User profile updated successfully.");
      }
      console.warn("No rows were updated. Check if the user ID exists.");
      return res.status(403).json("You can update only your own profile!");
    });
  });
};
