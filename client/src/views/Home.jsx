import React from 'react';
import HomeNavigation from './Components/HomeNavigation';
import bgimg from '../Images/homeback.png';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <HomeNavigation/>
      <div
        className="flex-grow flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: 'calc(100vh - 5rem)', // adjust based on HomeNavigation height
        }}
      >
        <div className='text-center text-white space-y-4'>
          <h1 className='text-4xl font-bold text-black'>Welcome to BRANDS WEAR</h1>
          <p className='text-2xl text-black'>Your Ultimate Destination for Trendy and Affordable Fashion</p>
        </div>
        {/* Supplier Button Positioned in the Right Corner */}
        <div className="absolute bottom-10 right-10 text-white p-4 rounded shadow">
          If you’re a supplier <Link to ='/SupplierRegForm'> <button className="ml-2 p-2 text-white">Click here</button></Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
