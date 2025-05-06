


import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";
import axios from 'axios';

// Make inputField a real function that RETURNS JSX
const InputField = ({ type,  name, handleChange, placeholder, address }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={address[name]}
            onChange={handleChange}
            required
            className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-grey-500 focus:border-primary transition"
        />
    );
};

const AddAddress = () => {
    const {user,navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    });

    const handleChange = (e) => {
        setAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/address/add',{address});
            console.log(data);
            if(data?.success){
                toast.success(data.message);
                navigate('/cart');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/cart');
        }
    }, []);

    return (
        <div className="mt-16 pb-16">
            <p className="text-2xl md:text-3xl  text-grey-500">Add Shipping <span className="text-primary-dull font-semibold">Address</span> </p>
            <div className="flex flex-col-reverse md:flex-row   justify-between mt-10">

                <div className="flex-1 max-w-md">
                    <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} placeholder="First Name" name="firstName" type="text"/>
                            <InputField handleChange={handleChange} address={address} placeholder="Last Name" name="lastName" type="text"/>
                           
                        </div>
                        <InputField handleChange={handleChange} address={address} placeholder="Email" name="email" type="email"/>
                        <InputField handleChange={handleChange} address={address} placeholder="Street Address" name="street" type="text"/>


                        <InputField handleChange={handleChange} address={address} placeholder="Phone" name="phone" type="tel"/>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} placeholder="City" name="city" type="text"/>
                            <InputField handleChange={handleChange} address={address} placeholder="Country" name="country" type="text"/>
                            
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            
                            <InputField handleChange={handleChange} address={address} placeholder="State" name="state" type="text"/>
                            <InputField handleChange={handleChange} address={address} placeholder="Zip Code" name="zipCode" type="text"/>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-dull text-white  py-3 rounded transition mt-6 cursor-pointer transition-all "
                        >
                            Save Address
                        </button>
                    </form>
                </div>

                <div className="hidden md:block w-1/2">
                    <img
                        src={assets.add_address_iamge}
                        alt="Add Address"
                        className="rounded-lg shadow-md object-cover w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddAddress;
