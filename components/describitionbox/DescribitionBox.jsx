import React from 'react';
import './describitionbox.css';

const DescriptionBox = () => {
  return (
    <div className='DescriptionBox'>
        <div className="descriptionbox-navigator">
            <div className='descriptionbox-nav-box'>
                Description
            </div>
            <div className='descriptionbox-nav-box-fade'>
                Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>
                An e-commerce platform is a digital solution that enables businesses 
                and individuals to buy and sell products or services online.
                These platforms provide the necessary tools to create online stores, 
                manage inventory, process payments, and handle customer interactions. 
                E-commerce platforms can be tailored for different business models,
                including B2B (Business-to-Business), B2C (Business-to-Consumer),
                C2C (Consumer-to-Consumer), and D2C (Direct-to-Consumer).
            </p>
        </div>
    </div>
  );
}

export default DescriptionBox;