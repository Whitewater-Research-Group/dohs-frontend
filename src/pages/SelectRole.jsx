import React, { useState } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/select1.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignInAs from "../components/SignInAs";


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
     

    <div className="">
      <div className="flex items-center justify-around h-full w-full max-w-6xl my-10 px-4 border-grey">
        <div className="  w-1/2 h-full">
        <img
          src={hero2}
          alt="Woman with dog"
          className="w-full md:w-full max-w-full hidden lg:block"
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
