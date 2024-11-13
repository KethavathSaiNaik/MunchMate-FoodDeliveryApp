const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
    try {
        await Review.create({
            customerName: req.body.customerName,
            email: req.body.email,
            rating: req.body.rating,
            comment: req.body.comment,
            itemOrdered: req.body.itemOrdered,
            foodQuality: req.body.foodQuality,
            deliveryTime: req.body.deliveryTime,
            packagingTime: req.body.packaging,
            wouldOrderAgain: req.body.wouldOrderAgain,
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to fetch reviews' });
    }
};

module.exports = {
    createReview,
    getReviews,
};
