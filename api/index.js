import express from "express";
const app = express();
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/Users.js";
import postRoutes from "./routes/Posts.js";
import commentRoutes from "./routes/Comments.js";
import likeRoutes from "./routes/Likes.js";
import eventRoutes from "./routes/events.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";  // Import Multer

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json()); // Receiving json objects (data of users) from login/register pages
app.use(
    cors({
        origin: "http://localhost:3000",  // Adjust based on your frontend URL
    })
);
app.use(cookieParser());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // Folder where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);  // Using timestamp for unique filename
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

app.listen(8800, () => {
    console.log("API working");
});
