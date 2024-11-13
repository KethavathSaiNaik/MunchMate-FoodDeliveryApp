const express = require('express');
const { sendEmail } = require('../controllers/MailController');
const router = express.Router();

// POST route for sending an email
router.post('/send-email', sendEmail);

module.exports = router;
