import React from 'react';
import AdminNavigation from './Components/AdminNavigation';
import bgimg from '../Images/homeback.png';
import Footer from './Components/Footer';

function Adminpage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AdminNavigation />
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
      </div>
      <Footer />
    </div>
  );
}

export default Adminpage;
