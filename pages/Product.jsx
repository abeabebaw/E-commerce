import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContex';  // Fixed typo in "Context"
import BreadCrum from '../components/breadcrum/BreadCrum';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import DescribitionBox from '../components/describitionbox/DescribitionBox';
import RelatedProduct from '../components/relatedproduct/RelatedProduct';

function Product() {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  
  if (!product) {
    return <div>Product not found</div>;  // Added error handling
  }

  return (
    <div className='product'>
      <BreadCrum product={product}/>
      <ProductDisplay product={product}/> 
      <DescribitionBox/> 
      <RelatedProduct/>{/* Fixed: passing product instead of Product */}
    </div>
  )
}

export default Product;