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
    // محاسبه ارتفاع و موقعیت header و navbar با تاخیر برای اطمینان از لود شدن دیتاها
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

    // با تاخیر اولیه محاسبه کن
    const initialTimeout = setTimeout(() => {
      calculatePositions();
    }, 300); // 300ms تاخیر برای اطمینان از لود شدن دیتاها

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
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculatePositions);
    };
  }, []);

  // محاسبه مجدد ارتفاع وقتی وضعیت fixed تغییر می‌کند
  useEffect(() => {
    const calculateHeight = () => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setNavbarHeight(rect.height);
      }
    };

    // کمی تاخیر برای اطمینان از رندر شدن کامل
    const timeoutId = setTimeout(calculateHeight, 100);

    return () => clearTimeout(timeoutId);
  }, [navbarFixed]);

  // محاسبه موقعیت navbar ثابت بر اساس وضعیت header
  const getNavbarFixedTop = () => {
    if (!navbarFixed) return "-56px";
    // اگر هر دو فیکس هستند، navbar باید دقیقا زیر header فیکس قرار بگیرد
    if (headerFixed) return `${headerHeight}px`;
    // اگر فقط navbar فیکس است (header فیکس نیست)، باید بالای صفحه باشد
    return "0px";
  };

  return (
    <>
      {/* header ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`
        fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-out
        ${headerFixed ? "translate-y-0" : "-translate-y-full"}
      `}
       
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
            padding: 0, // حذف پدینگ اضافی
          }}
        >
          <Header />
        </div>
      </div>

      {/* navbar ثابت که با اسکرول ظاهر می‌شود */}
      <div
        className={`
        fixed left-0 right-0 z-[9999] transition-all duration-300 ease-out
        ${navbarFixed ? "translate-y-0" : "-translate-y-full"}
      `}
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
            borderRadius: "0 0 16px 16px",
            paddingLeft: 16,
            paddingRight: 16,
            transition: "box-shadow 0.3s",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavBar />
        </div>
      </div>

      {/* header اصلی که همیشه در جای خودش هست */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* navbar اصلی که همیشه در جای خودش هست */}
      <div
        ref={navbarRef}
        style={{
          visibility: navbarFixed ? "hidden" : "visible",
          position: navbarFixed ? "absolute" : "static",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <NavBar />
      </div>
    </>
  );
};

export default HeaderNavbarWrapper;
