import React from "react";

const Footer =() => {
    return(
        <footer className="w-full bg-gray-100 p-10 flex justify-center">
        <div className="text-left flex flex-col lg:flex-row  ">
         <div>
            <p className="font-bold text-lg "> <span className="text-secondary font-bold">DOHS</span> WWRG</p>
            <p >Health care refers to the efforts that medical professionals make <br /> to restore our physical and mental well-being. The term also <br />includes the provision of services to maintain emotional well-being. <br /> We call people and organizations that provide these services 'health-care providers</p>
 
         </div>   
         <div className="mt-4 flex justify-around w-full flex-grow flex-col lg:flex-row">
            <div>
              <h4 className="font-bold text-secondary">Overview</h4>
              <a className="block mt-2 text-teal-500" href="#">Medicines</a>
              <a className="block mt-2 text-teal-500" href="#">Healthcare Devices</a>
              <a className="block mt-2 text-teal-500" href="#">Health Progress</a>
            </div>
            <div>
              <h4 className="font-bold text-secondary">Company</h4>
              <a className="block mt-2 text-teal-500" href="#">Home</a>
              <a className="block mt-2 text-teal-500" href="#">About us</a>
              <a className="block mt-2 text-teal-500" href="#">Services</a>
            </div>
            <div>
              <h4 className="font-bold text-secondary">Explore</h4>
              <a className="block mt-2 text-teal-500" href="#">Blogs & Feeds</a>
              <a className="block mt-2 text-teal-500" href="#">Privacy Policy</a>
              <a className="block mt-2 text-teal-500" href="#">Cookies</a>
            </div>
            <div>
              <h4 className="font-bold text-secondary">Social Media</h4>
              <a className="block mt-2 text-teal-500" href="#">Facebook</a>
              <a className="block mt-2 text-teal-500" href="#">Twitter</a>
              <a className="block mt-2 text-teal-500" href="#">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;