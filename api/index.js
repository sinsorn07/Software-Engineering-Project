import express from "express";
import http from "http"; // Added for WebSocket
import { Server as SocketIO } from "socket.io"; // Added for WebSocket
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import eventRoutes from "./routes/events.js";
import likeRoutes from "./routes/likes.js";
import chatRoutes from './routes/Chats.js';
import uploadRoutes from "./routes/Uploads.js";
import participantRoutes from './routes/participants.js';
import socketHandler from "./socket.js"; // Import socket.js
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'; // Added for environment variables

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app); // Server now supports WebSocket

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

// Serve static files for media uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/uploads", uploadRoutes);
app.use('/api/participant', participantRoutes);


// WebSocket handling (delegated to socket.js)
socketHandler(server);

// Start server with WebSocket support
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
