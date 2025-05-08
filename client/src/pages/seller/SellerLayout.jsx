import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
const SellerLayout = () => {
    const { isSeller, navigate, setIsSeller } = useAppContext();



    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
        { name: "Contact", path: "/seller/contact", icon: assets.leaf_icon },
    ];


    const logout = async () => {
        // localStorage.clear();
        try {
            const {data} = await axios.get("/api/seller/logout");
            if(data?.success){
                console.log("Logged out successfully");
                toast.success(data.message);
                navigate("/seller");
                setIsSeller(false);
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }

    };

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to="/">
                    <img src={assets.logo} alt="Logo" className='cursor-pointer  h-10 scale-300 ml-20 mr-30' />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='cursor-pointer border-gray-300 border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>


            <div className='flex'>



                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink 
                        to={item.path} 
                        key={item.name} 
                        end={item.path === "/seller"}
                        className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                          ${isActive 
                            ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-primary text-primary" 
                            : "hover:bg-gray-100/90 border-white text-gray-700"
                          }`
                        }
                      >
                      
                                <img src={item.icon} className="md:w-6 md:h-6 w-7 h-7" alt="" />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet/>
            </div>
        </>
    );
};
export default SellerLayout
