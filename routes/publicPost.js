const express = require('express');

const router = express.Router();

// import controller
const { publicPostData, publicPostDataShow } = require('../controllers/publicPost');
const { authenticate } = require('../middleware/authurize');
// import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/user-public-post', authenticate, publicPostData);
router.get('/public-post-data-show', authenticate, publicPostDataShow);

module.exports = router;
