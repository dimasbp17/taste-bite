import { Button, Card } from '@material-tailwind/react';
import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen px-5 bg-gray-100">
        <Card className="p-5 lg:p-10 w-full lg:w-[400px] text-black">
          <h1 className="text-2xl font-bold text-start font-playfair">LOGIN</h1>
          <div className="mt-5 space-y-8">
            <div className="relative inset-0 flex items-center">
              <div className="absolute">
                <FaRegEnvelope className="text-gray-600" />
              </div>
              <input
                type="text"
                className="w-full pl-6 border-b border-gray-300 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div className="relative inset-0 flex items-center">
              <div className="absolute">
                <MdLockOutline className="text-gray-600" />
              </div>
              <input
                type="text"
                className="w-full pl-6 border-b border-gray-300 focus:outline-none"
                placeholder="Password"
              />
            </div>
          </div>
          <h3 className="mt-2 text-xs text-oren text-end">Forgot Password?</h3>
          <Button
            className="w-full my-3 font-normal capitalize bg-oren "
            size="md"
          >
            Login
          </Button>

          <h2 className="text-sm text-center">
            Do not have an account?{' '}
            <Link to={'/register'}>
              <span className="text-oren">Sign Up</span>
            </Link>
          </h2>
        </Card>
      </div>
    </>
  );
};

export default Login;
