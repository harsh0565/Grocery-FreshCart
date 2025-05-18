import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from './../assets/assets';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, getCartAmount } = useAppContext();

  const handleLogout = async() => {
    try {
      const {data} = await axios.get('/api/user/logout');
      if(data.success){
        toast.success(data.message);
        setUser(null);
        navigate('/');
        setOpen(false);
      }
      else{
        toast.error(data.message,"hghjk");
      }
      
    } catch (error) {
      window.location.reload();
      console.error("Eror in logout",error);
      // toast.error(error.message);
    }
  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate(`/products`);

    }
  }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all sticky top-0 bg-white shadow z-50">

      <Link to="/" onClick={() => setOpen(false)}>
        <img className=" h-10 scale-250 mr-30"  src={assets.logo} alt="logo" />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {!user && <Link to="/seller" id='nav-scale' onClick={() => setOpen(false)}>Seller Login</Link>}
        <Link to="/" id='nav-scale' onClick={() => setOpen(false)}>Home</Link>
        <Link id='nav-scale' to="/products" onClick={() => setOpen(false)}>All Products</Link>
        {user && (
          <Link id='nav-scale' to="/my-orders" onClick={() => setOpen(false)}>My Orders</Link>
        )}
        <Link id='nav-scale' to="/contact" onClick={() => {setOpen(false); scrollTo(0, 0)}}>Contact</Link>

        <div  className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input id='nav-scale' onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="     Search products" />
          <img id='nav-scale' src={assets.search_icon} className="w-4 h-4" alt="Search" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img id='nav-scale' src={assets.cart_icon} alt="Cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>

        {!user ? (
          <button 
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <img id='nav-scale'
              src={assets.profile_icon}
              className="w-10 h-10 rounded-full object-cover"
              alt="Profile"
            />
            <ul className="absolute right-0 mt-0 w-40 bg-white border rounded-md shadow-md opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-300 origin-top-right z-10 pointer-events-none group-hover:pointer-events-auto">
              <li
                onClick={() => {
                  navigate("/my-orders");
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>





        )}

      
      </div>


      <div className='flex items-center gap-6 md:hidden'>
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img id='nav-scale' src={assets.cart_icon} alt="Cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>
        <button
        id='nav-scale'
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className=""
        >
          <img src={assets.menu_icon} className="w-6 h-6" alt="Menu" />
        </button>
      </div>


      <div
        className={`${open ? 'flex' : 'hidden'
          } absolute top-[60px] left-0 w-full bg-white shadow-md flex-col items-start gap-4 px-5 py-6 text-base md:hidden transition-all duration-300 z-20`}
      >
        {!user && <Link to="/seller"  onClick={() => setOpen(false)}>Seller Login</Link>}
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setOpen(false)}>All Products</Link>
        {user && (
          <Link to="/my-orders" onClick={() => setOpen(false)}>My Orders</Link>
        )}
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>



        {!user ? (
          <button
            onClick={() => { setShowUserLogin(true); setOpen(false); }}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full w-full text-center"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full w-full text-center"
          >
            Logout
          </button>
        )}
       
      </div>
    </nav>
  )
}

export default Navbar;
