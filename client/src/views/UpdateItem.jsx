import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import axios from 'axios';

function Supplier() {
  const [formData, setFormData] = useState({
    Category: 'Frocks',
    Size: 'M',
    Prize: '3000',
    Quantity: 1
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
      alert('Product added successfully!');
      setFormData({
        Category: 'Frocks',
        Size: 'M',
        Prize: '3000',
        Quantity: 1
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col md:flex-row bg-white p-6 shadow-lg rounded-md w-full max-w-4xl">
          
          {/* Left - Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img 
              src="/path/to/your/image.jpg" 
              alt="Product" 
              className="object-contain h-64 w-64"
            />
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-6">Update Item</h2>
            
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
              <div className="flex space-x-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size} 
                    type="button"
                    name="Size" 
                    value={size}
                    onClick={handleChange}
                    className={`py-2 px-4 border rounded ${formData.Size === size ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
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
                name="Prize"
                value={formData.Prize}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled
              />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <div className="flex items-center space-x-2">
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
              Update item
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Supplier;
