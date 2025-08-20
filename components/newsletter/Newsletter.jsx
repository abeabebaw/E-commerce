import React from 'react'
import './newsletter.css';
function Newsletter() {
  return (
    <div className='newsletter'>
      <h1> get exclusive offres on your email</h1>
        <p>Subscribe to our newsletter and get 10% off your first order</p>
      <div className='newsletter-input'>
        <input type='email' className='email' placeholder='Enter your email' />
        <button>Subscribe</button>
      </div>
      </div>
  )
}

export default Newsletter