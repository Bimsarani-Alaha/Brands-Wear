import React from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function GenerateReport() {
  const salesData = [
    { category: 'Long Frocks', quantity: 100, deliveryDate: '2024-09-01' },
    { category: 'Short Frocks', quantity: 20, deliveryDate: '2024-09-05' },
    { category: 'Party Frocks', quantity: 5, deliveryDate: '2024-09-10' },
    { category: 'Kids Frocks', quantity: 50, deliveryDate: '2024-09-15' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Monthly Sales Report</h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Delivery Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {salesData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.category}</td>
                  <td className="py-3 px-6 text-left">{item.quantity}</td>
                  <td className="py-3 px-6 text-left">{item.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GenerateReport;
