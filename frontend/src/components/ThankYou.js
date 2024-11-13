
import React from 'react';
import { Link } from 'react-router-dom';
const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1 className="thank-you-title">Thank You for Your Generosity!</h1>
        <p className="thank-you-message">
          Your support makes a difference in the lives of those in need. Together, we can create a brighter future for everyone.
        </p>
          <Link to='/'><button className="thank-you-button" >Home
          </button></Link>
        
      </div>
    </div>
  );
};

export default ThankYou;
