import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate ,user} = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isSeller) {
            navigate('/seller');
        }
    }, [isSeller]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/api/seller/login', { email, password });
            console.log(data);
            if (data?.success) {
                navigate('/seller');
                setIsSeller(data.success);
                toast.success(`Logged in successfully as Seller`);

            }
            else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }

    }
    return !isSeller && (
      
        <>
            <form onSubmit={onSubmitHandler} className="text-gray-600 min-h-screen flex items-center text-sm px-4">
                <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 w-full max-w-sm sm:max-w-md rounded-lg shadow-xl border border-gray-200 bg-white">
                    <p className="text-2xl font-semibold m-auto">
                        <span className="text-primary">Login as Seller</span>
                    </p>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                            placeholder="Enter your email"
                        />
                        <div className="w-full mt-5">
                            <label htmlFor="password" className="block mb-1">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button className="w-full bg-primary text-white py-2 mt-4 rounded-md cursor-pointer">
                            Login
                        </button>
                        <Link to="/" className="block text-center mt-4  pb-4 hover:text-primary transition">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </form>
        </>

    )
}


export default SellerLogin