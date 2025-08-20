import React from 'react';

import Hero from '../components/hero/Hero';
import Popular from '../components/popular/Popular';
import Offer from '../components/offer/Offer';
import Newcollections from '../components/newcollections/newcollections';
import Newsletter from '../components/newsletter/Newsletter';


function Shop() {
  return (
    <div className='shop-page'>
      <Hero />
      <Popular />
       <Offer/>
       < Newcollections></Newcollections>
       <Newsletter/>
      
      
    </div>
  );
}

export default Shop;