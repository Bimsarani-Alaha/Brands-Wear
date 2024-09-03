import React from 'react';
import bgimg from '../Images/Loginback.jpeg';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

function Login() {
  return (
    <div className='min-h-screen'>

      <Navigation/>
          {/* Login Form */}
          <div className="flex-grow flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgimg}` }}>
          <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg mt-[35rem] mb-[35rem] shadow-lg max-w-md w-full">
                    <h2 className="text-center text-white text-2xl mb-6 font-bold">GREAT TO HAVE YOU BACK</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-2" htmlFor="email">Email Address</label>
                            <input className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300" type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-2" htmlFor="password">Password</label>
                            <input className="w-full p-3 rounded bg-gray-200 focus:bg-gray-300" type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg text-center font-semibold" type="submit">Log in</button>
                    </form>
                    <div className="text-center mt-4 text-gray-300">
                        <a href="#" className="underline">if you're not a customer? click here</a>
                    </div>
                </div>
            </div>
     
             
      <Footer/>
      
    </div>
  );
}

export default Login;