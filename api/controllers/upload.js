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

// Middleware to handle file uploads
const uploadSingle = upload.single("file");

// Route handler for file upload
export const uploadFile = (req, res) => {
  console.log("Incoming file upload request");

  // Use the `uploadSingle` middleware to process the file
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({ error: "File upload failed", details: err });
    }

    if (!req.file) {
      console.warn("No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return full URL of the uploaded file
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log("File uploaded successfully:", fileUrl);

    res.status(200).json({ url: fileUrl });
  });
};
