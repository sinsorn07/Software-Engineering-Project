import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.userInfo = userInfo; // Attach user info to the request
      next();
    });
  };

// Get all Participants (Home Page)
export const getAllParticipantWithNoCondition = (req, res) => {
    const q = `
      SELECT * FROM meetro.participants;
    `;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);  // Handle any errors during the query
      return res.status(200).json(data);  // Return the participant data to the client
    });
  };

export const getJoinedParticipant = (req, res) => {
  const eventId = req.params.eventId; // Get event ID from URL parameter
  console.log("Fetching participants for event ID:", eventId);

  const query = `
    SELECT p.*, u.username as participantName, u.profilePic as participantImg, e.id as eventId
    FROM users u
    JOIN participants p ON p.userId = u.id
    JOIN events e ON p.eventId = e.id
    WHERE e.id = ?;
  `;
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error("SQL error fetching participant details:", err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Send back the detailed information for all participants
    return res.status(200).json({ participant: results });
  });
};
  