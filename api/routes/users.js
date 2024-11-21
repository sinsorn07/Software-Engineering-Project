import express from "express"; 
import { getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

// Route to get user profile by userId
router.get("/find/:userId", getUser);

// Route to update user profile
router.put("/", updateUser);

export default router;
