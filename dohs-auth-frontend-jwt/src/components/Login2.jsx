import React, { useState } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/login1.png";
import Navbar from "./Navbar";

import axios from "axios";

import Footer from "./Footer";

const NonHealthLogin = () => {
  const [formData, setFormData] = useState({
    
    email: "",
    
    password: "",
   
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form data:", FormData);

    // Check if the response contains a token
  if (response.data.token) {
    // Store the token in localStorage or a state management library
    localStorage.setItem('authToken', response.data.token);

    // Clear the form fields
    setFormData({
      email: "",
      password: "",
    });

    // Redirect to the dashboard
    if (response.status === 200 || response.status === 201) {
      setSuccess("User Logged in successfully");
      window.location.href = "/non-health-dashboard";
    } else {
      console.error("LOGIN FAILED", response.status);
      setError("LOGIN FAILED", response.status);
    }
  } else {
    console.error("No token received");
    setError("No token received");
  }
  };

  return (
    <>
    <Navbar />
     

    <div className="flex flex-col items-center mt-5">
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
              <label className="mb-1 text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="p-2 mb-2 border-2 border-secondary rounded w-full"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
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


            <div className="flex items-center mb-4 mt-2">
              <input className="mr-2" type="checkbox" name="terms" required />
              <label>Forgot Password? </label>
            </div>
            <button
              className="p-2 bg-secondary text-white rounded hover:bg-teal-700 w-full"
              type="submit"
            >
              Sign in
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

export default NonHealthLogin;
