"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // محاسبه ارتفاع و موقعیت navbar
    const calculateNavbarPosition = () => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setNavbarHeight(rect.height);
      }
    };

    // اولین بار محاسبه کن
    calculateNavbarPosition();

    const handleScroll = () => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        // وقتی navbar کاملاً از دید خارج شد
        if (rect.top + rect.height < 0) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateNavbarPosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateNavbarPosition);
    };
  }, []);

  return (
    <>
    <div>
      {/* navbar ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`
          bg-[#d1182b] lg:px-16 px-2 flex items-center justify-between text-white
          transition-transform duration-300 ease-out z-[60]
          ${isFixed 
            ? 'fixed top-0 left-0 right-0 z-50 shadow-lg translate-y-0' 
            : 'fixed -top-14 left-0 right-0 z-50 -translate-y-full'
          }
        `}
        style={{ height: navbarHeight ? `${navbarHeight}px` : 'auto' }}
      >
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

      {/* navbar اصلی که همیشه در جای خودش هست */}
      <div 
        ref={navbarRef}
        className="bg-[#d1182b] lg:px-16 px-2 flex items-center justify-between text-white"
      >
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

    </div>
    </>
  );
};

export default NavBar;
