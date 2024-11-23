import express from "express";
import { uploadFile } from "../controllers/upload.js";

const router = express.Router();

// Define the upload route
router.post("/file", uploadFile);

export default router;
