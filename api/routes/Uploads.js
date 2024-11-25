import express from "express";
import { uploadFile } from "../controllers/upload.js";
import { addEvent } from "../controllers/event.js";

const router = express.Router();

// Define the upload route
router.post("/file", uploadFile);
router.post("/events", addEvent);

export default router;
