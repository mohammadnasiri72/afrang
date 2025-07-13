"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

const HeaderNavbarWrapper = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // محاسبه ارتفاع و موقعیت header و navbar
    const calculatePositions = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(rect.height);
      }
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setNavbarHeight(rect.height);
      }
    };

    // اولین بار محاسبه کن
    calculatePositions();

    const handleScroll = () => {
      if (headerRef.current && navbarRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();
        
        // وقتی header کاملاً از دید خارج شد
        if (headerRect.top + headerRect.height < 0) {
          setHeaderFixed(true);
        } else {
          setHeaderFixed(false);
        }

        // وقتی navbar کاملاً از دید خارج شد
        if (navbarRect.top + navbarRect.height < 0) {
          setNavbarFixed(true);
        } else {
          setNavbarFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculatePositions);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculatePositions);
    };
  }, []);

  // محاسبه موقعیت navbar ثابت بر اساس وضعیت header
  const getNavbarFixedTop = () => {
    if (!navbarFixed) return '-56px';
    if (headerFixed) return `${headerHeight}px`;
    return '0px';
  };

  return (
    <>
      {/* header ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`
        bg-white transition-all duration-300 ease-out z-[700]
        ${headerFixed
            ? 'fixed top-0 left-0 right-0 z-50 shadow-lg translate-y-0'
            : 'fixed -top-14 left-0 right-0 z-50 -translate-y-full'
          }
      `}
        style={{ height: headerHeight ? `${headerHeight}px` : 'auto' }}
        data-header-fixed={headerFixed ? "true" : "false"}
      >
        <Header />
      </div>

      {/* navbar ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`
        bg-[#d1182b] transition-all duration-300 ease-out z-[600]
        ${navbarFixed
            ? 'fixed left-0 right-0 z-50 shadow-lg translate-y-0'
            : 'fixed -top-14 left-0 right-0 z-50 -translate-y-full'
          }
      `}
        style={{ 
          height: navbarHeight ? `${navbarHeight}px` : 'auto',
          top: getNavbarFixedTop()
        }}
        data-navbar-fixed={navbarFixed ? "true" : "false"}
      >
        <NavBar />
      </div>

      {/* header اصلی که همیشه در جای خودش هست */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* navbar اصلی که همیشه در جای خودش هست */}
      <div ref={navbarRef}>
        <NavBar />
      </div>
    </>
  );
};

export default HeaderNavbarWrapper; 