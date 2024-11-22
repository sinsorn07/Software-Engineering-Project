import express from "express";
import { getAllEvents, getUserEvents, addEvent, editEvent, deleteEvent, joinEvent, leaveEvent, isParticipant } from "../controllers/event.js";

const router = express.Router();

// Get all events (Home Page)
router.get("/", getAllEvents);

// Get events joined by the user (MyEvent Page)
router.get("/user", getUserEvents);

// Add a new event
router.post("/", addEvent);

// Edit an existing event
router.put("/:id", editEvent);

// Join an event
router.post("/join", joinEvent);

// Leave an event
router.post("/leave", leaveEvent);

// Check if the user is a participant of an event
router.get("/is-participant", isParticipant);

// Delete an event 
router.delete("/:id", deleteEvent);

export default router;
