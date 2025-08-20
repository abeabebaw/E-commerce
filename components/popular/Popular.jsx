import React, { useEffect, useState } from 'react';
import './popular.css';
import Item from '../item/Item';

function Popular() {
  const [popularProducts, setPopularProducts] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Added empty dependency array to run only once

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className='popular-item'>
        {popularProducts.map((item, i) => ( // Changed data_product to popularProducts
          <Item 
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;