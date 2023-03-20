const express = require('express');

const router = express.Router();

// import controller
const { chatAccess } = require('../controllers/chatApplicationData');
const { authenticate } = require('../middleware/authurize');
// import validators

router.post('/user-chat-access', authenticate, chatAccess);

module.exports = router;
