import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import axios from 'axios';

function AdminOrderStatus() {
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);

  // Fetching orders on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/showAcceptOrders')
      .then(response => {
        setOrders(response.data); // Store orders in state
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleGoToInventory = () => {
    navigate('/Inventory'); // Navigates to the Inventory page
  };

  const handleAcceptOrder = (orderId) => {
    axios.put(`http://localhost:3001/AcceptAdminOrder/${orderId}`)
      .then(response => {
        console.log("Order accepted:", response.data);
        // Refresh orders after accepting an order
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: 'Accepted' } : order
          )
        );
      })
      .catch(error => {
        console.error("Error accepting order:", error);
      });
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
          <h1 className="text-4xl font-thin text-gray-700 mb-6">Supplier Order Status</h1>
          <div className="flex items-center  mt-10 ">
            
          </div>
          <div className="mt-6 mb-10   w-[50rem] ">
            {orders.map(order => (
              <div key={order._id} className="shadow bg-white p-10 flex justify-between items-center  rounded-xl mb-5 transition duration-300 ease-in-out transform hover:scale-105 space-x-4">
                <div>
                  <h2 className="text-xl">{order.itemName}</h2>
                  <p>Price: LKR {order.price}</p>
                  <p>Needed by: {new Date(order.neededDate).toLocaleDateString()}</p>
                  {/* <p>Status: {order.status || 'Pending'}</p> */}
                </div>
                <button
                  onClick={() => handleAcceptOrder(order._id)}
                  className="bg-purple-600 border text-white px-4 py-2 rounded-md hover:bg-white hover:border-black hover:text-black transition duration-300 ease-in-out"
                >
                  +Add Inventory
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminOrderStatus;
