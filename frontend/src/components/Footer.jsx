import React from "react";
import { logos } from "../assets/logos/Logo";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col mt-2 sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <img src={logos.logo} alt="" className="w-24" />
          <p className="w-full mt-4 sm:w-2/3 text-gray-600">
            We are a retail and wholesale bag business, specializing in the design and manufacturing of all types of bags including school bags, tiffin bags, travel bags, and grocery bags, tailored for quality and durability.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium text-gray-600 mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium text-gray-600 mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-4">
            <li>+91 7013715093</li>
            <li>contactus@bharatbags.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="text-sm text-center text-gray-400 my-5">Copyright 2025@ bharatbags.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
