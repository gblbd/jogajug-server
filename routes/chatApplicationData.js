const express = require('express');

const router = express.Router();

// import controller
const {
    chatAccess,
    fetchChatData,
    createGroupChat,
} = require('../controllers/chatApplicationData');
const { authenticate } = require('../middleware/authurize');
// import validators

router.post('/user-chat-access', authenticate, chatAccess);
router.get('/fetch-chat-data', authenticate, fetchChatData);
router.post('/create-group-chat', authenticate, createGroupChat);

module.exports = router;
