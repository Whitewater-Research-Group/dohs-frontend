import React, { useState } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/select1.png";
import Navbar from "./Navbar";
import SignInAs from "./sub/SignInAs";

import Footer from "./Footer";

const SelectRole = () => {
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
        <SignInAs/>
        </div>
      </div>






    <Footer />
      
    </>
  );
};

export default SelectRole;
