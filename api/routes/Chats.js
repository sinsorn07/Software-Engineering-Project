import express from 'express';
import { sendMessage, getMessages } from '../controllers/chat.js';

const router = express.Router();

// Define chat routes
router.post('/send', sendMessage);
router.get('/:eventId', getMessages);

export default router;
