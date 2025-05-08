

import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data?.success) {
                setOrders(data.orders);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 🔄 Loading State
    if (loading) {
        return (
            <div className="mt-20 flex flex-col items-center justify-center text-center gap-4 px-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl font-semibold text-gray-500 animate-pulse">Fetching orders...</p>
            </div>
        );
    }

    // 📭 No Orders State
    if (orders.length === 0) {
        return (
            <div className="mt-16 text-center text-xl font-semibold text-gray-600 px-4">
                No orders available
            </div>
        );
    }

    // ✅ Main Orders List
    return (
        <div className="flex-1 flex flex-col overflow-y-auto h-[95vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="md:p-10 p-4 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Orders List</h2>

                {orders.map((order, index) => (
                    <div key={index} className='flex flex-col border bg-white shadow-md hover:shadow-lg rounded-xl'>
                        <div className=" mt-6 capitalize font-sm text-blue-300 text-sm flex justify-center align-center">
                            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                        </div>
                        <div
                            
                            className="flex flex-col md:grid md:grid-cols-4 gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >


                            <div className="flex items-start gap-4 col-span-2">
                                <img className="w-14 h-14 object-cover rounded-lg bg-gray-100 p-1" src={assets.box_icon} alt="boxIcon" />
                                <div className="flex flex-col">
                                    {order.items.map((item, idx) => (
                                        <p key={idx} className="font-semibold text-gray-700 break-words">
                                            {item.product.name}{' '}
                                            <span className="text-primary font-medium">x {item.quantity}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 leading-5 capitalize">
                                <p className="font-medium text-gray-800 uppercase">
                                    {order.address?.firstName} {order.address.lastName}
                                </p>
                                <p>{order.address.street}, {order.address.city}</p>
                                <p>{order.address.state} - {order.address.zipCode}, {order.address.country}</p>
                                <p className="mt-1 text-gray-500">{order.address.phone}</p>
                            </div>

                            <div className="flex flex-col justify-between text-sm text-gray-600">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-800">Total:</p>
                                    <span className="font-bold text-primary text-lg">{currency}{order.amount}</span>

                                </div>

                                <div className="mt-3 space-y-1">
                                    <p><span className="font-medium">Method:</span> {order.paymentType}</p>
                                    <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                                    <p>
                                        <span className="font-medium">Payment:</span>{' '}
                                        <span className={order.isPaid ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
