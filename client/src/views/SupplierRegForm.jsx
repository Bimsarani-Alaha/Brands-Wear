import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import bgimg from '../Images/background-image.png';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function Supplier() {
  // Define state variables to handle form input
  const [company, setCompany] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual API URL
      const response = await axios.post('http://localhost:3001/addSupplier', {
        company,
        firstname,
        lastname,
        email,
        contact,
        address
      });

      // Handle the response if needed
      console.log('Supplier registered:', response.data);

      // Optionally clear the form after successful submission
      setCompany('');
      setFirstname('');
      setLastname('');
      setEmail('');
      setContact('');
      setAddress('');
    } catch (error) {
      console.error('Error registering supplier:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <Navigation/>

      {/* Main Content */}
      <div className="flex justify-center items-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-center text-white text-2xl mb-6 font-bold">Welcome To Supplier</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="company">Supplier Company Name</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="text"
                id="company"
                placeholder="Enter your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="firstname">First Name</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="text"
                id="firstname"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="lastname">Last Name</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="email">Email</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="contact">Contact Number</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="text"
                id="contact"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="address">Address</label>
              <input
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300"
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg text-center font-semibold" type="submit">Sign up</button>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Supplier;
