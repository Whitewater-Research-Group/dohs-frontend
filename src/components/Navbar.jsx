import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const navLinkClass = (isActive, baseClasses) =>
        `${baseClasses} ${isActive ? 'text-steelBlue font-semibold' : ''}`;

    return (
        <header className="bg-white shadow font-primary fixed top-0 left-0 w-full z-50 text-5xl md:text-lg">
            <div className="container w-full relative mx-auto p-6 flex flex-row justify-between items-center max-w-screen-xl sm:flex-row">
                <h1 className="text-3xl font-bold text-darkCharcoal mb-4 md:mb-0 w-auto">DOHS</h1>
                
                {/* Hamburger Icon */}
                <button
                    className="md:hidden text-darkCharcoal focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                
                {/* Menu */}
                <nav className={`absolute left-0 p-10 md:p-0 top-16  bg-white w-full md:w-auto md:top-0 md:relative md:flex flex-col md:flex-row ${isMenuOpen ? 'flex' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row  md:space-y-0 md:space-x-8 w-auto">
                        <li><NavLink to="/" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>About</NavLink></li>
                        <li><a href="#surveillance" className="text-darkCharcoal text-base">Surveillance Data</a></li>

                        

                        <li className="relative">
                            {/* Dropdown Toggle */}
                            <button onClick={toggleDropdown}   className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base focus:outline-none")}>Report</button>
                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <ul className="relative md:absolute left-0 mt-2 bg-white md:shadow-lg md:rounded-md">
                                        <li><NavLink to="/report-env-inc" className={({ isActive }) => navLinkClass(isActive, "block text-base px-4 py-2 text-darkCharcoal hover:bg-gray-200")}> Environmental Inclusiveness</NavLink></li>
                                        <li><NavLink to="/report-dis-cas" className={({ isActive }) => navLinkClass(isActive, "block text-base px-4 py-2 text-darkCharcoal hover:bg-gray-200")}>Disease Cases</NavLink></li>
                                    </ul>
                                )}
                        </li>


                        <li><a href="#portal" className="text-darkCharcoal text-base">Stakeholder Portal</a></li>
                        <li><NavLink to="/login" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>Login</NavLink></li>
                        <li><a href="#login" className="text-cyan text-base pl-0 md:pl-8">Call <span className='font-bold'>1800 425 3800 or</span></a></li>
                        <li><a href="#contact" className="text-white text-base font-medium bg-turquoiseBlue rounded-full px-4 py-2">Consult Online</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
