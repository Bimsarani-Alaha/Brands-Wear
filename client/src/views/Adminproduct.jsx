import React from 'react';
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';
import bgimg from '../Images/itemn-remove.png';
import bgimg2 from '../Images/item-remove.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';



function AdminProduct() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation/>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Product List Section */}
        <div className="flex-grow container mx-auto p-6">
          <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
            {/* Title */}
            <h1 className="text-4xl font-thin text-gray-700 mb-6">Add Your Product Here</h1>

            {/* Main Content - Products */}
            <div className="w-full flex flex-col items-center space-y-6">
              {/* Product 1 */}
              <div className="bg-white p-10 rounded-xl shadow flex items-center space-x-4 mt-10 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105">
                <img src={bgimg} alt="Blue Dress" className="h-40 w-auto rounded-xl mr-24" />
                <div className="flex-grow space-y-2 text-start">
                  <p className="text-gray-600">Category: <span className="font-bold">Short Frock</span></p>
                  <p className="text-gray-600">Price: <span className="font-bold">LKR 3200.00</span></p>
                  <p className="text-gray-600">Quantity: <span className="font-bold">20</span></p>
                  <p className="text-gray-600">Size: <span className="font-bold">S</span></p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="bg-purple-600 border text-white px-4 py-2 rounded-md hover:bg-white hover:border-black hover:text-black transition duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Update
                  </button>

                  <button className="bg-red-600 border border-red-700 px-4 py-2 rounded-md hover:bg-white hover:text-black text-white font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white p-10 rounded-lg shadow flex items-center space-x-4 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105">
                <img src={bgimg2} alt="White Dress" className="h-52 w-auto rounded mr-14" />
                <div className="flex-grow space-y-2 text-start">
                  <p className="text-gray-600">Category: <span className="font-bold">Short Frock</span></p>
                  <p className="text-gray-600">Price: <span className="font-bold">LKR 2200.00</span></p>
                  <p className="text-gray-600">Quantity: <span className="font-bold">30</span></p>
                  <p className="text-gray-600">Size: <span className="font-bold">M</span></p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="bg-purple-600 border text-white px-4 py-2 rounded-md hover:bg-white hover:border-black hover:text-black transition duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Update
                  </button>

                  <button className="bg-red-600 border border-red-700 px-4 py-2 rounded-md hover:bg-white hover:text-black text-white font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>

              </div>

              {/* Add Item Button */}
              <div className="text-center mt-10">
              <Link to='/AdminAdditem'>
                <button className="bg-purple-700 mt-5 text-white text-xl font-thin px-6 py-2 w-40 h-14 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Item
                </button>
              </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AdminProduct;
