"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";

const NavBar = () => {
  return (
    <>
      <div className="bg-[#d1182b] lg:px-16 px-2 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 w-full lg:hidden">
          <input
            className="outline-none px-3 py-1 bg-white/10 rounded-lg placeholder-white/70 text-sm sm:w-96 lg:hidden"
            type="text"
            placeholder="جستجو..."
          />
          <IoSearch className="text-xl cursor-pointer hover:text-white/80 transition-colors" />
        </div>
        <div className="flex-1">
          <ResponsiveMenu />
        </div>
      </div>
    </>
  );
};

export default NavBar;
