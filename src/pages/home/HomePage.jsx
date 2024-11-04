import React from 'react';
import Navbar from '../../components/Navbar';
import Chicken from './partials/Chicken';
import Categories from './partials/Categories';
import { Button } from '@material-tailwind/react';
import Jumbotron from './partials/Jumbotron';
import AllMeals from './partials/AllMeal';
import AreaCategories from './partials/AreaCategories';

const HomePage = () => {
  return (
    <>
      <div className="">
        <div>
          <Navbar />
        </div>
        <div>
          <Jumbotron />
        </div>
        <div className="w-full my-10">
          <Categories />
        </div>
        <div>
          <AreaCategories />
        </div>
        <div>
          <Chicken />
        </div>

        <div className="flex justify-center w-full px-4 py-20 bg-pink">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-bold font-playfair">
              Deliciousness to your inbox
            </h1>
            <h3>Enjoy weekly hand picked recipes and recommendations</h3>
            <div className="flex flex-col items-center gap-2 lg:gap-0 lg:flex-row">
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Email Address"
              />
              <Button className="w-full rounded-none bg-oren lg:max-w-20">
                Join
              </Button>
            </div>
            <h3>
              By joining our newsletter you aggree to our Term and Conditions
            </h3>
          </div>
        </div>
        <div>
          <AllMeals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
