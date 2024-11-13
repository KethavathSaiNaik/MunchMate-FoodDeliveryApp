const Donation = require('../models/Donation');

// Create a new donation
const createDonation = async (req, res) => {
    try {
        await Donation.create({
            donorName: req.body.donorName,
            contactNumber: req.body.contactNumber,
            emailAddress: req.body.emailAddress,
            foodType: req.body.foodType,
            quantity: req.body.quantity || 'Regular',
            foodCondition: req.body.foodCondition || 'fresh',
            pickupAddress: req.body.pickupAddress,
            pickupDateTime: req.body.pickupDateTime,
            specialInstructions: req.body.specialInstructions || '',
            consent: req.body.consent || false,
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};

// Get all donations
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find(); // Fetch all donations
        res.status(200).json(donations); // Respond with the donations
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
};

module.exports = {
    createDonation,
    getDonations,
};
