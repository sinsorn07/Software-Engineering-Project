const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');

// Define upload route
router.post('/file', uploadController.uploadFile);

module.exports = router;