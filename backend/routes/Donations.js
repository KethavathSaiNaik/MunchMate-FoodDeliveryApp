const express = require('express');
const router = express.Router();
const { createDonation, getDonations } = require('../controllers/DonationController');

// Route to create a new donation
router.post('/donate', createDonation);

// Route to get all donations
router.get('/getdonations', getDonations);

module.exports = router;
