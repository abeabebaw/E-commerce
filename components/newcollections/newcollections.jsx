import React, { useEffect, useState } from 'react';
import './newcollections.css';
import Item from '../item/Item';

function NewCollections() {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch('http://localhost:4000/newcollections');
        if (!response.ok) {
          throw new Error('Failed to fetch new collections');
        }
        const data = await response.json();
        setNewCollection(data);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className='new-collections'>
      <hr />
      <h1>NEW COLLECTIONS</h1>
      <div className='collections'>
        {newCollection.map((item, i) => (
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

export default NewCollections;