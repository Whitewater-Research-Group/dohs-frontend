
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu visibility

  return (
    <header className="bg-white text-black w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-around">
        <div className="flex items-center">
          <span className="text-2xl font-extrabold">DOHS</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green hover:border-b-2 hover:pb-1 hover:transition-all hover:duration-3000 hover:ease-in-out hover:delay-1">Home</Link>
          <Link to="/about" className="hover:text-green hover:border-b-2 hover:pb-1 hover:transition-all hover:duration-3000 hover:ease-in-out hover:delay-1">About</Link>
          <Link to="/surveillance-data" className="hover:text-green hover:border-b-2 hover:pb-1 hover:transition-all hover:duration-3000 hover:ease-in-out hover:delay-1">Surveillance Data</Link>
          <Link to="/stakeholders" className="hover:text-green hover:border-b-2 hover:pb-1 hover:transition-all hover:duration-3000 hover:ease-in-out hover:delay-1">Stakeholders</Link>
          <Link to="/login" className="hover:text-green hover:border-b-2 hover:pb-1 hover:transition-all hover:duration-3000 hover:ease-in-out hover:delay-1">Login</Link>
        </nav>
        <div className="hidden md:flex space-x-4">
          <a href="tel:000000000" className=" text-secondary py-2 px-4">
            Call <span className="font-bold"> +234 800 000</span>
          </a>
          <Link to="/login" className="bg-secondary hover:bg-white hover:text-secondary hover:border-secondary text-white py-2 px-4 rounded-3xl">
            Consult Online
          </Link>
        </div>
        <button className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Home</Link>
          <Link to="/about" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">About</Link>
          <Link to="/surveillance-data" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Surveillance Data</Link>
          <Link to="/stakeholders" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Stakeholders</Link>
          <a href="tel:000000000" className="block px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Call 000000000</a>
          <Link to="/login" className="block px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
