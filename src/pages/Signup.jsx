import React, { useState, useEffect } from "react";
import hero from "../assets/register2.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    designation: "",
    license_number: "",
    password: "",
    confirmPassword: "",
    location: "",
    terms: false,
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


  //frontend State Validation
  const [errors, setErrors] = useState({});//Maros' State Validation
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  
  //Backend  State Validation
  const [error, setError] = useState(null); // Daniels State Validation
  const [success, setSuccess] = useState(null); 

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;

  // Validate form data
  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstname) formErrors.firstName = "* First name is required";
    if (!formData.lastname) formErrors.lastName = "* Last name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      formErrors.email = "* Invalid email";
    if (!formData.designation) formErrors.designation = "* Designation is required";
    if (formData.designation === "Medical Doctor" && !formData.license_number)
      formErrors.licenseNumber = "* License number is required for Medical Doctors";
    if (!formData.password || !passwordRegex.test(formData.password))
      formErrors.password =
        "* Password must be at least 8 characters long, contain numbers, symbols, and uppercase letters";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "* Passwords do not match";
    if (!formData.location) formErrors.location = "* Location is required";
    if (!formData.terms) formErrors.terms = "* You must agree to the terms and conditions";

    return formErrors;
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const formErrors = validateForm();
    setErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [formData]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle form submission here, e.g., sending data to the backend
      console.log("Form data:", sentFormData);
    } else{
      setErrors("Form not valid")
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData
      );

      // Handle the response data
      console.log("Response data:", response.data);

      // Clear the form fields
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        designation: "",
        license_number: "",
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
      console.error("There was a problem with the Axios operation:", error.response.data.msg);
      setError(error.response.data.msg)
      
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center mt-32">
        <div className="flex w-full max-w-6xl my-10 px-4">
          <img
            src={hero}
            alt="Woman with dog"
            className="w-full md:w-1/2 max-w-full hidden lg:block"
          />
          <form
            className="flex flex-col justify-between p-6 md:p-8 w-full md:w-full lg:w-1/2 text-left"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-between mb-4 h-full">
              <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
                Sign Up
              </h2>
              <div className="flex flex-col md:flex-row mb-4">
                <div className="relative flex-col mb-4 md:mr-4 w-full md:w-1/2">
                  <label
                    className="text-gray-700 text-xs absolute -top-3 left-3  bg-white p-1"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    id="firstname"
                    className="p-2 mb-1 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="flex-col w-full md:w-1/2 relative">
                  <label
                    className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="flex-col mb-4 relative">
                <label
                  className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="flex-col mb-4 relative">
                <label
                  className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                  htmlFor="designation"
                >
                  Designation
                </label>
                <select
                  id="designation"
                  className="p-3 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="Health Worker">Health Worker</option>
                  <option value="Medical Doctor">Medical Doctor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.designation === "Medical Doctor" && (
                <div className="flex-col mb-4 relative">
                  <label
                    className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                    htmlFor="licenseNumber"
                  >
                    License Number
                  </label>
                  <input
                    id="license_number"
                    className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                    type="text"
                    name="licenseNumber"
                    value={formData.license_number}
                    onChange={handleChange}
                    placeholder="License Number"
                  />
                </div>
              )}

              <div className="flex-col mb-4 relative">
                <label
                  className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex-col mb-4 relative">
                <label
                  className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-secondary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex-col mb-4 relative">
                <label
                  className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  className="p-2 mb-2 border-2 border-secondary rounded-lg w-full text-secondary hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>

              <div className="flex items-center self-center mb-4 mt-4">
                <input
                  className="mr-2 bg-black"
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <label>I’ve read and agreed with Terms and conditions</label>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="bg-red mb-4 text-xs p-3 rounded-sm text-wine">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              <button
                className={`p-2 rounded-lg text-white w-full ${
                  isFormValid ? "bg-secondary hover:bg-green" : "bg-grey"
                }`}
                type="submit"
                disabled={!isFormValid}
              >
                Sign up
              </button>
              {success && <p className="text-black">{success}</p>}
              {error && <p className="text-black text-center">{error}</p>}
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-secondary">
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
