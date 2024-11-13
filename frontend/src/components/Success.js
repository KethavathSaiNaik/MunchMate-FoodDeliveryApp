import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';

import { Link } from 'react-router-dom'
const Success = () => {
  const cart=useCart()
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1 className="thank-you-title">Payment successful
        </h1>
        <p className="thank-you-message">{cart}
        </p>
          <Link to='/'><button className="thank-you-button" >Home
          </button></Link>
        
      </div>
    </div>
  )
}

export default Success
