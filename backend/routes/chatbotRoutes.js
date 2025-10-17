const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// POST /api/messages - Handle new messages
router.post('/', chatbotController.handleMessage);

// GET /api/messages/:sessionId - Get chat history
router.get('/:sessionId', chatbotController.getChatHistory);

module.exports = router;
