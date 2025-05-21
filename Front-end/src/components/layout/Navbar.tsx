import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, MessageSquare, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold"><a href="/" className='cursor-pointer'>PotatoDoctor</a></span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-green-200 ${isActive ? 'text-green-200 font-medium' : 'text-white'}`
              }
            >
              Disease Detection
            </NavLink>
            <NavLink 
              to="/chat"
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-green-200 ${isActive ? 'text-green-200 font-medium' : 'text-white'}`
              }
            >
              Farming Assistant
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-200 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive ? 'bg-green-900 text-white' : 'text-white hover:bg-green-600'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                Disease Detection
              </div>
            </NavLink>
            <NavLink 
              to="/chat"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive ? 'bg-green-900 text-white' : 'text-white hover:bg-green-600'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Farming Assistant
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;