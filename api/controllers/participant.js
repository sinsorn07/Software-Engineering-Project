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