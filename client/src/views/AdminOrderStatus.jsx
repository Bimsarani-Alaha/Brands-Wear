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
    axios
      .get('http://localhost:3001/showAcceptOrders')
      .then((response) => {
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleGoToInventory = () => {
    navigate('/Inventory');
  };

  const handleAcceptOrder = (itemCode, sizes) => {
    // Update inventory based on order sizes
    axios
      .post('http://localhost:3001/UpdateInventoryByOrders', {
        itemCode,
        ...sizes,
      })
      .then((response) => {
        console.log('Inventory updated successfully:', response.data);

        // Update order status to "Yes"
        axios
          .put(`http://localhost:3001/statusToYes/${itemCode}`)
          .then((response) => {
            console.log('Order status updated to "Yes":', response.data);
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.itemCode === itemCode
                  ? { ...order, status: 'Yes' }
                  : order
              )
            );
          })
          .catch((error) => {
            console.error('Error updating order status:', error);
          });
      })
      .catch((error) => {
        console.error('Error accepting order:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavigation />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center bg-[#D9D9D9] mx-52 mt-10 rounded-xl py-10 mb-20">
          <h1
            className="text-3xl font-bold mb-6"
            style={{
              background: 'linear-gradient(to right, #35155D, #66347F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Supplier Order Status
          </h1>

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="relative bg-white p-10 rounded-xl shadow-lg flex items-center space-x-4 mt-10 w-[50rem] transition transform hover:scale-105"
              >
                <img
                  className="w-32 h-32 rounded-md object-cover mr-4"
                  src={order.imgUrl || 'https://via.placeholder.com/150'}
                  alt={order.itemName}
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2">
                    Name: {order.itemName}
                  </div>
                  <div className="text-lg mb-2">
                    Category: {order.category}
                  </div>
                  <div className="text-lg mb-2">
                    Item Code: {order.itemCode}
                  </div>
                  <div className="text-lg mb-2">
                    Company Name: {order.companyName}
                  </div>

                  <div className="flex justify-center gap-5">
                    <div className="text-sm mb-4">
                      <strong>S</strong>: {order.small}
                    </div>
                    <div className="text-sm mb-4">
                      <strong>M</strong>: {order.medium}
                    </div>
                    <div className="text-sm mb-4">
                      <strong>L</strong>: {order.large}
                    </div>
                    <div className="text-sm mb-4">
                      <strong>XL</strong>: {order.extraLarge}
                    </div>
                  </div>

                  <div className="text-sm mb-2">Price: {order.price}</div>
                  <div className="text-sm mb-2">
                    Total Price: {order.totalPrice}
                  </div>

                  <div className="text-sm mb-4 p-5">
                    Status: {order.status}
                  </div>

                  <button
                    onClick={() =>
                      handleAcceptOrder(order.itemCode, {
                        small: order.small,
                        medium: order.medium,
                        large: order.large,
                        extraLarge: order.extraLarge,
                      })
                    }
                    className={`border text-white px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                      order.status === 'Yes'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-white hover:border-black hover:text-black'
                    }`}
                    disabled={order.status === 'Yes'}
                  >
                    {order.status === 'Yes'
                      ? 'Inventory Added'
                      : '+ Add Inventory'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No orders available.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminOrderStatus;
