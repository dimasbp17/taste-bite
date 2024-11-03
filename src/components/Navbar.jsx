import React from 'react';
import logo from '../../public/images/logo-taste.png';
import { Button } from '@material-tailwind/react';
import Search from './Search';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="w-full py-2 lg:px-24 font-inter">
        <div className="flex items-center justify-between">
          <img
            src={logo}
            alt="Logo Taste Bite"
            className="w-28"
          />
          <div>
            <ul className="flex items-center gap-8 font-medium">
              <li>Homepage</li>
              <li>Recipe Page</li>
              <li>About</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Search />
            <Link to={'/login'}>
              <Button
                className="capitalize border rounded-none border-oren text-oren"
                variant="outlined"
                size="md"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
