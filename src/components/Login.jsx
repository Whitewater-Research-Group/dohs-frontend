import React, { useState } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/login2.png";
import Navbar from "./Navbar";

import Footer from "./Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., sending data to the backend
    console.log("Form data:", formData);
  };

  return (
    <>
    <Navbar />
     

    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-6xl my-10 px-4 ">
        <div className="hidden lg:block">
        <img
          src={hero2}
          alt="Woman with dog"
          className="w-full md:w-2/3 max-w-full"
        />
        </div>
        <form
          className="flex flex-col justify-center p-6 md:p-8 w-full md:w-1/2 lg:w-2/5 text-left"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
            Sign In
          </h2>
          <div className="flex flex-col mb-4">
            

            <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-700" htmlFor="licenseNumber">
                  License Number
                </label>
                <input
                  id="licenseNumber"
                  className="p-2 mb-2 border-2 border-secondary rounded w-full"
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="License Number"
                />
            </div>

     

          

            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="p-2 mb-2 border-2 border-secondary rounded w-full"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>


            <div className="flex items-center mb-4 mt-4">
              <input className="mr-2" type="checkbox" name="terms" required />
              <label>Forgot Password? </label>
            </div>
            <button
              className="p-2 bg-secondary text-white rounded hover:bg-teal-700 w-full"
              type="submit"
            >
              Sign up
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-teal-500">
                Sign up
              </a>
            </p></div>
          </form>
        </div>
      </div>






    <Footer />
      
    </>
  );
};

export default Login;
