import React from 'react';
import Navbar from '../../components/Navbar';
import about from '../../../public/images/about.jpg';
import blueberry from '../../../public/images/blueberry.jpg';

const About = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="w-full px-4 my-10 lg:px-24">
        <h1 className="text-xl font-bold font-playfair">About</h1>
        <hr className="my-3 border border-gray-300" />
        <div>
          <h1 className="text-4xl font-bold font-playfair">
            We are group of foodies who love cooking and the internet
          </h1>
          <img
            src={about}
            alt=""
            className="lg:h-[400px] w-full object-cover my-2 h-[300px]"
          />
          <div className="grid grid-cols-12 my-20">
            <div className="col-span-6 pr-5">
              <h1 className="mb-3 text-4xl font-bold font-playfair">
                Simple, Easy Recipes for All
              </h1>
              <h3 className="text-justify">
                We are the right place for those of you who love cooking and
                want to explore various recipes from around the world. Our
                mission is to bring you the best recipes that you can easily
                make at home. From mouth-watering appetizers to sweet desserts,
                we have a variety of options for you to try and customize to
                your taste. <br />
                With Taste Bite, cooking becomes more fun and easier! Let's
                start your culinary adventure with us and find new inspiration
                in every recipe we present.
              </h3>
            </div>

            <div className="col-span-6">
              <img
                src={blueberry}
                alt=""
                className="object-cover w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
