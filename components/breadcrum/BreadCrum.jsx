import React from 'react';
import { Link } from 'react-router-dom';
import arrow_icon from '../../Assets/breadcrum_arrow.png';
import './breadcrum.css';

const BreadCrum = ({ product }) => {
  if (!product) return null; // Graceful handling if product is undefined

  return (
    <nav className="breadcrum" aria-label="Breadcrumb">
      <ol className="breadcrum__list">
        <li className="breadcrum__item">
          <Link to="/" className="breadcrum__link">HOME</Link>
        </li>
        <li className="breadcrum__item">
          <img 
            src={arrow_icon} 
            alt="" 
            className="breadcrum__separator"
            aria-hidden="true"
          />
        </li>
        <li className="breadcrum__item">
          <Link to="/shop" className="breadcrum__link">SHOP</Link>
        </li>
        <li className="breadcrum__item">
          <img 
            src={arrow_icon} 
            alt="" 
            className="breadcrum__separator"
            aria-hidden="true"
          />
        </li>
        <li className="breadcrum__item">
          <span className="breadcrum__current">{product.category}</span>
        </li>
        <li className="breadcrum__item">
          <img 
            src={arrow_icon} 
            alt="" 
            className="breadcrum__separator"
            aria-hidden="true"
          />
        </li>
        <li className="breadcrum__item">
          <span className="breadcrum__current">{product.name}</span>
        </li>
      </ol>
    </nav>
  );
}

export default BreadCrum;