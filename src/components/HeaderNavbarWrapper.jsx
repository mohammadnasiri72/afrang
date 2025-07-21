"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const HeaderNavbarWrapper = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const { loading } = useSelector((state) => state.settings);
  const [activeMenu, setActiveMenu] = useState(null);

  // فقط بعد از لود شدن هدر اصلی، ارتفاع را محاسبه کن
  useEffect(() => {
    if (!headerLoaded) return;
    // اندازه‌گیری اولیه
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.getBoundingClientRect().height);
    }
    // اندازه‌گیری مجدد بعد از ۵ ثانیه
    const timeout = setTimeout(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.getBoundingClientRect().height);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    if (!headerLoaded) return;
    // محاسبه موقعیت و وضعیت فیکس فقط بعد از لود هدر اصلی
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
    const initialTimeout = setTimeout(() => {
      calculatePositions();
    }, 300);
    const handleScroll = () => {
      if (headerRef.current && navbarRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();
        if (headerRect.top + headerRect.height < 0) {
          setHeaderFixed(true);
        } else {
          setHeaderFixed(false);
        }
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
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculatePositions);
    };
  }, [headerLoaded]);

  // محاسبه موقعیت navbar ثابت بر اساس وضعیت header و لود شدن هدر اصلی
  const getNavbarFixedTop = () => {
    if (!navbarFixed) return "-56px";
    if (headerFixed && headerLoaded) return `${headerHeight}px`;
    if (headerFixed && !headerLoaded) return "56px"; // ارتفاع اسکلتون
    return "0px";
  };

  return (
    <>
      {/* header ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-out ${
          headerFixed ? "translate-y-0" : "-translate-y-full"
        }`}
        data-header-fixed={headerFixed ? "true" : "false"}
      >
        <div
          style={{
            maxWidth: "2000px",
            margin: "0 auto",
            width: "100%",
            background: "#fff",
            boxShadow: headerFixed ? "0 2px 16px #0002" : "none",
            transition: "box-shadow 0.3s",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Header onLoaded={() => setHeaderLoaded(true)} />
        </div>
      </div>
      {/* navbar ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`fixed left-0 right-0 z-[9999] transition-all duration-300 ease-out ${
          navbarFixed ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          top: getNavbarFixedTop(),
          height: navbarHeight ? `${navbarHeight}px` : "auto",
        }}
        data-navbar-fixed={navbarFixed ? "true" : "false"}
      >
        <div
          style={{
            maxWidth: "2000px",
            margin: "0 auto",
            width: "100%",
            background: "#d1182b",
            boxShadow: navbarFixed ? "0 2px 16px #0002" : "none",
            paddingLeft: 16,
            paddingRight: 16,
            transition: "box-shadow 0.3s",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
      </div>
      {/* header اصلی که همیشه در جای خودش هست */}
      <div ref={headerRef} className="z-[1500] relative">
        <Header onLoaded={() => setHeaderLoaded(true)} />
      </div>
      {/* navbar اصلی که همیشه در جای خودش هست */}
      <div
        className="z-[1500] relative"
        ref={navbarRef}
        style={{
          visibility: navbarFixed ? "hidden" : "visible",
          position: navbarFixed ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
      {activeMenu?.id && (
        <div
          className={`fixed top-0 right-0 left-0 bottom-0 transition-all duration-300 backdrop-blur-sm bg-[#000a]`}
          style={{ zIndex: 1000 }}
        />
      )}
    </>
  );
};

export default HeaderNavbarWrapper;
