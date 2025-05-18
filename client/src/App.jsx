import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import PageNotFound from './pages/PageNotFound';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Contact from './pages/Contact';
import Loading from './components/Loading';
import Faqs from './pages/Faqs';
import ReturnRefundPolicy from './pages/ReturnRefundPolicy';
import Contacts from './pages/seller/Contacts';
import ForgotPassword from './components/ForgotPassword';




const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  const { showUserLogin, isSeller, user } = useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster toastOptions={{
        duration: 600,
      }} />
      {/* <Home/> */}
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

        <Routes>
          <Route path="/" element={<Home />} />
        
          {!user && <Route path="/forgot-password" element={< ForgotPassword />} />}
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/return-policy" element={<ReturnRefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />} >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='contact' element={<Contacts />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

     
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App

