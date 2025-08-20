import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Initialize cart with 300 items (0-300)
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAll_product(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart data when user logs in or token changes
  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        try {
          const response = await fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            }
          });
          
          if (response.ok) {
            const cartData = await response.json();
            // Merge server cart data with default cart
            setCartItems(prev => {
              const newCart = {...prev};
              Object.keys(cartData).forEach(itemId => {
                newCart[itemId] = cartData[itemId];
              });
              return newCart;
            });
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      } else {
        // If no token, reset cart to default
        setCartItems(getDefaultCart());
      }
    };

    fetchCartData();
  }, [localStorage.getItem('auth-token')]); // This effect runs when auth token changes

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: prev[itemId] + 1 
    }));
    
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({"itemId": itemId})
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: Math.max(0, prev[itemId] - 1) // Ensure it doesn't go below 0
    }));
    
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({"itemId": itemId})
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;