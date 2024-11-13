import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://munchmate-deploy-backend.onrender.com/customer/getreviews'); // Adjust the URL based on your API
                const data = await response.json();
                if (data.success) {
                    setReviews(data.data); // Set the fetched reviews to state
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchReviews(); // Call the fetch function
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ); // Loading state with centered spinner
    if (error) return <div>Error: {error}</div>; // Error state

    return (
        <>
            <AdminNavbar />
            <div style={{"backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","width":"100vw","backgroundSize":"cover"}}>
            <div className="container" >
                <h2 className="text-center my-4">Customer Reviews</h2>
                <div className="row">
                    {reviews.map((review) => (
                        <div key={review._id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card shadow">
                                <div className="card-body text-center"> 
                                    <h5 className="card-title" style={{ color: 'green', fontWeight: 'bold' }}>From : {review.customerName}</h5> 
                                    <h6 className="card-subtitle mb-2" style={{ color: 'green', fontWeight: 'bold' }}> item ordered : {review.itemOrdered}</h6> 
                                    <h6 className="card-subtitle mb-2" style={{ color: 'green', fontWeight: 'bold' }}> Email : {review.email}</h6> 
                                </div>
                                <div className="card-body">
                                    <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>{review.comment}</p> 
                                    <p style={{ fontWeight: 'bold', color: 'black' }}>Rating: {review.rating}/5</p> 
                                    <p style={{ fontWeight: 'bold', color: 'black' }}>Food Quality: {review.foodQuality}/5</p> 
                                    <p style={{ fontWeight: 'bold', color: 'black' }}>Delivery Time: {review.deliveryTime}/5</p>
                                    <p style={{ fontWeight: 'bold', color: 'black' }}>Packaging: {review.packagingTime}/5</p> 
                                    <p style={{ fontWeight: 'bold', color: 'black' }}>Would Order Again: {review.wouldOrderAgain ? 'Yes' : 'No'}</p>
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

export default CustomerReviews;
