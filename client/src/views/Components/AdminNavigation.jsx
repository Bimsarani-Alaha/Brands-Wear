import React from 'react';
import Logo from '../../Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      {/* Navigation Bar */}
      <div className='flex justify-between items-center h-auto bg-[#D9D9D9]'>
        {/* Left side: Logo */}
        <div className='flex items-center'>
          <img src={Logo} alt="Logo" className='h-40' />
        </div>

        {/* Center: Navigation Buttons */}
        <div className='flex items-center space-x-2'>
          <Link to ='/Adminproduct'><button>Product category</button></Link>
          <span>&nbsp;|&nbsp;</span>
          <button>Inventory</button>
          <span>&nbsp;|&nbsp;</span>
          <button>Supplier Products</button>
        </div>
        
        {/* Right side: User Icon */}
        <div className='flex items-center space-x-4 pr-6'>
          <FontAwesomeIcon icon={faUser} />
          <span>Welcom  Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Navigation;