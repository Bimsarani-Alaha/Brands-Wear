import React from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import sampleImage from '../Images/sample-image1.jpeg'; // Ensure this path is correct
import { Link } from 'react-router-dom';

function AcceptAdminOrder() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
          
          {/* Image and Form Section */}
          <div className="flex mb-6">
            <img className="w-32 h-32 rounded-md object-cover mr-4" src={sampleImage} alt="Item" />
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Category</label>
                <select className="border rounded-md p-2 w-full">
                  <option>Frocks</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Size</label>
                <div className="flex space-x-2">
                  <button className="border rounded-md px-2 py-1">S</button>
                  <button className="border rounded-md px-2 py-1">M</button>
                  <button className="border rounded-md px-2 py-1">L</button>
                  <button className="border rounded-md px-2 py-1">XL</button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Price</label>
                <input
                  type="text"
                  placeholder="3000.00 /="
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Quantity</label>
                <div className="flex items-center">
                  <button className="border rounded-md px-2 py-1">+</button>
                  <input
                    type="number"
                    value="3"
                    className="border rounded-md mx-2 w-12 text-center"
                  />
                  <button className="border rounded-md px-2 py-1">-</button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-purple-500 text-white px-8 py-3 rounded-lg">Submit</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AcceptAdminOrder;
