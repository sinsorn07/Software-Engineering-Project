import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

// Get posts for a specific event
router.get("/", getPosts);

// Add a new post to an event
router.post("/", addPost);

// Delete a post
router.delete("/:id", deletePost);

export default router;
