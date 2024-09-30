import React, { useState, useEffect } from 'react';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import dressImage from '../Images/dressImage.jpeg'; // Correct path for the dress image
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateAdmin() {
  const { itemId } = useParams(); // Extract itemId from URL
  const [itemData, setItemData] = useState({
    itemName: '',
    category: '',
    price: 0,
    availability: '',
    small: 0,
    medium: 0,
    large: 0,
    extraLarge: 0,
  });

  // Fetch item data by ID when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3001/showCustomerById/${itemId}`)
      .then(response => {
        setItemData(response.data);
      })
      .catch(error => console.error('Error fetching item data:', error));
  }, [itemId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  // Function to handle updating the item
  const handleUpdate = () => {
    axios.put(`http://localhost:3001/updateItem/${itemId}`, itemData)
      .then(response => {
        alert('Item updated successfully!'); // Optionally replace with toast notification
      })
      .catch(error => {
        console.error('Error updating item:', error);
        alert('Failed to update item.'); // Optionally replace with toast notification
      });
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <div>Item Code:{itemData.itemCode}</div>
          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6">Update Item</h1>

          {/* Product Form */}
          <div className="flex">
            {/* Product Image */}
            <div className="mr-8">
              <img className="w-40 h-60 object-cover rounded-md" src={dressImage} alt="Product" />
            </div>

            {/* Form Fields */}
            <div className="flex-1">
              {/* Item Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={itemData.itemName}
                  onChange={handleInputChange}
                  className="bg-gray-200 p-2 rounded-md w-full"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={itemData.category}
                  onChange={handleInputChange}
                  className="bg-gray-200 p-2 rounded-md w-full"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={itemData.price}
                  onChange={handleInputChange}
                  className="bg-gray-200 p-2 rounded-md w-full"
                />
              </div>

              {/* Availability */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Availability</label>
                <select
                  name="availability"
                  value={itemData.availability}
                  onChange={handleInputChange}
                  className="bg-gray-200 p-2 rounded-md w-full"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Sizes</label>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Small</label>
                    <input
                      type="number"
                      name="small"
                      value={itemData.small}
                      onChange={handleInputChange}
                      className="bg-gray-200 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Medium</label>
                    <input
                      type="number"
                      name="medium"
                      value={itemData.medium}
                      onChange={handleInputChange}
                      className="bg-gray-200 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Large</label>
                    <input
                      type="number"
                      name="large"
                      value={itemData.large}
                      onChange={handleInputChange}
                      className="bg-gray-200 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Extra Large</label>
                    <input
                      type="number"
                      name="extraLarge"
                      value={itemData.extraLarge}
                      onChange={handleInputChange}
                      className="bg-gray-200 p-2 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="text-center mt-4">
                <button
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UpdateAdmin;
