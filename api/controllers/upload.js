import multer from "multer";
import path from "path";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

// Initialize Multer with the configured storage
const upload = multer({ storage });

// Export the upload logic as a route handler
export const uploadFile = (req, res) => {
  console.log("Incoming file upload request"); // Log to check if the request is received

  upload.single("file")(req, res, (err) => {
    console.log("Request Body:", req.body); // Log request body
    console.log("Uploaded File Metadata:", req.file); // Log file metadata

    if (err) {
      console.error("Multer Error:", err); // Log Multer-specific errors
      return res.status(500).json({ error: "File upload failed", details: err });
    }

    if (!req.file) {
      console.warn("No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({ filename: req.file.filename });
  });
};

