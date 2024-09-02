import React from 'react';
import Logo from '../images/logo.jpeg';
import Icon from '../images/icon.jpg';
import bgimg from '../images/background(2).jpeg';


function Login() {
  return (
   


        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-200 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={Logo} alt="Logo" className="h-8" />
                    <span className="font-bold text-purple-700 text-lg">BRANDS WEAR</span>
                </div>
                <button className="flex items-center bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded">
                    <img src={Icon} alt="Icon" className="h-6 w-6 rounded-full mr-2" />
                    <span>Sign In</span>
                </button>
            </header>

            {/* Login Form */}
            <div className="flex-grow flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url'(${bgimg})` }}>
                <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
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

            {/* Footer */}
            <footer className="bg-gray-200 p-6">
                <div className="max-w-screen-xl mx-auto flex justify-between text-sm text-gray-600">
                    <div className="space-y-2">
                        <h3 className="font-bold text-gray-800">About Us</h3>
                        <p>BRANDS WEAR offers trendy, affordable fashion with a focus on quality and exceptional customer service. Discover your style with us!</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-gray-800">Customer Support</h3>
                        <p>Contact No: 0707230078</p>
                        <p>Email: brandswear@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;



