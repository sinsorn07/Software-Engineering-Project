import express from "express";
import { getPosts, getPostById, addPost, editPost, deletePost } from "../controllers/post.js";

const router = express.Router();

// Get posts for a specific event
router.get("/", getPosts);

// Route to fetch a post by its ID
router.get("/:postId", getPostById);

// Add a new post to an event
router.post("/", addPost);

// Edit a post of an event
router.put("/:postId", editPost);

// Delete a post
router.delete("/:id", deletePost);



export default router;
