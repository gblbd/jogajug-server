const express = require('express');

const router = express.Router();

// import controller
const { sendMessageToUser, fetchMessageForAChat } = require('../controllers/messageSend');
const { authenticate } = require('../middleware/authurize');
// import validators
router.post('/send-message-to-user', authenticate, sendMessageToUser);
router.get('/fetch-message-for-chat/:chatId', authenticate, fetchMessageForAChat);

module.exports = router;
