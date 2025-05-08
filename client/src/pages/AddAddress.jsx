
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";
import axios from 'axios';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Reusable input component
const InputField = ({ type, name, handleChange, placeholder, address, readOnly = false }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={address[name]}
      onChange={handleChange}
      readOnly={readOnly}
      required
      className={`w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-grey-500 focus:border-primary transition ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
    />
  );
};

const AddAddress = () => {
  const { user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Uttar Pradesh',
    country: 'India',
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
      const { data } = await axios.post('/api/address/add', { address });
      if (data?.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
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
  }, [user, navigate]);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl  text-grey-500">
        Add Shipping <span className="text-primary-dull font-semibold">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">

        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} placeholder="First Name" name="firstName" type="text" />
              <InputField handleChange={handleChange} address={address} placeholder="Last Name" name="lastName" type="text" />
            </div>

            <InputField handleChange={handleChange} address={address} placeholder="Email" name="email" type="email" />
            <InputField handleChange={handleChange} address={address} placeholder="Street Address" name="street" type="text" />
            <InputField handleChange={handleChange} address={address} placeholder="Phone" name="phone" type="tel" />

            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} placeholder="City" name="city" type="text" />
              <InputField handleChange={handleChange} address={address} placeholder="Country" name="country" type="text" readOnly />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <select
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-grey-500 focus:border-primary transition"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <InputField handleChange={handleChange} address={address} placeholder="Zip Code" name="zipCode" type="text" />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dull text-white py-3 rounded transition mt-6 cursor-pointer"
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
