import React from 'react';
import Navbar from '../../components/Navbar';
import Chicken from './partials/Chicken';

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
      </div>
    </>
  );
};

export default HomePage;
