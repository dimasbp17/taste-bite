import React from 'react';
import logo from '../../public/images/logo-taste.png';
import { MdOutlineCopyright } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="w-full px-4 lg:py-16 text-abu bg-abu3 lg:px-24">
        <div className="grid grid-cols-12">
          <div className="col-span-full lg:col-span-6">
            <img
              src={logo}
              alt=""
              className="w-32"
            />
            <h3 className="max-w-[400px] text-justify">
              "On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment."
            </h3>
          </div>
          <div className="flex justify-between col-span-full lg:col-span-6">
            <div>
              <h1 className="mb-3 font-medium text-black">Tastebite</h1>
              <Link to={'/about'}>
                <h3>About Us</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Careers</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Contact Us</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Feedback</h3>
              </Link>
            </div>
            <div>
              <h1 className="mb-3 font-medium text-black">Legal</h1>
              <Link to={'/about'}>
                <h3>Term</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Condition</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Contact Us</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Feedback</h3>
              </Link>
            </div>
            <div>
              <h1 className="mb-3 font-medium text-black">Folloow</h1>
              <Link to={'/about'}>
                <h3>Instagram</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Facebook</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Youtube</h3>
              </Link>
              <Link to={'/about'}>
                <h3>Twitter</h3>
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-5 border border-gray-300" />
        <h3 className="flex items-center gap-1">
          <MdOutlineCopyright /> 2024 Tastebite - All rights reserved
        </h3>
      </div>
    </>
  );
};

export default Footer;
