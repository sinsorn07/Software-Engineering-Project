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
    const { description, images, eventId } = req.body;

    // Validate required fields
    if (!description && (!images || images.length === 0)) {
        return res.status(400).json("Description or at least one image is required.");
    }

    // Ensure required fields are provided
    if (!description || !eventId) {
        return res.status(400).json("Description and eventId are required!"); // Bad request
    }

    const query = `
    INSERT INTO posts (\`description\`, \`img\`, \`created_datetime\`, \`userId\`, \`eventId\`)
    VALUES (?, ?, ?, ?, ?)
  `;


    // Convert the images array into a JSON string (or a comma-separated string if preferred)
    const imagesString = images ? JSON.stringify(images) : null;

    // Insert a new post into the database
    const values = [
        description || null,                           // Optional description
        images ? JSON.stringify(images) : null,       // Store images as JSON string
        moment().format("YYYY-MM-DD HH:mm:ss"),       // Current timestamp
        req.userInfo.id,                              // Get userId from the verified token
        eventId,                                      // Associated event ID
    ];

    // Execute the database query
    db.query(query, values, (err) => {
        if (err) {
            console.error("Error inserting post:", err);
            return res.status(500).json("Failed to create post."); // Internal server error
        }
        res.status(200).json("Post has been created."); // Success response
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
    const query = `DELETE FROM posts WHERE id = ? AND userId = ?`;
    console.log("Delete request received for post ID:", req.params.id);

    db.query(query, [req.params.id, req.userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err); // Internal server error
        if (data.affectedRows === 0) {
            return res.status(403).json("Unauthorized action."); // Forbidden if no matching rows
        }
        res.status(200).json("Post has been deleted."); // Post deleted successfully
    });
}];
