import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimg from '../Images/LoginBack.jpg';
import HomeNavigation from './Components/HomeNavigation';
import Footer from './Components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(password)
      const response = await axios.post('http://localhost:3001/login', { email, password });
      console.log(password)
      if (response.status === 200) {
        // Navigate to the admin page on successful login
        navigate('/AdminPage'); // Adjust the path as needed
      } else {
        // Handle other statuses if needed
        setErrorMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      // Handle error response
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className='min-h-screen'>
     <HomeNavigation/>
      <div className="flex-grow flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg mt-[35rem] mb-[35rem] shadow-lg max-w-md w-full">
          <h2 className="text-center text-white text-2xl mb-6 font-bold">GREAT TO HAVE YOU BACK</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="email">Email Address</label>
              <input 
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300" 
                type="email" 
                id="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="password">Password</label>
              <input 
                className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300" 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg text-center font-semibold" type="submit">
              Log in
            </button>
          </form>
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
          <div className="text-center mt-4 text-gray-300">
            <a href="#" className="underline">If you're not a customer? Click here</a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
