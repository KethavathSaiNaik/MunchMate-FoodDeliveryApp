const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Validate for a 10-digit number
      },
      message: props => `${props.value} is not a valid contact number!`
    }
  },
  emailAddress: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v); // Simple email validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  foodType: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    enum: ['Regular', 'Large', 'Small'], // Specify valid options
    default: 'Regular',
  },
  foodCondition: {
    type: String,
    enum: ['fresh', 'expired', 'near-expiry'], // Specify valid options
    default: 'fresh',
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  pickupDateTime: {
    type: Date,
    required: true, 
  },
  specialInstructions: {
    type: String,
    default: '',
  },
  consent: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the model
const Donation = mongoose.model('Donation', foodDonationSchema);
module.exports = Donation;
