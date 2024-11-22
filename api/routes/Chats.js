const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

// Define chat routes
router.post('/send', chatController.sendMessage);
router.get('/:groupId', chatController.getMessages);

module.exports = router;