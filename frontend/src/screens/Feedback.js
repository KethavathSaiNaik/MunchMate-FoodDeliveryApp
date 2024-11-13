import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Feedback = () => {
    const {item}=useParams()
    const [formData, setFormData] = useState({
        customerName: '',
        email: '', // New email field
        rating: 0,
        itemOrdered:item,
        comment: '',
        foodQuality: 0,
        deliveryTime: 0,
        packaging: 0,
        wouldOrderAgain: false,
    });

    useEffect(() => {
        // Get email from localStorage and set it in formData
        const emailFromLocalStorage = localStorage.getItem('userEmail'); // Get the email from localStorage
        if (emailFromLocalStorage) {
            setFormData((prevData) => ({
                ...prevData,
                email: emailFromLocalStorage, // Set email from localStorage
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(formData);
        
        fetch('https://munchmate-deploy-backend.onrender.com/customer/feedback', {
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
    };

    return (
        <div style={{backgroundImage: 'url("https://hungerbay.com/assets/images/b6.jpg")', height: '130vh', backgroundSize: 'cover' }}>
        <Navbar/>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' ,'position':'relative','top':'100px'}}
        
        
        
        >
            <div className="card shadow" style={{ width: '100%', maxWidth: '600px' }}>
                <div className="card-body">
                    <h2 className="text-center">Submit Your Feedback</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="customerName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="rating">Rating (out of 5)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="foodQuality">Food Quality (out of 5)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="foodQuality"
                                name="foodQuality"
                                value={formData.foodQuality}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="deliveryTime">Delivery Time (out of 5)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="deliveryTime"
                                name="deliveryTime"
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="packaging">Packaging (out of 5)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="packaging"
                                name="packaging"
                                value={formData.packaging}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>

                        <div className="form-group form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wouldOrderAgain"
                                name="wouldOrderAgain"
                                checked={formData.wouldOrderAgain}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="wouldOrderAgain">
                                Would you order again?
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Feedback;
