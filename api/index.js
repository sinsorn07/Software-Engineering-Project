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
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'; // Added for environment variables

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app); // Server now supports WebSocket

// Initialize WebSocket server
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// WebSocket event handling for real-time messaging
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("message", (data) => {
    io.to(data.groupId).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json()); // Receiving JSON objects (data of users) from login/register pages
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

// Serve static files for media uploads
app.use("/uploads", express.static("uploads")); // Retain this for serving static files


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/uploads", uploadRoutes);


// Start server with WebSocket support
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
