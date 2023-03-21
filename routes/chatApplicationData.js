const express = require('express');

const router = express.Router();

// import controller
const {
    chatAccess,
    fetchChatData,
    createGroupChat,
    renameGroupChatName,
    addMemberToGroup,
    removeMemberFromGroup,
} = require('../controllers/chatApplicationData');
const { authenticate } = require('../middleware/authurize');
// import validators

router.post('/user-chat-access', authenticate, chatAccess);
router.get('/fetch-chat-data', authenticate, fetchChatData);
router.post('/create-group-chat', authenticate, createGroupChat);
router.put('/rename-group-chat-name', authenticate, renameGroupChatName);
router.put('/add-member-to-group', authenticate, addMemberToGroup);
router.put('/remove-member-from-group', authenticate, removeMemberFromGroup);

module.exports = router;
