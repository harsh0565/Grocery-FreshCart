
import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        // setOrders(dummyOrders)
        try {
            const { data } = await axios.get("/api/order/seller");
            if (data?.success) {
                setOrders(data.orders);
            }
            else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="flex-1 flex flex-col overflow-y-auto h-[95vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">

            <div className="md:p-10 p-4 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Orders List</h2>
                {!orders?.length && (
                    <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                        <p className="text-center text-base md:text-lg font-medium">
                            No orders found.
                        </p>
                    </div>
                )}
                {orders?.map((order, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:grid md:grid-cols-4 gap-6 p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Product Info */}
                        <div className="flex items-center gap-4 col-span-2">
                            <img className="w-14 h-14 object-cover rounded-lg bg-gray-100 p-1" src={assets.box_icon} alt="boxIcon" />
                            <div className="flex flex-col">
                                {order.items.map((item, idx) => (
                                    <p key={idx} className="font-semibold text-gray-700">
                                        {item.product.name} <span className="text-primary font-medium">x {item.quantity}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="text-sm text-gray-600 leading-5">
                            <p className="font-medium text-gray-800">{order.address?.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}, {order.address.city}</p>
                            <p>{order.address.state} - {order.address.zipcode}, {order.address.country}</p>
                            <p className="mt-1 text-gray-500">{order.address.phone}</p>
                        </div>

                        {/* Order Summary */}
                        <div className="flex flex-col justify-between text-sm text-gray-600">
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-gray-800">Total:</p>
                                <span className="font-bold text-primary text-lg">{currency}{order.amount}</span>
                            </div>

                            <div className="mt-3 space-y-1">
                                <p><span className="font-medium">Method:</span> {order.paymentType}</p>
                                <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                                <p>
                                    <span className="font-medium">Payment:</span>{" "}
                                    <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                                        {order.isPaid ? "Paid" : "Pending"}
                                    </span>
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
