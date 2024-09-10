import React from 'react';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';

function AdminProduct() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation/>

    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Product List Section */}
      <div className="flex-grow container mx-auto p-6">
        <div className="flex space-x-4">

          {/* Main Content - Products */}
          <div className="w-4/5 space-y-6">
            {/* Product 1 */}
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <img src="/path/to/blue-dress.png" alt="Blue Dress" className="h-32 w-32 rounded" />
              <div className="flex-grow space-y-2">
                <p className="text-gray-600">Category: <span className="font-bold">Short Frock</span></p>
                <p className="text-gray-600">Price: <span className="font-bold">LKR 3200.00</span></p>
                <p className="text-gray-600">Quantity: <span className="font-bold">20</span></p>
                <p className="text-gray-600">Size: <span className="font-bold">S</span></p>
              </div>
              <div className="space-x-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Update</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <img src="/path/to/white-dress.png" alt="White Dress" className="h-32 w-32 rounded" />
              <div className="flex-grow space-y-2">
                <p className="text-gray-600">Category: <span className="font-bold">Short Frock</span></p>
                <p className="text-gray-600">Price: <span className="font-bold">LKR 2200.00</span></p>
                <p className="text-gray-600">Quantity: <span className="font-bold">30</span></p>
                <p className="text-gray-600">Size: <span className="font-bold">M</span></p>
              </div>
              <div className="space-x-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Update</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Item Button */}
            <div className="text-center">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


export default AdminProductPage;

      <Footer/>
    </div>
  );
}

export default AdminProduct;
