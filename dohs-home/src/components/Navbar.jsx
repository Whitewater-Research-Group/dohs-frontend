// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    const navLinkClass = (isActive, baseClasses) =>
        `${baseClasses} ${isActive ? 'text-steelBlue font-semibold' : ''}`;

    return (
        <header className="bg-white shadow font-primary fixed w-full">
            <div className="container mx-40 p-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-darkCharcoal">DOHS</h1>
                <nav>
                    <ul className="ml-20 flex space-x-16">
                        <li><NavLink to="/" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => navLinkClass(isActive, "text-darkCharcoal text-base")}>About</NavLink></li>
                        <li><a href="#surveillance" className="text-darkCharcoal text-base">Surveillance Data</a></li>
                        <li><a href="#portal" className="text-darkCharcoal text-base">Stakeholder Portal</a></li>
                        <li><a href="#login" className="text-darkCharcoal text-base">Login</a></li>
                        <li><a href="#login" className="text-cyan text-base pl-20">Call <span className='font-bold'>1800 425 3800 or</span></a></li>
                        <li><a href="#contact" className="text-white text-base font-medium bg-turquoiseBlue rounded-full px-5 py-3">Consult Online</a></li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}

export default Navbar