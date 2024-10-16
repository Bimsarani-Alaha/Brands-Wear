import React, { useState, useEffect } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]); // State to store rejected orders
    const { userId } = useParams();

    useEffect(() => {
        // Retrieve rejected orders from local storage
        const storedRejectedOrders = JSON.parse(localStorage.getItem('rejectedOrders')) || [];
        setRejectedOrders(storedRejectedOrders);

        // Fetch orders from the API
        axios.get(`http://localhost:3001/showOrders/${userId}`)
            .then(response => {
                const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    }, [userId]);

    if (orders.length === 0) return <div className="text-center text-gray-600">Loading...</div>;

    const handleAccept = (orderId) => {
        console.log(`Accepted order ID: ${orderId}`);
        // You might want to navigate to another page or update state here
    };

    const handleReject = (orderId) => {
        // Update the rejectedOrders state
        const newRejectedOrder = { userId, orderId };

        // Update the state
        const updatedRejectedOrders = [...rejectedOrders, newRejectedOrder];
        setRejectedOrders(updatedRejectedOrders);

        // Store the updated rejected orders in local storage
        localStorage.setItem('rejectedOrders', JSON.stringify(updatedRejectedOrders));

        // Remove order from display
        setOrders(orders.filter(order => order._id !== orderId));
        console.log(`Rejected order ID: ${orderId}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow container mx-auto p-6">
            <h2  className="text-4xl font-bold mb-6 whitespace-nowrap"  style={{  background: "linear-gradient(to right, #35155D, #66347F)", WebkitBackgroundClip: "text",  WebkitTextFillColor: "transparent",color: "transparent" }}>
              Order Details
            </h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => {
                        const isRejected = rejectedOrders.some(rejected => rejected.userId === userId && rejected.orderId === order._id);
                        if (isRejected) return null; // Skip rendering this order if it's rejected

                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out border border-black"
                            >
                                <div className='flex items-center justify-center p-10'>
                                    <img src={order.imgUrl} alt={order.itemName} className="w-[30rem] h-[20rem] object-cover" />

                                </div>
                                <div className="p-6 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <p className="text-xl font-semibold text-black-600">Item Name:</p>
                                        <p className="text-lg font text-black-100">{order.itemName}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xl font-semibold text-black-600">Item Code:</p>
                                        <p className="text-lg font text-black-100">{order.itemCode}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xl font-semibold text-black-600">Category:</p>
                                        <p className="text-lg font text-black-100">{order.category}</p>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center mt-6">
                                        <div>
                                            <p className="text-sm text-indigo-600 font-medium">S:</p>
                                            <p className="text-xl text-gray-800">{order.small}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-indigo-600 font-medium">M:</p>
                                            <p className="text-xl text-gray-800">{order.medium}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-indigo-600 font-medium">L:</p>
                                            <p className="text-xl text-gray-800">{order.large}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-indigo-600 font-medium">XL:</p>
                                            <p className="text-xl text-gray-800">{order.extraLarge}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div>
                                            <p className="text-xl font-semibold text-black-600">Total Quantity:</p>
                                            <p className="text-lg font text-black-100">{order.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-black-600">Delivery At:</p>
                                            <p className="text-lg font text-black-100">{new Date(order.neededDate).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <Link to={`/AcceptAdminOrder/${order._id}/${userId}`}>
                                            <button
                                                onClick={() => handleAccept(order._id)}
                                                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 text-lg rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition"
                                            >
                                                Accept
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleReject(order._id)}
                                            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-2 text-lg rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShowOrders;
