import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get all users who liked a post
export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId)); // Return an array of userIds
  });
};

// Add a like to a post
export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Check if the user has already liked the post
    const checkQuery = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
    db.query(checkQuery, [userInfo.id, req.body.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) return res.status(400).json("Post already liked!");

      // If not liked, insert a new like
      const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
      const values = [userInfo.id, req.body.postId];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
      });
    });
  });
};

// Remove a like from a post
export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.status(200).json("Post has been disliked.");
      } else {
        return res.status(400).json("Like not found or already removed.");
      }
    });
  });
};
