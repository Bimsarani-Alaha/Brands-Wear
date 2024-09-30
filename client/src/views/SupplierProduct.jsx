import React from 'react';
import bgimg from '../Images/background-image.png'; // If needed
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import sampleImage1 from '../Images/sample-image1.jpeg'; // Replace with the actual image path
import sampleImage2 from '../Images/sample-image2.png'; // Replace with the actual image path
import { Link } from 'react-router-dom';

function SupplierProduct() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full">
          {/* Product Card 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex mb-6">
            <img className="w-32 h-32 rounded-md object-cover mr-4" src={sampleImage1} alt="short frock" />
            <div className="flex-1">
              <div className="text-lg font-semibold mb-2">Category: short frock</div>
              <div className="text-sm mb-2">Size: S</div>
              <div className="text-sm mb-2">Prize: LKR.4500.00</div>
              <div className="text-sm mb-4">Quantity: 10</div>
              <div className="flex space-x-4">
                {/* Link to UpdateItem Page */}
                <Link to="/UpdateItem">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Update</button>
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>   
          </div>

          {/* Product Card 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex mb-6">
            <img className="w-32 h-32 rounded-md object-cover mr-4" src={sampleImage2} alt="Long Frocks" />
            <div className="flex-1">
              <div className="text-lg font-semibold mb-2">Category: Long Frocks</div>
              <div className="text-sm mb-2">Size: L</div>
              <div className="text-sm mb-2">Prize: LKR.6200.00</div>
              <div className="text-sm mb-4">Quantity: 20</div>
              <div className="flex space-x-4">
                {/* Link to UpdateItem Page */}
                <Link to="/UpdateItem">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Update</button>
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>
          </div>

          {/* Add Item Button */}
          <div className="flex justify-center mt-8">
            <Link to="/AddItem"><button className="bg-purple-500 text-white px-8 py-3 rounded-lg">Add item</button></Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SupplierProduct;
