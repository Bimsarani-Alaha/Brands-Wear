import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';

function AdminOrderStatus() {
  const navigate = useNavigate(); 

  const handleGoToInventory = () => {
    navigate('/Inventory'); // Navigates to the Inventory page
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
          <h1 className="text-4xl font-thin text-gray-700 mb-6">Supplier Order Status</h1>
          <div className="bg-white p-10 rounded-xl shadow flex items-center space-x-4 mt-10 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105">
            <button
              type="button"
              onClick={handleGoToInventory} // Updated handler to navigate to the Inventory page
              className="bg-purple-600 border text-white px-4 py-2 rounded-md hover:bg-white hover:border-black hover:text-black transition duration-300 ease-in-out"
            >
              + Add Inventory
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminOrderStatus;
