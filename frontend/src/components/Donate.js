import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
  const ngos = [
    "Partner NGOs: Helping Hands Shelter",
    "Food for All Foundation",
    "Meals on Wheels",
    "Community Kitchen",
    "Save the Children",
    "Global Food Charity"
  ];

  const slidingContainerRef = useRef(null);

  useEffect(() => {
    // Add continuous scrolling effect using JavaScript
    const slidingContainer = slidingContainerRef.current;
    let position = 100; // Start from right
    const scrollSpeed = 0.8; // Adjust for smoothness

    const animateScroll = () => {
      if (position <= -slidingContainer.scrollWidth) {
        position = slidingContainer.clientWidth;
      } else {
        position -= scrollSpeed;
      }
      slidingContainer.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateScroll);
    };

    animateScroll();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        overflowX: 'hidden',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="card shadow-lg p-4 w-100 mx-3"
        style={{
          maxWidth: '1200px',
          height: 'auto',
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}
      >
        <h3 className="text-center" style={{ color: 'green' }}>Gratitude Corner</h3>
        <div className="card-body row">
          {/* Left Column: Image */}
          <div className="col-12 col-md-6 d-flex justify-content-center mb-3 mb-md-0">
            <img
              src="https://media.istockphoto.com/id/1224414210/vector/food-donation-and-charity.jpg?s=612x612&w=0&k=20&c=Zwz7H7M1-8d23Zpgz127eAaypBznKeGm05dXe80WzHs="
              alt="Food Donation"
              className="img-fluid rounded"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Right Column: Text Information */}
          <div className="col-12 col-md-6 text-start d-flex flex-column justify-content-center">
            <h3 className="card-title text-success">Help Reduce Food Waste & Support Those in Need</h3>
            <p className="card-text text-muted mb-4">
              If you have ordered food and find that you have leftovers, consider donating them instead of letting them go to waste. 
              Every year, billions of pounds of food are wasted while countless individuals and families face hunger. 
              Donating food that you may not use is a powerful way to combat this issue and ensure that your surplus nourishment 
              reaches those who need it most. 
            </p>
            <p className="card-text text-muted mb-4">
              Participating in food donation programs allows you to contribute to a larger movement aimed at addressing 
              food insecurity and building a healthier, more sustainable community for everyone.
            </p>
            <p className="card-text text-muted mb-4">
              We partner with numerous NGOs that work tirelessly to distribute food to those in need. 
              Together, we can make a significant difference. The NGOs you see listed below are just a few 
              of the organizations dedicated to this cause.
            </p>
          </div>
        </div>

        {/* Sliding NGO Names */}
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginTop: '1rem',
          }}
        >
          <div
            ref={slidingContainerRef}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              transform: 'translateX(100%)',
            }}
          >
            {ngos.map((ngo, index) => (
              <span key={index} style={{ marginRight: '1rem', display: 'inline-block' }}>
                {ngo} |
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/donate">
            <button className="btn btn-success">Yes, Donate!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
