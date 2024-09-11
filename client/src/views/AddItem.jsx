import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function Supplier() {
  const [formData, setFormData] = useState({
    Category: 'Frocks',
    Size: 'M',
    Prize: '3000',
    Quantity: 1,
    Contact: '' // Added contact field
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (amount) => {
    setFormData((prev) => ({
      ...prev,
      Quantity: Math.max(1, prev.Quantity + amount)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/AddProduct', formData);
      toast.success('Product added successfully!'); 
      setFormData({
        Category: 'Frocks',
        Size: 'M',
        Prize: '3000',
        Quantity: 1,
        Contact: '' // Reset the contact field
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.'); 
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white pl-52 pr-52 pb-10 shadow-lg rounded-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
          
          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Category">
              Category
            </label>
            <select 
              name="Category" 
              value={formData.Category} 
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Long Frocks">Long Frocks</option>
              <option value="Short Frocks">Short Frocks</option>
              <option value="Party Frocks">Party Frocks</option>
              <option value="Kids Frocks">Kids Frocks</option>
            </select>
          </div>

          {/* Size Options */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Size</label>
            <div className="flex justify-center space-x-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size} 
                  type="button"
                  name="Size" 
                  value={size}
                  onClick={handleChange}
                  className={`py-2 px-4 font-bold border rounded transition-all duration-300 ease-in-out transform ${formData.Size === size ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Prize">
              Price
            </label>
            <input
              type="text"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              className="w-[30rem] p-2 border rounded"
              placeholder="Enter price" // Removed disabled attribute
            />
          </div>


          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Quantity</label>
            <div className="flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                -
              </button>
              <span>{formData.Quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Add item
          </button>
        </div>
      </div>

      <Footer />
      <ToastContainer /> 
    </div>
  );
}

export default Supplier;
