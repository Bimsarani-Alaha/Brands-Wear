import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import bgimg from '../Images/background-image.png';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function SupplierRegForm() {
  const [company, setCompany] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({}); // State to store validation errors

  const navigate = useNavigate(); // Create a navigate function

  const validateForm = () => {
    const newErrors = {};
    if (!company) newErrors.company = 'Company name is required.';
    if (!firstname) newErrors.firstname = 'First name is required.';
    if (!lastname) newErrors.lastname = 'Last name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!contact) newErrors.contact = 'Contact number is required.';
    if (!address) newErrors.address = 'Address is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await axios.post('http://localhost:3001/addSupplier', {
        company,
        firstname,
        lastname,
        email,
        contact,
        address
      });

      console.log('Supplier registered:', response.data);

      // Clear the form fields
      setCompany('');
      setFirstname('');
      setLastname('');
      setEmail('');
      setContact('');
      setAddress('');

      // Navigate to the supplier product page after successful submission
      navigate('/supplierProduct');
    } catch (error) {
      console.error('Error registering supplier:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <Navigation />

      <div className="flex justify-center items-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-center text-white text-2xl mb-6 font-bold">Welcome To Supplier Registration</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="company">Supplier Company Name</label>
              <input
                className={`w-full p-3 rounded ${errors.company ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="text"
                id="company"
                placeholder="Enter your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="firstname">First Name</label>
              <input
                className={`w-full p-3 rounded ${errors.firstname ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="text"
                id="firstname"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="lastname">Last Name</label>
              <input
                className={`w-full p-3 rounded ${errors.lastname ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="email">Email</label>
              <input
                className={`w-full p-3 rounded ${errors.email ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="contact">Contact Number</label>
              <input
                className={`w-full p-3 rounded ${errors.contact ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="text"
                id="contact"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="address">Address</label>
              <input
                className={`w-full p-3 rounded ${errors.address ? 'bg-red-100' : 'bg-gray-200'} focus:bg-gray-300`}
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg text-center font-semibold" type="submit">Sign up</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SupplierRegForm;
