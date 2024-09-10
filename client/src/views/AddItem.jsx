import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
      toast.success('Product added successfully!'); // Show success toast
      setFormData({
        Category: 'Frocks',
        Size: 'M',
        Prize: '3000',
        Quantity: 1
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.'); // Show error toast
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-4xl">
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
              name="Prize"
              value={formData.Prize}
              onChange={handleChange}
              className="w-[30rem] p-2 border rounded"
              disabled
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default Supplier;
