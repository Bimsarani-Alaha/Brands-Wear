import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

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
    const price = filteredOrders.reduce((acc, order) => acc + order.price, 0);
    setTotalPrice(price);
  }, [orders, selectedCategory]);

  const filteredOrders = selectedCategory === 'All' ? orders : orders.filter(order => order.category === selectedCategory);
  const searchedOrders = filteredOrders.filter(order => order.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text(`Orders for User ID: ${userId}`, 10, 10);
    pdf.text(`Total Price: ${totalPrice} LKR`, 10, 20);
    pdf.text(`Category: ${selectedCategory}`, 10, 30);

    let y = 40; // Starting Y position for orders
    searchedOrders.forEach(order => {
      pdf.text(`Item Name: ${order.itemName}`, 10, y);
      pdf.text(`Price: ${order.price} LKR`, 10, y + 10);
      pdf.text(`Category: ${order.category}`, 10, y + 20);
      y += 30; // Space between orders
    });

    pdf.save('report.pdf');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
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
          {searchedOrders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold">{order.itemName}</h2>
              <img src={order.imageURL} alt={order.itemName} className="h-40 w-full object-cover mb-2" />
              <p>Category: {order.category}</p>
              <p>Price: {order.price} LKR</p>
              <p>
                Sizes Available: 
                <div>Small:{order.small}</div>
                <div>Medium:{order.medium}</div> 
                <div>Large:{order.large}</div>
                <div>Extra Large:{order.extraLarge}</div>
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price: {totalPrice} LKR</h3>
        <button
          onClick={generatePDF}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;
