import React, { useState } from 'react';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';

function AdminAdditem() {
  const [quantity, setQuantity] = useState(3);
  const [category, setCategory] = useState("Long Frocks");
  const [size, setSize] = useState("M");
  const [availability, setAvailability] = useState("Available");
  
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Navigation */}
      <AdminNavigation />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Add New Item</h2>
          
          {/* Form Section */}
          <div className="flex justify-between items-center mb-6">
            {/* Image Placeholder */}
            <div className="w-1/3">
              <img src="/path/to/dress/image.png" alt="Dress" className="rounded-lg" />
            </div>
            
            {/* Form Fields */}
            <div className="w-2/3 space-y-4">
              {/* Category Dropdown */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="category">Category</label>
                <select 
                  id="category" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                <div className="flex space-x-4">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <label className="inline-flex items-center" key={sz}>
                      <input 
                        type="radio" 
                        name="size" 
                        value={sz} 
                        checked={size === sz}
                        onChange={() => setSize(sz)}
                        className="form-radio text-purple-600"
                      />
                      <span className="ml-2">{sz}</span>
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
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  placeholder="3000.00/=" 
                />
              </div>

              {/* Quantity Adjuster */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="quantity">Quantity</label>
                <div className="flex items-center space-x-2">
                  <button 
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
                    className="bg-gray-300 text-gray-700 rounded-full px-3 py-1 font-semibold hover:bg-gray-400" 
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Availability Dropdown */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="availability">Availability</label>
                <select 
                  id="availability" 
                  value={availability} 
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              {/* Add Item Button */}
              <div className="mt-6">
                <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors duration-200">
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminAdditem;
