const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateUserPassword } = require('../controllers/ProfileController');
const fetch=require("../middleware/fetch")
// Route to get user profile by email
router.get('/profile', fetch,getUserProfile);

// Route to update user profile
router.put('/updateprofile',fetch, updateUserProfile);

// Route to update user password
router.put('/updatepassword',fetch,updateUserPassword);

module.exports = router;
