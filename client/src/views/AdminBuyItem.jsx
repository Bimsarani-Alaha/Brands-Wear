import React, { useEffect, useState } from 'react'; 
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios';

function AdminBuyItem() {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    axios.get('http://localhost:3001/showSupplierProducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        toast.error("Failed to load products. Please try again later.", {
          position: "top-center", // Changed to string format
        });
      });
  }, []);

  // Function to handle buying an item
  const handleBuyItem = (product) => { 
    axios.post('http://localhost:3001/AddItem', {
      itemName: product.itemName,
      category: product.category,
      price: product.Price,
      size: "L", // Adjust size based on user selection if applicable
      itemCode: product.itemCode,
      imgUrl: product.imageURL,
      large: product.large,
      small: product.small,
      medium: product.medium,
      extraLarge: product.extraLarge,
    })
    .then(() => {
      toast.success(`${product.itemName} purchased successfully!`, {
        position: "top-center", // Changed to string format
      });
    })
    .catch(() => {
      toast.error(`Failed to purchase ${product.itemName}. Please try again.`, {
        position: "top-center", // Changed to string format
      });
    });
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
      
      {/* Main Content */}
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center space-x-4 bg-[#D9D9D9] ml-52 mr-52 mt-10 rounded-xl py-10 mb-20">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white p-10 rounded-xl shadow flex items-center space-x-4 mt-10 w-[50rem] transition duration-300 ease-in-out transform hover:scale-105">
                <img className="w-32 h-32 rounded-md object-cover mr-4" src={product.imageURL} alt={product.itemName} />
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2">Category: {product.category}</div>
                  <div className="text-sm mb-2">Price: LKR. {product.Price}</div>
                  <div className="text-sm mb-4">Small: {product.small}</div>
                  <div className="text-sm mb-4">Medium: {product.medium}</div>
                  <div className="text-sm mb-4">Large: {product.large}</div>
                  <div className="text-sm mb-4">Extra Large: {product.extraLarge}</div>
                  <button 
                    onClick={() => handleBuyItem(product)} 
                    className="w-64 h-12 mt-5 mb-6 bg-purple-500 text-white text-xl font-thin p-2 rounded-xl hover:bg-purple-200 hover:text-black transition-colors duration-200 focus:ring-2 focus:ring-purple-600"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No products available at the moment.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminBuyItem;
