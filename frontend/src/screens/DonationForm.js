import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const DonationForm = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    contactNumber: '',
    emailAddress: '',
    foodType: '',
    quantity: 'Regular', // Default value
    foodCondition: 'fresh',
    pickupAddress: '',
    pickupDateTime: '',
    specialInstructions: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://munchmate-deploy-backend.onrender.com/donations/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Feedback Submitted successfully')
        setFormData({
            customerName: '',
            email: '', // Reset email on submit
            rating: 0,
            comment: '',
            foodQuality: 0,
            deliveryTime: 0,
            packaging: 0,
            wouldOrderAgain: false,
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log('Form Data Submitted:', formData);
    // Reset form after submission
    setFormData({
      donorName: '',
      contactNumber: '',
      emailAddress: '',
      foodType: '',
      quantity: 'Regular',
      foodCondition: 'fresh',
      pickupAddress: '',
      pickupDateTime: '',
      specialInstructions: '',
      consent: false,
    });
  };

  return (
    <>
    <Navbar/>
    <div 
      style={{
        // width: '98vw',
        // height: '100vh',
        // padding: '20px',
        // backgroundColor: '#f8f9fa',
        // marginTop:"100px"
        "backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","height":"93vh","width":"99vw","backgroundSize":"cover",marginTop:"74px"
      }}
    >
      <div className="d-flex justify-content-center align-items-center h-100" >
        <div className="card shadow-lg" style={{ width: '100%', maxWidth: '600px', height: '93vh' }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <h3 className="mb-4 text-center">Food Donation Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name:</label>
                  <input
                    type="text"
                    name="donorName"
                    className="form-control"
                    value={formData.donorName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Number:</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className="form-control"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email Address:</label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Type of Food:</label>
                  <input
                    type="text"
                    name="foodType"
                    className="form-control"
                    value={formData.foodType}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Quantity:</label>
                  <select
                    name="quantity"
                    className="form-select"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  >
                    <option value="Half">Half</option>
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Condition of Food:</label>
                  <select
                    name="foodCondition"
                    className="form-select"
                    value={formData.foodCondition}
                    onChange={handleChange}
                  >
                    <option value="fresh">Fresh</option>
                    <option value="cooked">Cooked</option>
                    <option value="packaged">Packaged</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label">Pickup Address:</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    className="form-control"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label">Preferred Pickup Date and Time:</label>
                  <input
                    type="datetime-local"
                    name="pickupDateTime"
                    className="form-control"
                    value={formData.pickupDateTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label">Special Instructions:</label>
                  <textarea
                    name="specialInstructions"
                    className="form-control"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  name="consent"
                  className="form-check-input"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" style={{'marginLeft':"20px"}}>
                  I consent to share my information with partnering NGOs.
                </label>
              </div>

              
               <button type="submit" className="btn btn-success w-100">Submit</button>
              
            </form>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default DonationForm;
