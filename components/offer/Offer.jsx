import React from 'react'
import './offer.css';
import exclusive_image from '../../Assets/exclusive_image.png';

function Offer() {
  return (
    <div className='offers'>
       <div className='offer-left'>
        <h1>Exclusive</h1>
        <h1> offer for you</h1>
        <p>ONLY  ON THE BEST SELLERS PRODUCTS</p>
         <button> check now</button>
        </div>
        <div className='offer-right'>
            <img src={exclusive_image}alt='offer'/>

        </div>
    </div>
  )
}

export default Offer