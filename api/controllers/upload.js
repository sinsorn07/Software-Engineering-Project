const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Single file upload
exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, err => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
};