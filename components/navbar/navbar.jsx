import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContex'; // Correct path
import logo from '../../assets/logo.png';
import './navbar.css';
import cart_icon from '../../assets/cart_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMobileMenu = () => {
    setMenuActive(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Company Logo" />
        <p>SHOPPER</p>
      </div>
      
      {localStorage.getItem('auth-token') && (
        <div className={`nav-menu-container ${menuActive ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li onClick={() => { setMenu('shop'); closeMobileMenu(); }}>
              <Link to="/">SHOP {menu === 'shop' ? <hr /> : null}</Link>
            </li>
            <li onClick={() => { setMenu('mens'); closeMobileMenu(); }}>
              <Link to="/mens">MEN {menu === 'mens' ? <hr /> : null}</Link>
            </li>
            <li onClick={() => { setMenu('womens'); closeMobileMenu(); }}>
              <Link to="/womens">WOMEN {menu === 'womens' ? <hr /> : null}</Link>
            </li>
            <li onClick={() => { setMenu('kids'); closeMobileMenu(); }}>
              <Link to="/kids">KIDS {menu === 'kids' ? <hr /> : null}</Link>
            </li>
          </ul>
        </div>
      )}
      
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={handleLogout} className="login-btn">Logout</button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
       
        {localStorage.getItem('auth-token') && (
          <Link to="/cart" className="cart-link">
            <img src={cart_icon} alt="Cart Icon" className="cart-icon" />
            <div className="cart-count">{getTotalCartItems()}</div>
          </Link>
        )}
        
        {localStorage.getItem('auth-token') && (
          <div 
            className={`hamburger ${menuActive ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;