import express from "express"; 
import { getAllParticipantWithNoCondition } from "../controllers/participant.js";
import { getJoinedParticipant } from "../controllers/participant.js";

const router = express.Router();

// Route to get all participant
router.get("/findAll", getAllParticipantWithNoCondition);

// Route to get all participant
router.get("/joined/:eventId", getJoinedParticipant);

export default router;
