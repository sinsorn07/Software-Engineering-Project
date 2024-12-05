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
  const { description, images, eventId } = req.body;

  // Validate required fields
  if (!description && (!images || images.length === 0)) {
    return res.status(400).json("Description or at least one image is required.");
  }

  const q = `
    INSERT INTO posts (\`description\`, \`img\`, \`created_datetime\`, \`userId\`, \`eventId\`)
    VALUES (?, ?, ?, ?, ?)`;

  // Convert the images array into a JSON string (or a comma-separated string if preferred)
  const imagesString = images ? JSON.stringify(images) : null;

  const values = [
    description || null, // Optional description
    imagesString,        // Store images as JSON string
    moment().format("YYYY-MM-DD HH:mm:ss"),
    req.userInfo.id,     // Get userId from the verified token
    eventId,
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Error inserting post:", err);
      return res.status(500).json("Failed to create post.");
    }
    res.status(200).json("Post has been created.");
  });
}];


export const editPost = [verifyToken, (req, res) => {
  const { description, img } = req.body; // `img` is a JSON string of image URLs
  const postId = req.params.postId;

  // Ensure the user is the owner of the post
  const verifyOwnerQuery = `SELECT userId FROM posts WHERE id = ?`;
  db.query(verifyOwnerQuery, [postId], (err, result) => {
    if (err) return res.status(500).json("Database error occurred.");
    if (result.length === 0) return res.status(404).json("Post not found.");
    if (result[0].userId !== req.userInfo.id) {
      return res.status(403).json("You can only edit your own posts.");
    }

    // Update the post
    const q = `
      UPDATE posts 
      SET description = ?, img = ? 
      WHERE id = ? AND userId = ?
    `;

    const values = [description, img, postId, req.userInfo.id];

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(403).json("You can only edit your own posts.");
      }
      return res.status(200).json("Post updated successfully.");
    });
  });
}];



// Fetch a post by its ID
export const getPostById = (req, res) => {
  const postId = req.params.postId;

  const q = `
    SELECT * FROM posts 
    WHERE id = ?
  `;

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Post not found!");
    return res.status(200).json(data[0]); // Return the post details
  });
};



// Delete a post
export const deletePost = [verifyToken, (req, res) => {
  const q = `DELETE FROM posts WHERE id = ? AND userId = ?`;

  db.query(q, [req.params.id, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(403).json("Unauthorized action.");
    res.status(200).json("Post has been deleted.");
  });
}];
