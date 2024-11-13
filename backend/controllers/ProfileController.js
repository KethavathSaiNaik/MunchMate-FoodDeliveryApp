const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// Get user profile by email
const getUserProfile = async (req, res) => {
    const { email } = req.query; // Extract email from query parameters

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            name: user.name,
            email: user.email,
            location: user.location, // Assuming location is a field in your User model
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile (name and location)
const updateUserProfile = async (req, res) => {
    const { name, location } = req.body;
    const { email } = req.query;

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { name, location },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

// Update user password
const updateUserPassword = async (req, res) => {
    const { email } = req.query;
    const { password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update password' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
};
