import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import auto-table plugin
import AdminNavigation from './Components/AdminNavigation';
import Footer from './Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from "../Images/logo.png";

function Inventory() {
  const navigate = useNavigate(); 
  const { userId } = useParams();

  const [inventoryData, setInventoryData] = useState([]);
  const [selectedReportCategory, setSelectedReportCategory] = useState('All Categories'); 

  useEffect(() => {
    axios.get('http://localhost:3001/showCustomer')
      .then(response => setInventoryData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredInventory = selectedReportCategory === 'All Categories' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === selectedReportCategory);

  const handlePlaceOrder = (itemName) => {
    navigate('/AdminPlaceOrder', { state: { itemName } });
  };

  const handleFullInventoryReport = () => {
    const doc = new jsPDF();

    // Title with the logo
    doc.addImage(logo, 'PNG', 160, 10, 40, 20);
    doc.setFontSize(18);
    doc.text('Full Inventory Report', 14, 50);

    // Generate table with auto-table
    const tableData = filteredInventory.map(item => ([
      item.itemName,
      item.category,
      item.small,
      item.medium,
      item.large,
      item.extraLarge,
    ]));

    doc.autoTable({
      head: [['Item Name', 'Category', 'Small', 'Medium', 'Large', 'XL']],
      body: tableData,
      startY: 60,
      theme: 'grid', // Optional: 'grid', 'striped', 'plain'
    });

    doc.save('Full_Inventory_Report.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminNavigation />

      <div className="flex-grow flex justify-center items-center p-8">
        <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Inventory</h2>


            <div className="flex  items-center mb-6 gap-5">

            <Link to={`/AdminOrderStatus/${userId}`}>
              <button className="bg-purple-500 w-28 text-white px-4 ml-[40rem] py-2 rounded-md shadow hover:bg-purple-600 transition duration-300">
                Order Status
              </button>
            </Link>
              <select
                value={selectedReportCategory}
                onChange={(e) => setSelectedReportCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-purple-300"
              >
                <option value="All Categories">All Categories</option>
                <option value="Long Frocks">Long Frocks</option>
                <option value="Short Frocks">Short Frocks</option>
                <option value="Party Frocks">Party Frocks</option>
                <option value="Kids Frocks">Kids Frocks</option>
              </select>

              <button
                className="bg-blue-500 text-white w-28 px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
                onClick={handleFullInventoryReport}
              >
              Inventory Report
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-6 py-3 text-left">Image</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Category</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Item Name</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Small</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Medium</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Large</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Extra Large</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Place Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map(item => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-6 py-3">
                        <img src={item.imgUrl} alt={item.itemName} className="w-16 h-16 object-cover rounded-md" />
                      </td>
                      <td className="border border-gray-300 px-6 py-3">{item.category}</td>
                      <td className="border border-gray-300 px-6 py-3">{item.itemName}</td>
                      <td className="border border-gray-300 px-6 py-3">{item.small}</td>
                      <td className="border border-gray-300 px-6 py-3">{item.medium}</td>
                      <td className="border border-gray-300 px-6 py-3">{item.large}</td>
                      <td className="border border-gray-300 px-6 py-3">{item.extraLarge}</td>
                      <td className="border border-gray-300 px-6 py-3">
                        <Link to={`/AdminPlaceOrder/${item._id}/${userId}`}>
                          <button className="flex items-center bg-gray-300 text-black px-4 py-2 rounded-md shadow hover:bg-gray-400 transition duration-300">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Order
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No items found for the selected category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Inventory;
