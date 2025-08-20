
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Shop from './pages/Shop';
import Footer from './components/footer/Footer';
import ShopCatagory from './pages/ShopCatagory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kids_banner from './assets/banner_kids.png';


function App() {
 return (
  <div className='app'>
   
  
    <BrowserRouter>
   <Navbar />
     <Routes>
      /<Route path="/" element={<Shop />} />
      <Route path="/mens" element={<ShopCatagory banner={men_banner} category="men" />} />
    <Route path="/womens" element={<ShopCatagory banner={women_banner} category="women" />} />
     <Route path="/kids" element={<ShopCatagory banner={kids_banner} category="kids" />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginSignup />} />
     </Routes>
     <Footer />
    </BrowserRouter>
    
  
  </div>
 );
}

export default App;