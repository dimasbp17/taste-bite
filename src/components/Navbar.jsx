import React from 'react';
import logo from '../../public/images/logo-taste.png';
import { Button } from '@material-tailwind/react';
import Search from './Search';

const Navbar = () => {
  return (
    <>
      <div className="w-full py-2 border-b lg:px-24 font-inter">
        <div className="flex items-center justify-between">
          <img
            src={logo}
            alt="Logo Taste Bite"
            className="w-28"
          />
          <div>
            <ul className="flex items-center gap-10 font-medium">
              <li>Homepage</li>
              <li>Recipe Page</li>
              {/* <li>HomePage</li> */}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Search />
            <Button
              className="capitalize border rounded-none border-oren text-oren"
              variant="outlined"
              size="md"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
