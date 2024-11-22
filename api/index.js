import express from "express";
import http from "http"; // Added for WebSocket
import { Server as SocketIO } from "socket.io"; // Added for WebSocket
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/Users.js";
import postRoutes from "./routes/Posts.js";
import commentRoutes from "./routes/Comments.js";
import likeRoutes from "./routes/Likes.js";
import eventRoutes from "./routes/Events.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer"; // Import Multer
import 'dotenv/config'; // Added for environment variables

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app); // Server now supports WebSocket

// Initialize WebSocket server
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
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
app.use(express.json()); // Receiving json objects (data of users) from login/register pages
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
  })
);
app.use(cookieParser());

// Serve static files for media uploads
app.use('/uploads', express.static('uploads')); // Added for serving static files

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Using timestamp for unique filename
  },
});

const upload = multer({ storage: storage });

// Upload Route for files
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json("No file uploaded");
  }
  res.status(200).json({ filename: file.filename });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/events", eventRoutes);

// Start server with WebSocket support
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
