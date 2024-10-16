import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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
    axios
      .post('http://localhost:3001/UpdateInventoryByOrders', {
        itemCode,
        ...sizes,
      })
      .then((response) => {
        toast.success('Inventory updated successfully!'); // Show success toast

        axios
          .put(`http://localhost:3001/statusToYes/${itemCode}`)
          .then((response) => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.itemCode === itemCode
                  ? { ...order, status: 'Yes' }
                  : order
              )
            );
            toast.success('Order status updated to "Yes"!'); // Show success toast
          })
          .catch((error) => {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status.'); // Show error toast
          });
      })
      .catch((error) => {
        console.error('Error accepting order:', error);
        toast.error('Failed to update inventory.'); // Show error toast
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavigation />
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast Container */}

      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
          <h1
            className="text-3xl font-bold mb-6 whitespace-nowrap"
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
                className="relative bg-white p-10 rounded-xl shadow flex items-center space-x-4 mt-10 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105"
              >
                <img
                  className="w-32 h-32 rounded-md object-cover mr-4"
                  src={order.imgUrl}
                  alt={order.itemName}
                />
                <div className="flex-1 justify-center">
                  <div className="text-lg font-semibold mb-2">
                    Name: {order.itemName}
                  </div>
                  <div className="text-lg mb-2">Category: {order.category}</div>
                  <div className="text-lg  mb-2">Item Code: {order.itemCode}</div>
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

                  <div className="text-sm mb-4 p-5">Status: {order.status}</div>
                  <button
                    onClick={() =>
                      handleAcceptOrder(order.itemCode, {
                        small: order.small,
                        medium: order.medium,
                        large: order.large,
                        extraLarge: order.extraLarge,
                      })
                    }
                    className={`${
                      order.status === 'Yes'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-white hover:border-black hover:text-black'
                    } border text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
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
        <Footer />
      </div>
    </div>
  );
}

export default AdminOrderStatus;
