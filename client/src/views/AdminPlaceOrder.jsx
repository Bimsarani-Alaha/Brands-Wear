import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';

const UpdateItemForm = () => {
  const { itemId ,userId} = useParams();
  
  const [itemData, setItemData] = useState({
    category: "",
    itemName: "",
    itemCode: "",
    large: 0,
    small: 0,
    extraLarge: 0,
    medium: 0,
    imgUrl: "",
    neededDate: "", // New needed date field
    companyId: "",
    companyName:"",
  });

  // Fetch data for the item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/showCustomerById/${itemId}`);
        setItemData(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Failed to fetch item data. Please try again.");
      }
    };
    fetchItem();
  }, [itemId]);

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare the data for order creation
  const orderData = {
    ...itemData,
    small: 50 - itemData.small, // Send remaining quantities
    medium: 50 - itemData.medium,
    large: 50 - itemData.large,
    extraLarge: 50 - itemData.extraLarge,
    quantity: 
      (50 - itemData.small) + 
      (50 - itemData.medium) + 
      (50 - itemData.large) + 
      (50 - itemData.extraLarge),
  };

  // Remove _id to avoid duplicate key error
  delete orderData._id;

  try {
    const response = await axios.post(`http://localhost:3001/createOrder`, orderData);
    if (response.status === 200) {
      alert("Order placed successfully!");
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("An error occurred while placing the order.");
  }
};


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? parseInt(value) || 0 : value; // Handle numbers correctly
    setItemData({ ...itemData, [name]: newValue });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminNavigation />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mt-10 mb-20">
          <h2 className="text-2xl font-bold text-center mb-4">Place Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Item Name:</label>
              <input
                type="text"
                name="itemName"
                value={itemData.itemName}
                onChange={handleInputChange}
                className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                readOnly // Make the field read-only
                required
              />
            </div>
            {/* <div>hi{itemData.companyId}</div> */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Category:</label>
              <input
                type="text"
                name="category"
                value={itemData.category}
                onChange={handleInputChange}
                className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                readOnly // Make the field read-only
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Item Code:</label>
              <input
                type="text"
                name="itemCode"
                value={itemData.itemCode}
                onChange={handleInputChange}
                className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                readOnly // Make the field read-only
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Small:</label>
                <input
                  type="number"
                  name="small"
                  value={50-itemData.small}
                  onChange={handleInputChange}
                  className="w-[10rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Medium:</label>
                <input
                  type="number"
                  name="medium"
                  value={50-itemData.medium}
                  onChange={handleInputChange}
                  className="w-[10rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Large:</label>
                <input
                  type="number"
                  name="large"
                  value={50-itemData.large}
                  onChange={handleInputChange}
                  className="w-[10rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Extra Large:</label>
                <input
                  type="number"
                  name="extraLarge"
                  value={50-itemData.extraLarge}
                  onChange={handleInputChange}
                  className="w-[10rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image URL:</label>
              <input
                type="text"
                name="imgUrl"
                value={itemData.imgUrl}
                onChange={handleInputChange}
                className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                readOnly // Make the field read-only
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Needed Date:</label>
              <input
                type="date"
                name="neededDate"
                value={itemData.neededDate}
                onChange={handleInputChange}
                className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-64 h-12 mt-5 mb-6 bg-purple-600 text-white text-xl font-thin p-2 rounded-xl hover:bg-purple-200 hover:text-black transition-colors duration-200 focus:ring-2 focus:ring-purple-600"
            >
              + Place Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateItemForm;
