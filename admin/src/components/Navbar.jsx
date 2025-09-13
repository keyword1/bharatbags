import React from "react";
import { logos } from "../assets/Assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center py-4 px-[4%]">
      <img src={logos.logo} alt="" className="w-[max(5%,100px)]" />
      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-gray-600 text-white px-4 py-2 text-xs sm:text-sm rounded-xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
