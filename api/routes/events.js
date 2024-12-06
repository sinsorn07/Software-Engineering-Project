import express from "express";
import { getAllEvents, getUserEvents, getEventById, addEvent, editEvent, deleteEvent, joinEvent, leaveEvent, isParticipant } from "../controllers/event.js";

const router = express.Router();

// Get all events (Home Page)
router.get("/", getAllEvents);

// Get events joined by the user (MyEvent Page)
router.get("/user", getUserEvents);

// Get a specific event by ID
router.get("/:eventId", getEventById);

// Add a new event
router.post("/", addEvent);

// Edit an existing event
router.put("/:eventId", editEvent);

// Join an event
router.post("event/join", joinEvent);

// Leave an event
router.post("/leave", leaveEvent);

// Check if the user is a participant of an event
router.get("/is-participant", isParticipant);

// Delete an event 
router.delete("/:eventId", deleteEvent);

export default router;
