import React, { useContext } from 'react';
import './cartitems.css';
import remove_icon from '../../Assets/cart_cross_icon.png';
import { ShopContext } from '../../contexts/ShopContex';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    
    // Calculate shipping fee (example: free shipping over $50, otherwise $5)
    const subtotal = getTotalCartAmount();
    const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5;
    const total = subtotal + shippingFee;

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            
            {all_product.map((product) => {
                if (cartItems[product.id] > 0) {
                    const totalPrice = product.new_price * cartItems[product.id];
                    return (
                        <React.Fragment key={product.id}>
                            <div className="cartitems-format">
                                <img src={product.image} className='carticon-product-icon' alt={product.name} />
                                <p>{product.name}</p>
                                <p>${product.new_price.toFixed(2)}</p>
                                <button className="cartitems-quantity">
                                    {cartItems[product.id]}
                                </button>
                                <p>${totalPrice.toFixed(2)}</p>
                                <img 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(product.id)} 
                                    alt="Remove" 
                                    className='cartitems-remove-icon'
                                />
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="catritems-total-item">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="catritems-total-item">
                            <p>Shipping Fee</p>
                            <p>${shippingFee.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${total.toFixed(2)}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;