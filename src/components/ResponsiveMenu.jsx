"use client";

import { useState, useEffect, useRef } from "react";
import { Drawer, Menu } from "antd";
import { FaBars, FaXmark } from "react-icons/fa6";
import { FaHome, FaShoppingBag, FaAddressBook, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenuRes } from "@/redux/slice/menuRes";
import Link from "next/link";
import { fetchMenu } from "@/redux/slice/menuRes";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const dashboardMenuItems = [
  { id: 'dashboard', title: 'داشبورد', icon: FaHome, path: '/profile/dashboard' },
  { id: 'orders', title: 'سفارشات من', icon: FaShoppingBag, path: '/profile/orders' },
  { id: 'addresses', title: 'آدرس‌های من', icon: FaAddressBook, path: '/profile/addresses' },
  { id: 'legal', title: 'اطلاعات حقوقی', icon: FaBuilding, path: '/profile/legal' },
];

function ResponsiveMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, loading, openMenuRes } = useSelector((state) => state.menuRes);
  const [isSticky, setIsSticky] = useState(false);
  const isRequested = useRef(false);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });
  const menuRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (items.length === 0 && !isRequested.current) {
      isRequested.current = true;
      dispatch(fetchMenu());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (!navbar) return;

      const scrollY = window.scrollY;
      const shouldBeSticky = scrollY > 200;
      
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDrawer = () => {
    dispatch(setOpenMenuRes(true));
  };

  const onClose = () => {
    dispatch(setOpenMenuRes(false));
  };

  const Title = () => (
    <div className="flex justify-end">
      <img className="w-11" src="/images/logo.png" alt="logo" />
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  // Desktop Menu Component
  const DesktopMenu = () => {
    const handleMouseEnter = (e) => {
      const navbar = navbarRef.current;
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const topPosition = isSticky ? navbar.offsetHeight : navbarRect.bottom;
      setDropdownPosition({ top: topPosition });
    };

    return (
      <div
        ref={navbarRef}
        className={`main-navbar bg-[#d1182b] duration-1000 ease-in-out w-full flex text-white ${
          isSticky
            ? "fixed top-0 left-0 z-[9998] translate-y-0 shadow-lg"
            : "relative"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-start w-full whitespace-nowrap overflow-x-auto lg:overflow-visible">
            <div className="flex items-center" ref={menuRef}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`hover:bg-[#0002] duration-300 px-1 relative group hidden lg:flex items-center ${
                    i === items.length - 1 ? "" : "border-l border-[#fff8]"
                  }`}
                  onMouseEnter={item.Children?.length > 0 ? handleMouseEnter : undefined}
                >
                  {item.Children && item.Children.length > 0 ? (
                    <div className="p-3 cursor-pointer font-semibold whitespace-nowrap">
                      {item.title}
                    </div>
                  ) : (
                    <Link href={item.url || item.pageUrl || "#"}>
                      <div className="p-3 cursor-pointer font-semibold whitespace-nowrap">
                        {item.title}
                      </div>
                    </Link>
                  )}
                  {item.Children && item.Children.length > 0 && (
                    <div 
                      className="bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 translate-y-5 group-hover:translate-y-0 p-3 z-[99999]"
                      style={{ 
                        position: 'fixed',
                        top: `${dropdownPosition.top}px`,
                        left: 0,
                        right: 0,
                        width: '100%',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease-in-out'
                      }}
                    >
                      <div className="container mx-auto">
                        <div className="flex flex-wrap text-black">
                          {item.Children.map((child) => (
                            <div key={child.id} className="w-1/2">
                              <div className="p-3">
                                <h3 className="whitespace-nowrap font-semibold text-[#d1182b]">
                                  {child.title}
                                </h3>
                                {child.Children && child.Children.length > 0 && (
                                  <div className="grid grid-cols-3 gap-2 mt-2">
                                    {child.Children.map((subChild) => (
                                      <Link
                                        key={subChild.id}
                                        href={subChild.url || subChild.pageUrl || "#"}
                                      >
                                        <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#d1182b] transition-colors">
                                          <img src="/images/icons/Arrow-Left.png" alt="" className="w-4" />
                                          <span className="whitespace-nowrap text-sm">
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
                        <div className="flex justify-end mt-4">
                          <img src="/images/gallery/best-video-cameras.png" alt="" className="h-24 object-contain" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Menu Component
  const MobileMenu = () => {
    const renderMenuItems = (items) => {
      return items.map((item) => {
        if (item.Children && item.Children.length > 0) {
          return {
            key: item.id,
            label: item.title,
            children: renderMenuItems(item.Children),
          };
        }
        return {
          key: item.id,
          label: (
            <Link href={item.url || item.pageUrl || "#"}>
              {item.title}
            </Link>
          ),
        };
      });
    };

    const handleLogout = async () => {
      try {
        Cookies.remove("user");
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    // ایجاد آیتم‌های داشبورد برای منو
    const dashboardItems = user?.token ? [
      {
        key: 'dashboard-group',
        label: 'داشبورد کاربری',
        children: dashboardMenuItems.map(item => ({
          key: item.id,
          label: (
            <Link href={item.path} onClick={onClose} className="flex items-center gap-3">
              <item.icon className="text-lg" />
              <span>{item.title}</span>
            </Link>
          ),
        }))
      }
    ] : [];

    // ترکیب آیتم‌های داشبورد با منوی اصلی و اضافه کردن دکمه خروج در انتها
    const menuItems = [
      ...dashboardItems,
      ...renderMenuItems(items),
      ...(user?.token ? [{
        key: 'logout',
        label: (
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="flex items-center gap-3 w-full text-red-600 bg-transparent px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <FaSignOutAlt className="text-lg" />
            <span>خروج از حساب</span>
          </button>
        ),
      }] : [])
    ];

    return (
      <>
        <div className="p-3 lg:hidden flex justify-between items-center w-full">
          <div className="flex items-center">
            <FaBars className="text-2xl cursor-pointer" onClick={showDrawer} />
          </div>
        </div>

        <Drawer
          zIndex={1001}
          width={300}
          title={<Title />}
          onClose={onClose}
          styles={{
            direction: "ltr",
            width: "100%",
            body: {
              padding: 0,
            },
          }}
          open={openMenuRes}
          closeIcon={
            <div className="bg-[#d1182b] rounded-full p-1 text-white">
              <FaXmark className="text-xl" />
            </div>
          }
        >
          <div className="text-[#d1182b] mt-3 font-semibold px-3">
            <Link href="/">صفحه نخست</Link>
          </div>

          <Menu
            mode="inline"
            style={{ width: "100%", direction: "rtl", zIndex: "1000" }}
            className="custom-menu"
            items={menuItems}
            defaultOpenKeys={user?.token ? ['dashboard-group'] : []}
          />
        </Drawer>
      </>
    );
  };

  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
}

export default ResponsiveMenu; 