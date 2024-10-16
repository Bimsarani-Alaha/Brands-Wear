import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // For automatic table generation
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function SupplierProduct() {
  const [products, setProducts] = useState([]); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to show loading state
  const { userId } = useParams(); // Capture userId from the URL

  useEffect(() => {
    // Fetch products based on userId from the backend
    axios.get(`http://localhost:3001/showSupplierProductsbyuserId/${userId}`)
      .then(response => {
        setProducts(response.data); // Set fetched products into state
        setLoading(false); // Turn off loading once data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
        setLoading(false); // Turn off loading even if there's an error
      });
  }, [userId]); // Dependency array now includes userId

  // Handle delete product
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:3001/deleteProduct/${productId}`)
        .then(response => {
          alert("Product deleted successfully!");
          // Remove the deleted product from the local state
          setProducts(products.filter(product => product._id !== productId));
        })
        .catch(error => {
          console.error("There was an error deleting the product!", error);
          alert("Failed to delete the product.");
        });
    }
  };

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Supplier Products Report', 14, 16);
    
    // Create table data
    const tableData = products.map(product => [
      product.itemCode,
      product.itemName,
      product.small,
      product.medium,
      product.large,
      product.extraLarge,
      product.Price,
    ]);
  
    // Define columns
    const columns = ["Item Code", "Item Name", "Small", "Medium", "Large", "Extra Large", "Price"];
    
    // Add autoTable with header color
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 20,
      headStyles: {
        fillColor: [208, 191, 255]  // Light purple color (Hex: #D0BFFF)
      }
    });
  
    // Save the PDF
    doc.save('Supplier_Products_Report.pdf');
  };
  

  if (loading) {
    return <div>Loading products...</div>; // Simple loading message
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      
      {/* Main Content */}
       {/* Add Item Button */}
       <div className="flex justify-center mt-8">
            <Link to={`/AddItem/${userId}`}><button className="bg-purple-500 text-white px-8 py-3 rounded-lg">+ Add item</button></Link>
          </div>
          
          {/* Generate Report Button */}
          <div className="flex justify-center mt-8">
            <button onClick={generatePDF} className="mt-4 px-6 py-2 bg-blue-300 text-white font-semibold rounded shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out">Generate Report PDF</button>
          </div>

      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(product => (
              <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex mb-6">
                <img className="w-32 h-32 rounded-md object-cover mr-4" src={product.imgUrl || 'placeholder.jpg'} alt={product.itemName} />
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2">Category: {product.Category}</div>
                  <div className="text-sm mb-4">Item Code: {product.itemCode}</div>
                  <div className="text-sm mb-4">Item Name: {product.itemName}</div>
                  <div className="text-sm mb-2">Small: {product.small}</div>
                  <div className="text-sm mb-2">Medium: {product.medium}</div>
                  <div className="text-sm mb-2">Large: {product.large}</div>
                  <div className="text-sm mb-2">Extra Large: {product.extraLarge}</div>
                  <div className="text-sm mb-2">Price: LKR {product.Price}</div>
                  <div className="flex space-x-4">
                    {/* Link to UpdateItem Page */}
                    <Link to={`/UpdateItem/${product._id}/${userId}`}>
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Update</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

         
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SupplierProduct;
