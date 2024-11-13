const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/ReviewsController');

// Route to handle review creation
router.post('/feedback', createReview);

// Route to get all reviews
router.get('/getreviews', getReviews);

module.exports = router;
