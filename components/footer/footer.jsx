import React from 'react';
import './footer.css';
import logo_big from'../../Assets/logo_big.png'
import instagramIcon from '../../assets/instagram_icon.png';
import pinterestIcon from '../../assets/pintester_icon.png';
import whatsappIcon from '../../assets/whatsapp_icon.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
    <img src={logo_big}/>
      </div>
      
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Office</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      
      <div className="footer-social-icons">
        <div className="footer-icon-container">
          <img src={instagramIcon} alt="Instagram" />
        </div>
        <div className="footer-icon-container">
          <img src={pinterestIcon} alt="Pinterest" />
        </div>
        <div className="footer-icon-container">
          <img src={whatsappIcon} alt="WhatsApp" />
        </div>
      </div>
      
      <div className="footer-copyright">
        <hr />
        <p>© {new Date().getFullYear()} ABEBAW SHOP. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;