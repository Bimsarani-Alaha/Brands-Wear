import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function UpdateItem() {
  const { itemId } = useParams(); // Get the itemId from URL

  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    Category: 'Long Frocks',
    small: 0,
    medium: 0,
    large: 0,
    extraLarge: 0,
    Price: '',
    totalPrice: 0 // Added totalPrice field
  });

  const [previousCodes, setPreviousCodes] = useState(new Set());

  // Fetch product details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3001/showSupplierProductsById/${itemId}`)
      .then(response => {
        const product = response.data;
        setFormData({
          itemCode: product.itemCode,
          itemName: product.itemName,
          Category: product.Category,
          small: product.small,
          medium: product.medium,
          large: product.large,
          extraLarge: product.extraLarge,
          Price: product.Price,
          totalPrice: calculateTotalPrice(product.small, product.medium, product.large, product.extraLarge, product.Price) // Calculate total price on fetch
        });
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product.');
      });
  }, [itemId]);

  const calculateTotalPrice = (small, medium, large, extraLarge, price) => {
    const totalQuantity = Number(small) + Number(medium) + Number(large) + Number(extraLarge);
    return totalQuantity * Number(price); // Total price calculation based on all quantities and price
  };

  const generateItemCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (previousCodes.has(code));

    setFormData(prev => ({ ...prev, itemCode: code }));
    setPreviousCodes(prev => new Set(prev).add(code));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (['small', 'medium', 'large', 'extraLarge', 'Price'].includes(name)) {
        const totalPrice = calculateTotalPrice(
          Number(updatedData.small),
          Number(updatedData.medium),
          Number(updatedData.large),
          Number(updatedData.extraLarge),
          Number(updatedData.Price)
        );
        return { ...updatedData, totalPrice };
      }

      return updatedData;
    });
  };

  const handleSizeChange = (e, size) => {
    const value = Number(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, [size]: value };
      const totalPrice = calculateTotalPrice(
        updatedData.small,
        updatedData.medium,
        updatedData.large,
        updatedData.extraLarge,
        updatedData.Price
      );
      return { ...updatedData, totalPrice };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/UpdateProduct/${formData.itemCode}`, formData);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-4xl mt-14 mb-44">
          <h2 className="text-3xl font-thin mb-16 text-center">Update Item</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Code */}
          <div className="mb-4">
            <label className="block text-gray-700 text-[1.2rem] text-center mb-4" htmlFor="itemCode">
              Item Code
            </label>
            <input
              type="text"
              name="itemCode"
              value={formData.itemCode}
              readOnly
              className="w-40 text-center h-12 text-xl p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-[1.2rem] text-center mb-4" htmlFor="itemName">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-[30rem] text-start text-xl h-12 p-2 pl-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-[1.2rem] text-center mb-4" htmlFor="Category">
              Category
            </label>
            <select 
              name="Category" 
              value={formData.Category} 
              onChange={handleChange}
              className="w-50 text-start h-12 p-2 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="Long Frocks">Long Frocks</option>
              <option value="Short Frocks">Short Frocks</option>
              <option value="Party Frocks">Party Frocks</option>
              <option value="Kids Frocks">Kids Frocks</option>
            </select>
          </div>

          {/* Sizes and Quantities */}
          <div className="mb-4">
            <label className="block text-gray-700 text-[1.2rem] text-center mb-6">
              Sizes and Quantities
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['small', 'medium', 'large', 'extraLarge'].map((size) => (
                <div key={size} className="flex items-center">
                  <label className="w-40 text-center capitalize">{size}</label>
                  <input
                    type="number"
                    name={size}
                    value={formData[size]}
                    onChange={(e) => handleSizeChange(e, size)}
                    className="w-full p-2 border rounded"
                    min="0"
                    placeholder={`Qty for ${size}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-xl text-center mb-4" htmlFor="Price">
              Price
            </label>
            <input
              type="text"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              className="w-60 h-12 p-2 pl-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-xl text-center mb-4">
              Total Price
            </label>
            <input
              type="text"
              name="totalPrice"
              value={formData.totalPrice}
              readOnly
              className="w-60 h-12 p-2 pl-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-500 text-white px-8 py-4 rounded-mdt"
          >
            Update Item
          </button>
        </form>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default UpdateItem;
