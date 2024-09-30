import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import deliveryIcon from "../Images/delivery-icon.png"; // Replace with actual path if needed

function Inventory() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Event handler for placing an order
  const handlePlaceOrder = (itemName) => {
    // Navigate to the AdminPlaceOrder page and pass the item name as state
    navigate('/AdminPlaceOrder', { state: { itemName } });
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Categories</h2>
            <button className="bg-gray-300 px-4 py-2 rounded-md text-black">Generate Report</button>
          </div>
          
          {/* Inventory Table */}
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Current Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Max Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Place Order</th>
              </tr>
            </thead>
            <tbody>
              {/* Long Frocks Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Long Frocks</td>
                <td className="border border-gray-300 px-4 py-2">100</td>
                <td className="border border-gray-300 px-4 py-2">100</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">Fine</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="flex items-center bg-gray-300 px-3 py-2 rounded-md"
                    onClick={() => handlePlaceOrder('Long Frocks')}
                  >
                    <img src={deliveryIcon} alt="Order Icon" className="w-5 h-5 mr-2" />
                    Place Order
                  </button>
                </td>
              </tr>

              {/* Short Frocks Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Short Frocks</td>
                <td className="border border-gray-300 px-4 py-2">60</td>
                <td className="border border-gray-300 px-4 py-2">100</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-yellow-300 px-2 py-1 rounded-md">Normal</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="flex items-center bg-gray-300 px-3 py-2 rounded-md"
                    onClick={() => handlePlaceOrder('Short Frocks')}
                  >
                    <img src={deliveryIcon} alt="Order Icon" className="w-5 h-5 mr-2" />
                    Place Order
                  </button>
                </td>
              </tr>

              {/* Party Frocks Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Party Frocks</td>
                <td className="border border-gray-300 px-4 py-2">30</td>
                <td className="border border-gray-300 px-4 py-2">100</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md">Low</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="flex items-center bg-gray-300 px-3 py-2 rounded-md"
                    onClick={() => handlePlaceOrder('Party Frocks')}
                  >
                    <img src={deliveryIcon} alt="Order Icon" className="w-5 h-5 mr-2" />
                    Place Order
                  </button>
                </td>
              </tr>

              {/* Kids Frocks Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Kids Frocks</td>
                <td className="border border-gray-300 px-4 py-2">10</td>
                <td className="border border-gray-300 px-4 py-2">100</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md">Low</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="flex items-center bg-gray-300 px-3 py-2 rounded-md"
                    onClick={() => handlePlaceOrder('Kids Frocks')}
                  >
                    <img src={deliveryIcon} alt="Order Icon" className="w-5 h-5 mr-2" />
                    Place Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Inventory;
