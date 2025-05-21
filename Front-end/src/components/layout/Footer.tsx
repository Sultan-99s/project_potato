import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} PotatoDoctor. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            <span>for farmers by Badol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;