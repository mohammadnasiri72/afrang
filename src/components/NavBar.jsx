"use client";

import { useEffect, useRef, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import SearchNavbar from "./SearchNavbar";
import { getImageUrl } from "@/utils/mainDomain";
import { useSelector } from "react-redux";
import Link from "next/link";

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { settings } = useSelector((state) => state.settings);
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
          bg-[#d1182b] px-2 flex items-center justify-between text-white
          transition-transform duration-300 ease-out z-[600]
          ${isFixed
              ? 'fixed top-0 left-0 right-0 z-50 shadow-lg translate-y-0'
              : 'fixed -top-14 left-0 right-0 z-50 -translate-y-full'
            }
        `}
          style={{ height: navbarHeight ? `${navbarHeight}px` : 'auto' }}
        >


          <div className="px-3">
          {settings?.find((item) => item.propertyKey === "site_home_url") ? (
            <Link
              href={
                settings.find((item) => item.propertyKey === "site_home_url")
                  ?.value
              }
            >
              <img
                className="lg:hidden w-10 "
                src={
                  getImageUrl(
                    settings.find((item) => item.propertyKey === "site_footer_logo")
                      ?.value
                  )
                }
                alt=""
              />
            </Link>
          ) : (
            <img className="lg:hidden w-10" src="/images/logo.png" alt="" />
          )}
          </div>


          <SearchNavbar />
          
          <div className="flex-1">
            <ResponsiveMenu />
          </div>
        </div>

        {/* navbar اصلی که همیشه در جای خودش هست */}
        <div
          ref={navbarRef}
          className="bg-[#d1182b]  px-2 flex items-center justify-between text-white"
        >

          <SearchNavbar />
          <div className="flex-1">
            <ResponsiveMenu />
          </div>
        </div>

      </div>
    </>
  );
};

export default NavBar;
