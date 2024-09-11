import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS

function AdminAdditem() {
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Long Frocks");
  const [size, setSize] = useState("M");
  const [availability, setAvailability] = useState("Available");
  const [price, setPrice] = useState(""); // Add state for price

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/AddItem', {
        category,
        size,
        price,
        quantity,
        availability
      });

      // Handle success (e.g., show a success message or redirect)
      toast.success('Item added successfully!');
      console.log('Item added successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., show an error message)
      toast.error('There was an error adding the item.');
      console.error('There was an error adding the item:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Navigation */}
      <AdminNavigation />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mt-10 mb-20">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Add New Item</h2>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="category">Category</label>
                <select 
                  id="category" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-40 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option>Long Frocks</option>
                  <option>Short Frocks</option>
                  <option>Party Frocks</option>
                  <option>Kids Frocks</option>
                </select>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-gray-600 mb-2">Size</label>
                <div className="flex space-x-2 justify-center">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <label 
                      key={sz} 
                      className={`flex items-center justify-center cursor-pointer ${size === sz ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 border rounded transition-colors duration-300 ease-in-out`}
                    >
                      <input 
                        type="radio" 
                        name="size" 
                        value={sz} 
                        checked={size === sz}
                        onChange={() => setSize(sz)}
                        className="hidden"
                      />
                      <span>{sz}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="price">Price</label>
                <input 
                  type="text" 
                  id="price" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-[20rem] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600" 
                />
              </div>

              {/* Quantity Adjuster */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="quantity">Quantity</label>
                <div className="flex items-center space-x-2 justify-center">
                  <button 
                    type="button"
                    className="bg-gray-300 text-gray-700 rounded-full px-3 py-1 font-semibold hover:bg-gray-400" 
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <input 
                    id="quantity" 
                    type="text" 
                    value={quantity} 
                    readOnly
                    className="w-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  />
                  <button 
                    type="button"
                    className="bg-gray-300 text-gray-700 rounded-full px-3 py-1 font-semibold hover:bg-gray-400" 
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Availability Dropdown */}
              <div className="relative">
              <label className="block text-gray-600 mb-2" htmlFor="availability">Availability</label>
              <select 
                id="availability" 
                value={availability} 
                onChange={(e) => setAvailability(e.target.value)}
                className="w-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
              >
                <option>Available</option>
                <option>Unavailable</option>
              </select>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-500"></i>
              </span>
            </div>

            </div>

            {/* Add Item Button */}
            <div className="text-center">
              <button 
                type="submit"
                className="w-64 h-12 mt-5 mb-6 bg-purple-600 text-white text-xl font-thin p-2 rounded-xl hover:bg-purple-200 hover:text-black transition-colors duration-200"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default AdminAdditem;
