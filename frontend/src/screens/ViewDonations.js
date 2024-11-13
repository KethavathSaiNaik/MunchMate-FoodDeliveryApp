// ViewDonations.js
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';
const ViewDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSendEmail = async () => {
        const emailDetails = {
            recipientEmail: 'sainaik499@gmail.com', // Replace with actual recipient email
            subject: 'Hello from MunchMate!',
            message: 'Donation coordination',
        };

        try {
            const response = await axios.post('https://munchmate-deploy-backend.onrender.com/email/send-email', emailDetails);
            if (response.data.success) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
        }
    };


    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch('https://munchmate-deploy-backend.onrender.com/donations/getdonations'); // Fetch donations from the backend
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Parse the JSON data
                setDonations(data); // Update the state with the fetched donations
            } catch (err) {
                setError('Failed to fetch donations'); // Handle errors
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchDonations();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>; // Loading state
    if (error) return <div className="text-danger">{error}</div>; // Error state

    return (
        <>
            <AdminNavbar />
            <div style={{"backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","width":"100vw","backgroundSize":"cover",'height':"100vh"}}>
            <div className="container mt-4" style={{ "margin": "250px !important" }}>
                <h2 className="text-center mb-4">Food Donations</h2>
                <div className="row">
                    {donations.map((donation) => (
                        <div className="col-md-4 mb-4" key={donation._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{donation.foodType}</h5>
                                    <p className="card-text">
                                        <strong>Donor:</strong> {donation.donorName}
                                    </p>
                                    <p className="card-text">
                                        <strong>Contact:</strong> {donation.contactNumber}
                                    </p>
                                    <p className="card-text">
                                        <strong>Email:</strong> {donation.emailAddress}
                                    </p>
                                    <p className="card-text">
                                        <strong>Quantity:</strong> {donation.quantity}
                                    </p>
                                    <p className="card-text">
                                        <strong>Condition:</strong> {donation.foodCondition}
                                    </p>
                                    <p className="card-text">
                                        <strong>Pickup Address:</strong> {donation.pickupAddress}
                                    </p>
                                    <p className="card-text">
                                        <strong>Pickup Date:</strong> {new Date(donation.pickupDateTime).toLocaleString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>Special Instructions:</strong> {donation.specialInstructions || 'N/A'}
                                    </p>
                                    <p className="card-text">
                                        <strong>Consent:</strong> {donation.consent ? 'Yes' : 'No'}
                                    </p>
                                    <div style={{"display":"flex",justifyContent:'center',alignItems:'center'}}
                                    
                                    ><button className='btn btn-success' onClick={handleSendEmail}>Send Mail to NGOs</button></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};

export default ViewDonations;
