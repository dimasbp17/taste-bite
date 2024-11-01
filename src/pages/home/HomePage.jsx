import React from 'react';
import Navbar from '../../components/Navbar';
import Chicken from './partials/Chicken';
import Categories from './partials/Categories';
import { Button } from '@material-tailwind/react';

const HomePage = () => {
  return (
    <>
      <div className="">
        <div>
          <Navbar />
        </div>
        <div>
          <Chicken />
        </div>
        <div className="w-full my-10">
          <Categories />
        </div>
        <div className="flex justify-center w-full py-20 bg-pink">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-bold font-playfair">
              Deliciousness to your inbox
            </h1>
            <h3>Enjoy weekly hand picked recipes and recommendations</h3>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Email Address"
              />
              <Button className="rounded-none bg-oren">Join</Button>
            </div>
            <h3>
              By joining our newsletter you aggree to our Term and Conditions
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
