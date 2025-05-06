

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';
import axios from 'axios';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { currency ,user} = useAppContext();

    const fetchOrders = async () => {
        try {
            const {data} = await axios.get("/api/order/user");
            console.log(data);
            if(data?.success){
                setMyOrders(data.orders);
            }
            else{
                console.error(data.message);
            }
            // setMyOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        // setMyOrders(dummyOrders);

    };

    useEffect(() => {
        if(user){

            fetchOrders();
        }
    }, [user]);

    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-center w-max mb-8 mx-auto">
                <p className="text-2xl font-medium uppercase">My Orders</p>
                <div className="w-24 h-0.5 bg-primary rounded-full mt-1"></div>
            </div>

            {myOrders && myOrders.map((order, index) => (
                <div key={index} className="border border-gray-300 rounded-md p-4 mb-10 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center text-gray-500 font-medium text-sm max-md:flex-col max-md:items-start max-md:gap-2">
                        <span>Order Id: {order._id}</span>
                        <span>Payment: {order.paymentType}</span>
                        <span>Total Amount: {currency}{order.amount}</span>
                    </div>

                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-6 p-4 rounded bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <img src={item.product.images?.[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                    <p className="text-xs text-gray-500">Category: {item.product.category}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-center md:ml-8 mb-4 md:mb-0 opacity-50">
                                <p>Quantity: {item.quantity || 1}</p>
                                <p>Status: {order.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                            </div>

                            <div className="text-primary text-lg font-bold">
                            Amount: {currency}{(item.product.offerPrice) * (item.quantity )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;

