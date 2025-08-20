import React, { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContex'
import Item from '../components/item/Item'
import dropdown_icon from'@assets/dropdown_icon.png'
import'./css/ShopCatagory.css'
function ShopCatagory(props){
  const {all_product}=useContext(ShopContext)

  return(
    <div className='shop-catagory'>
 <img className='shopcatagort-banner' src={props.banner}/>
 <div className="shopcatagory-indexSort">
  <p> <span>showing 1-12</span>out of 36 products</p>
 </div>
 <div className="shopcatagory-sort">
  sort by<img src={dropdown_icon}/>
 </div>
 <div className="shopcatagory-products">
       {all_product.map((item,i)=>{
        if(props.category===item.category){
         return  <Item 
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
        }
        else{
          return null;
        }
       })}
 </div>
 <div className="shopcatagory-loadmore">
   explore more
 </div>
    </div>
  )
}

export default ShopCatagory