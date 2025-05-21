import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const getBgImage = () => {
    if (location.pathname === '/') {
      return 'src/Images/potato-plant-spacing.webp';
    }
    return 'src/Images/potato-plant-spacing.webp';
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 -z-10" 
        style={{ backgroundImage: `url(${getBgImage()})` }}
      />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;