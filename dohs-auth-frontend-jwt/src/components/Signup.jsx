import React, { useState, useEffect } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/signup3.png";
import Navbar from "./Navbar";

import axios from "axios";

import Footer from "./Footer";

const SignUp = () => {
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

  const [sentFormData, setSentFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    designation: "",
    license_number: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // Optional state for error handling
  const [success, setSuccess] = useState(null); // Optional state for success message

  // Sync sentFormData with formData whenever formData changes
  useEffect(() => {
    setSentFormData({
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      designation: formData.designation,
      license_number: formData.licenseNumber,
      password: formData.password,
      location: formData.location,
    });
  }, [formData]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", sentFormData);

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        sentFormData
      );

      // Handle the response data
      console.log("Response data:", response.data);

      // Clear the form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        licenseNumber: "",
        password: "",
        confirmPassword: "",
        location: "",
      });

      // Redirect to the login page or display a success message

      if (response.status === 200 || response.status === 201) {
        setSuccess("User registered successfully");
        // Redirect to the login page using window.location
        window.location.href = "/login";
      } else {
        // Handle error response status
        console.error("Registration failed. Status:", response.status);
        setError("Registration failed. Status:", response.status);
      }
    } catch (error) {
      // Handle any errors
      console.error("There was a problem with the Axios operation:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-6xl my- px-4">
          <img
            src={hero2}
            alt="Woman with dog"
            className="w-full md:w-2/3 max-w-full hidden lg:block"
          />
          <form
            className="flex flex-col justify-center p-6 md:p-8 w-full md:w-1/2 lg:w-2/5 text-left"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
              Sign Up
            </h2>
            <div className="flex flex-col mb-4">
              <div className="flex flex-col md:flex-row mb-4">
                <div className="flex flex-col mb-4 md:mr-4 w-full md:w-1/2">
                  <label className="mb-1 text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="p-2 mb-2 border-2 border-secondary rounded w-full"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="mb-1 text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="p-2 mb-2 border-2 border-secondary rounded w-full"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

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
                <label className="mb-1 text-gray-700" htmlFor="designation">
                  Designation
                </label>
                <select
                  id="designation"
                  className="p-2 mb-2 border-2 border-secondary rounded w-full"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="Health Worker">Non Health Worker</option>
                  <option value="Medical Doctor">Health Worker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.designation === "Medical Doctor" && (
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
              )}

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

              <div className="flex flex-col mb-4">
                <label className="mb-1 text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  className="p-2 mb-2 border-2 border-secondary rounded w-full"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="mb-1 text-gray-700" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  className="p-2 mb-2 border-2 border-secondary rounded w-full"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>

              <div className="flex items-center mb-4 mt-4">
                <input className="mr-2" type="checkbox" name="terms" required />
                <label>I’ve read and agreed with Terms and conditions</label>
              </div>
              <button
                className="p-2 bg-accent text-white rounded hover:bg-teal-700 w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div> // Display spinner when loading
                ) : (
                  "Sign up" // Display button text when not loading
                )}
              </button>
              {success && <p className="text-black">{success}</p>}
              {error && <p className="text-black">{error}</p>}
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-teal-500">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;
