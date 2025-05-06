import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user ,navigate} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log('Form submitted');
    console.log('Message:', message);
    try {
      const { data } = await axios.post('/api/contact/send',
        {
          name: user.name,
          email: user.email,
          message: message.trim(),
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setMessage('');
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                value={user?.name}
                readOnly
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                value={user?.email}
                readOnly
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !user}
            className={`w-full py-2 px-6 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${loading || !user
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700 cursor-pointer'
              }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>


        </form>
      </div>
    </div>
  );
};

export default Contact;
