import React, { useState } from 'react';
import logo from '../../public/images/logo-taste.png';
import { Button } from '@material-tailwind/react';
import Search from './Search';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-4 py-2 bg-white shadow-md lg:shadow-none lg:px-24 font-inter">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <img
            src={logo}
            alt="Logo Taste Bite"
            className="w-20 lg:w-28"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Main Menu for larger screens */}
        <div className={`hidden lg:flex items-center gap-8 font-medium`}>
          <ul className="flex items-center gap-8">
            <NavLink to={'/'}>Homepage</NavLink>
            <li>Recipe Page</li>
            <NavLink to={'/about'}>About</NavLink>
          </ul>
        </div>

        {/* Search and Login button */}
        <div className="items-center hidden gap-2 lg:flex">
          <Search />
          <Link to={'/login'}>
            <Button
              className="w-full capitalize border rounded-none border-oren text-oren"
              variant="outlined"
              size="md"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute left-0 z-10 flex flex-col items-center w-full p-4 space-y-6 bg-white shadow-lg lg:hidden">
          <ul className="flex flex-col items-center gap-6 text-lg font-medium">
            <NavLink to={'/'}>Homepage</NavLink>
            <li>Recipe Page</li>
            <NavLink to={'/about'}>About</NavLink>
          </ul>

          <div className="w-full">
            <Search />
          </div>

          <Link
            to={'/login'}
            className="w-full"
          >
            <Button
              className="w-full capitalize border rounded-none border-oren text-oren"
              variant="outlined"
              size="sm"
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
