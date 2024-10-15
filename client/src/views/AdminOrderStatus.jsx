import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminOrderStatus() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Fetching orders on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/showAcceptOrders')
      .then(response => {
        // Sort orders by createdAt in descending order to show the most recent first
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders); // Store sorted orders in state
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleGoToInventory = () => {
    navigate('/Inventory'); // Navigates to the Inventory page
  };

  const handleAcceptOrder = (itemCode, sizes) => {
    // First, update the inventory with the order sizes
    axios.post('http://localhost:3001/UpdateInventoryByOrders', {
      itemCode,
      ...sizes, // Sending sizes as part of the request body
    })
      .then(response => {
        console.log('Inventory updated successfully:', response.data);

        // Now update the order status to "Yes"
        axios.put(`http://localhost:3001/statusToYes/${itemCode}`)
          .then(response => {
            console.log('Order status updated to "Yes":', response.data);
            // Optionally, refresh the orders after the update or show a success message
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.itemCode === itemCode ? { ...order, status: 'Yes' } : order
              )
            );
          })
          .catch(error => {
            console.error("Error updating order status:", error);
          });
      })
      .catch(error => {
        console.error("Error accepting order:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavigation />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
          <h1 className="text-4xl font-thin text-gray-700 mb-6">Supplier Order Status</h1>
          {/* Main Content */}
          <div className="flex-grow container mx-auto p-6">
            <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="relative bg-white p-10 rounded-xl shadow flex items-center space-x-4 mt-10 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105">
                    <img className="w-32 h-32 rounded-md object-cover mr-4" src={order.imgUrl} alt={order.itemName} />
                    <div className="flex-1 justify-center">
                      <div className="text-lg font-semibold mb-2">Name: {order.itemName}</div>
                      <div className="text-lg mb-2">Category: {order.category}</div>
                      <div className="text-lg  mb-2">Item Code: {order.itemCode}</div>
                      <div className="text-lg mb-2">Company Name: {order.companyName}</div>

                      <div className='flex justify-center gap-5'>
                        <div className="text-sm mb-4"> <strong>S</strong> : {order.small}</div>
                        <div className="text-sm mb-4"> <strong>M</strong> : {order.medium}</div>
                        <div className="text-sm mb-4"><strong>L</strong> :  {order.large}</div>
                        <div className="text-sm mb-4"><strong>XL</strong> :  {order.extraLarge}</div>  
                      </div>

                      <div className="text-sm mb-2">Price: {order.price}</div>
                      <div className="text-sm mb-2">Total Price: {order.totalPrice}</div>

                      <div className="text-sm mb-4 p-5">Status: {order.status}</div>
                      <button
                        onClick={() => handleAcceptOrder(order.itemCode, {
                          small: order.small,
                          medium: order.medium,
                          large: order.large,
                          extraLarge: order.extraLarge
                        })} // Passing sizes along with itemCode
                        className={`${
                          order.status === 'Yes' ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-white hover:border-black hover:text-black'
                        } border text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
                        disabled={order.status === 'Yes'} // Disable if status is Yes
                      >
                        {order.status === 'Yes' ? 'Inventory Added' : '+ Add Inventory'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No orders available.</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminOrderStatus;
