import React, { useState } from "react";
import hero from "../assets/register.jpg";
import hero2 from "../assets/login2.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
   
  
    license_number: "",
    password: "",
   
  });

  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {


      const loginEndpoint = "http://localhost:3001/api/auth/login/health-worker";

      
      const response = await axios.post(loginEndpoint, formData);

      if (response.status >= 200 && response.status < 300 && response.data.token) {
          localStorage.setItem('authToken', response.data.token);


          setFormData({
              license_number: "",
              password: "",
          });

          setSuccess("User logged in successfully");

          window.location.href = "/health-dashboard";
      } else {
          console.error("Unexpected response format:", response.data);
          setError("No token received from the server.");
      }


    } catch (error) {

      console.error("Login request failed:", error);
        setError("Invalid License Number or Password");
      
    }
   
  };

  return (
    <>
    <Navbar/>
     

    <div className="flex flex-col items-center  justify-around">
      <div className="flex w-full max-w-6xl mt-32 mb-10 px-4 ">
        <div className="hidden lg:block">
        <img
          src={hero2}
          alt="Woman with dog"
          className="w-full md:w-full max-w-full hidden lg:block"
        />
        </div>
        <form
          className="flex flex-col justify-center p-6 md:p-8 w-full md:w-1/2 lg:w-1/2 text-left gap-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
            Sign In
          </h2>
          <div className="flex flex-col mb-4 h-full gap-4">
            

            <div className="flex flex-col mb-4 relative">
            <label className=" text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1 rounded" htmlFor="license_number">
                  License Number
                </label>
                <input
                  id="license_number"
                  className="p-2 mb-2 border-2 border-secondary rounded-lg w-full hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none text-secondary"
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleChange}
                  placeholder="License Number"
                  required
                />
            </div>

     

          

            <div className="flex flex-col mb-4 relative">
              <label className="text-gray-700 text-xs absolute -top-3 left-3 bg-white p-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="p-2 mb-2 border-2 border-secondary rounded-lg w-full hover:border-green focus:border-green active:border-green focus:outline-none active:outline-none text-secondary"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>


            <div className="flex items-center mb-4 mt-4">
              
              <a className="mr-2" href="/reset"><p>Forgot Password?</p></a>
            </div>

            {Error && <p className="text-danger text-center">{Error}</p>}
              {success && (
                <p className="text-secondary text-center">{success}</p>
              )}
            <button
              className="p-2 bg-secondary text-white rounded-md hover:bg-green w-full"
              type="submit"
            >
              Sign in
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-green">
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
