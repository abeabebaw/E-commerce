import React from 'react';
import './Hero.css';
import handIcon from '../../assets/hand_icon.png';
import arrow_icon from '../../assets/arrow.png';
import heroImage from '../../assets/hero_image.png';

function Hero() {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <div className='hero-text'>
          <h2>NEW ARRIVALS ONLY</h2>
          <div className='hand-hand-icon'>
            <p>new</p>
            <img src={handIcon} alt='Hand Icon' className='hand-icon' />
          </div>
          <div className='hero-collections-text'>
            <p>collections</p>
            <p>for everyone</p>
          </div>
          <div className='hero-latest-btn'>
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="Arrow" />
          </div>
        </div>
      </div>
      <div className='hero-right'>
        <img src={heroImage} alt='Hero' className='hero-image' />
      </div>
    </div>
  );
}

export default Hero;