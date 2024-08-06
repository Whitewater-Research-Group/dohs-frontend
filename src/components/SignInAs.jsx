import React from 'react';
import { Link } from 'react-router-dom';

const SignInAs = () => {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 p-4 ">
      <h1 className="text-2xl font-semibold text-center mb-6 text-secondary">Welcome back!</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md p-2 border-grey border-2">
        <div className="flex flex-col space-y-4 gap-8 ">
          <p className="text-2xl font-medium text-center text-secondary self-start">Sign in as</p>
          <div className="flex justify-between w-full gap-2">
            <Link to="/health-login" className="bg-yellow text-black py-2 px-4 rounded-md hover:bg-yellow-600" >
              Health Worker
            </Link>
            <Link to="/non-health-login" className="bg-teal text-black py-2 px-4 rounded-md hover:bg-green-600">
              Non-health Worker
            </Link>
          </div>        
        </div>
      </div>
      <div className="text-center mt-6">
          <p>Already have an account? <a href="/sign-in" className="text-secondary hover:underline">Sign In</a></p>
        </div>
    </div>
  );
};

export default SignInAs;
