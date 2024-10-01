import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';

function AdminPlaceOrder() {
  const location = useLocation(); // Get the item name from navigation state
  const { itemName } = location.state || {};

  // State management for form inputs
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [neededDate, setNeededDate] = useState('');
  const [supplier, setSupplier] = useState('');

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle place order logic
  const handlePlaceOrder = () => {
    // Validation: check if all required fields are filled
    if (!selectedSize || !quantity || !neededDate || !supplier) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Here, you would typically send this data to your backend
    const orderDetails = {
      itemName,
      size: selectedSize,
      quantity,
      neededDate,
      supplier,
    };

    console.log('Placing order:', orderDetails);

    // Reset form after placing order
    alert('Order placed successfully!');
    setSelectedSize('');
    setQuantity('');
    setNeededDate('');
    setSupplier('');
  };

  // Handle delete logic
  const handleDelete = () => {
    // Reset all fields
    setSelectedSize('');
    setQuantity('');
    setNeededDate('');
    setSupplier('');
    alert('Order has been cleared.');
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full">
          {/* Display the Item Name */}
          <div className="text-2xl font-bold mb-4">Place Order for: {itemName || 'N/A'}</div>

          {/* Product Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <div className="text-lg font-semibold mb-2">{itemName || 'Product Name'}</div>

              {/* Size Selection */}
              <div className="mb-2">
                <div className="text-sm font-medium mb-2">Size:</div>
                <div className="flex justify-center space-x-2"> {/* Centering with flex */}
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded ${selectedSize === size ? 'bg-purple-400 text-white' : 'bg-gray-200'}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mb-2">
                <label className="block text-sm font-medium">Quantity:</label>
                <input
                  className="bg-gray-200 p-2 rounded w-full"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Needed Date Input */}
              <div className="mb-2">
                <label className="block text-sm font-medium">Needed Date:</label>
                <input
                  className="bg-gray-200 p-2 rounded w-full"
                  type="date"
                  value={neededDate}
                  onChange={(e) => setNeededDate(e.target.value)}
                />
              </div>

              {/* Supplier Input */}
              <div className="mb-2">
                <label className="block text-sm font-medium">Supplier:</label>
                <input
                  className="bg-gray-200 p-2 rounded w-full"
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Supplier Name"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
                onClick={handlePlaceOrder}
              >
                +Place Order
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminPlaceOrder;
