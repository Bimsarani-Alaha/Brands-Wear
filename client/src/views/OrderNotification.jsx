import React, { useState, useEffect } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/showOrders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    if (orders.length === 0) return <div>Loading...</div>;

    const handleAccept = (orderId) => {
        // Add your accept logic here (e.g., make an API call)
        console.log(`Accepted order ID: ${orderId}`);
    };

    const handleReject = (orderId) => {
        // Add your reject logic here (e.g., make an API call)
        console.log(`Rejected order ID: ${orderId}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-300 p-4 mb-4 rounded shadow-md">
                        <p><strong>Item Name:</strong> {order.itemName}</p>
                        <p><strong>Item Code:</strong> {order.itemCode}</p>
                        <p><strong>Category:</strong> {order.category}</p>
                        <p><strong>Small:</strong> {order.small}</p>
                        <p><strong>Medium:</strong> {order.medium}</p>
                        <p><strong>Large:</strong> {order.large}</p>
                        <p><strong>Extra Large:</strong> {order.extraLarge}</p>
                        <p><strong>Total Quantity:</strong> {order.quantity}</p>
                        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                        <p><strong>Needeed At:</strong> {new Date(order.neededDate).toLocaleString()}</p>
                        <div className="flex justify-end mt-4">
                            <Link to={`/AcceptAdminOrder/${order._id}`}>
                                <button
                                    onClick={() => handleAccept(order._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition"
                                >
                                    Accept
                                </button>
                            </Link>
                            <button
                                onClick={() => handleReject(order._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    );
};

export default ShowOrders;
