import React from "react";
import { logos } from "../assets/Assets";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className="flex items-center gap-2 border border-[2px] px-3 py-2 rounded-l"
        >
          <img src={logos.add} alt="" className="w-5 h-5" />
          <p className=" hidden md:block">Add Item</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-2 border border-[2px] px-3 py-2 rounded-l"
        >
          <img src={logos.list} alt="" className="w-5 h-5" />
          <p className=" hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-2 border border-[2px] px-3 py-2 rounded-l"
        >
          <img src={logos.list} alt="" className="w-5 h-5" />
          <p className=" hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          to="/history"
          className="flex items-center gap-2 border border-[2px] px-3 py-2 rounded-l"
        >
          <img src={logos.list} alt="" className="w-5 h-5" />
          <p className=" hidden md:block">History</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
