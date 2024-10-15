import React, { useEffect, useState } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateReport = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Long Frocks', 'Short Frocks', 'Party Frocks', 'Kids Frocks'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/showOrdersbyuserId/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  useEffect(() => {
    // Calculate total price for filtered orders
    const filteredOrders = selectedCategory === 'All' ? orders : orders.filter(order => order.category === selectedCategory);
    
    const price = filteredOrders.reduce((acc, order) => {
      const fullQuantity = order.small + order.medium + order.large + order.extraLarge;
      return acc + (order.price * fullQuantity);
    }, 0);

    setTotalPrice(price);
  }, [orders, selectedCategory]);

  const filteredOrders = selectedCategory === 'All' ? orders : orders.filter(order => order.category === selectedCategory);
  const searchedOrders = filteredOrders.filter(order => order.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Set title and header styling
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(40, 44, 53); // Dark text color
    pdf.text(`Orders Report for User ID: ${userId}`, 10, 15);
  
    // Add subheading with category and total price
    pdf.setFontSize(14);
    pdf.setFont('Helvetica', 'normal');
    pdf.text(`Category: ${selectedCategory}`, 10, 25);
    pdf.text(`Total Price: ${totalPrice.toFixed(2)} LKR`, 10, 35);
  
    // Prepare order data with the new "Total Price" column
    const orderData = searchedOrders.map(order => {
      const fullQuantity = order.small + order.medium + order.large + order.extraLarge;
      const totalOrderPrice = order.price * fullQuantity;
      return [
        order.itemName,
        `${order.price} LKR`,
        order.category,
        order.small,
        order.medium,
        order.large,
        order.extraLarge,
        `${totalOrderPrice.toFixed(2)} LKR` // Total Price for each order
      ];
    });
  
    // Column titles
    const columns = [
      'Item Name', 
      'Price per Item', 
      'Category', 
      'Small', 
      'Medium', 
      'Large', 
      'Extra Large', 
      'Total Price'
    ];
  
    // Generate table with better styling and layout
    pdf.autoTable({
      head: [columns],
      body: orderData,
      startY: 45, // Start below the title
      theme: 'striped', // Striped table for better readability
      headStyles: {
        fillColor: [208, 191, 255],  // Light purple color (Hex: #D0BFFF)
        textColor: 255, // White text for headers
        fontSize: 12, // Slightly larger font for header
        halign: 'center' // Center align the header
      },
      bodyStyles: {
        fontSize: 10, // Smaller font for table body
        halign: 'center', // Center align the table body
      },
      styles: { 
        lineColor: [44, 62, 80], // Dark border color for rows
        lineWidth: 0.1 
      },
      columnStyles: {
        0: { halign: 'left' }, // Left align item name
      }
    });
  
    // Footer with total price for all orders
    pdf.setFontSize(14);
    pdf.text(`Total Price for All Orders: ${totalPrice.toFixed(2)} LKR`, 10, pdf.lastAutoTable.finalY + 10);
  
    // Save the PDF
    pdf.save('orders_report.pdf');
  };
  

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Orders for User ID: {userId}</h1>
      
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by item name"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchedOrders.length === 0 ? (
        <p>No orders found for this user.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedOrders.map(order => {
            const fullQuantity = order.small + order.medium + order.large + order.extraLarge;
            const totalOrderPrice = order.price * fullQuantity;

            return (
              <div key={order._id} className="border rounded-lg p-4 shadow-md flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-2">{order.itemName}</h2>
                <img src={order.imgUrl} alt={order.itemName} className="h-48 w-auto object-cover rounded-lg mb-2" />
                <p>Category: {order.category}</p>
                <p>Price per Item: {order.price} LKR</p>
                <p>
                  Sizes Available: 
                  <div>Small: {order.small}</div>
                  <div>Medium: {order.medium}</div> 
                  <div>Large: {order.large}</div>
                  <div>Extra Large: {order.extraLarge}</div>
                </p>
                <p>Total Quantity: {fullQuantity}</p>
                <p>Total Price: {totalOrderPrice} LKR</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Sub Total Price: {totalPrice} LKR</h3>
        <button
          onClick={generatePDF}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Generate PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateReport;
