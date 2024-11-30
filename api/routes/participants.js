import express from "express"; 
import { getAllParticipantWithNoCondition } from "../controllers/participant.js";

const router = express.Router();

// Route to get all participant
router.get("/findAll", getAllParticipantWithNoCondition);


export default router;
