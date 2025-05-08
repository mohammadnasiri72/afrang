"use client";

import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import DrawerMenuResponsive from "./DrawerMenuResponsive";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "@/redux/slice/menuRes";
import Loading from "./Loading";

const NavBar = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.menuRes);
  const [isSticky, setIsSticky] = useState(false);
  const isRequested = useRef(false);

  useEffect(() => {
    if (items.length === 0 && !isRequested.current) {
      isRequested.current = true;
      dispatch(fetchMenu());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{ zIndex: "60" }}
        className={`bg-[#d1182b] duration-1000 ease-in-out w-full lg:px-16 px-2 flex text-white ${
          isSticky
            ? "fixed top-0 left-0 z-50 translate-y-0 shadow-lg animation-Navbar"
            : "relative"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`hover:bg-[#0002] duration-300 px-1 relative group hidden lg:block ${
              i === 0 ? "" : "border-r border-[#fff8]"
            }`}
          >
            {item.Children && item.Children.length > 0 ? (
              <div className="p-3 cursor-pointer font-semibold">
                {item.title}
              </div>
            ) : (
              <Link href={item.url || item.pageUrl || "#"}>
                <div className="p-3 cursor-pointer font-semibold">
                  {item.title}
                </div>
              </Link>
            )}
            {item.Children && item.Children.length > 0 && (
              <div className="absolute to-100% bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 translate-y-5 group-hover:translate-y-0 p-3 w-[1000px] z-50">
                <div className="flex flex-wrap text-black">
                  {item.Children.map((child, index) => (
                    <div key={child.id} className="w-1/2">
                      <div className="p-3">
                        <h3 className="whitespace-nowrap font-semibold">
                          {child.title}
                        </h3>
                        {child.Children && child.Children.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {child.Children.map((subChild) => (
                              <Link
                                key={subChild.id}
                                href={subChild.url || subChild.pageUrl || "#"}
                              >
                                <div className="flex items-center gap-3 py-3 cursor-pointer">
                                  <img
                                    src="/images/icons/Arrow-Left.png"
                                    alt=""
                                  />
                                  <span className="whitespace-nowrap">
                                    {subChild.title}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <img src="/images/gallery/best-video-cameras.png" alt="" />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="p-3 lg:hidden flex justify-between items-center w-full">
          <div className="flex items-center">
            <IoSearch className="text-2xl cursor-pointer" />
            <input
              className="outline-none px-2"
              type="text"
              placeholder="جستجو..."
            />
          </div>
          <DrawerMenuResponsive />
        </div>
      </div>
    </>
  );
};

export default NavBar;
