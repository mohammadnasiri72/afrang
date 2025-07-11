"use client";

import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import { Drawer, Menu } from "antd";
import { getUserCookie } from "@/utils/cookieUtils";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaAddressBook,
  FaBuilding,
  FaHome,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
  FaKey,
  FaHeart,
  FaCamera,
  FaExclamationTriangle,
  FaInfoCircle,
  FaComment,
  FaNewspaper,
  FaRecycle,
} from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getImageUrl } from "@/utils/mainDomain";

const dashboardMenuItems = [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: FaHome,
    path: "/profile/dashboard",
  },
  {
    id: "edit-profile",
    title: "ویرایش پروفایل",
    icon: FaUser,
    path: "/profile/edit-profile",
  },
  {
    id: "orders",
    title: "سفارشات من",
    icon: FaShoppingBag,
    path: "/profile/orders",
  },
  {
    id: "favorites",
    title: "علاقه‌مندی‌های من",
    icon: FaHeart,
    path: "/profile/favorites",
  },
  {
    id: "second-hand",
    title: "کالای دسته دوم",
    icon: FaRecycle,
    path: "/profile/second-hand",
  },
  {
    id: "user-comments",
    title: "نظرات ارسالی",
    icon: FaComment,
    path: "/profile/user-comments",
  },
  {
    id: "my-articles",
    title: "ارسال اخبار و مقالات",
    icon: FaNewspaper,
    path: "/profile/my-articles",
  },
  {
    id: "send-image",
    title: "ارسال عکس",
    icon: FaCamera,
    path: "/profile/send-photo",
  },
  {
    id: "report-loss",
    title: "گزارش مفقودی",
    icon: FaExclamationTriangle,
    path: "/profile/missing-report",
  },
  {
    id: "about-me",
    title: "درباره من",
    icon: FaInfoCircle,
    path: "/profile/about-me",
  },
  {
    id: "addresses",
    title: "آدرس‌های من",
    icon: FaAddressBook,
    path: "/profile/addresses",
  },
  {
    id: "legal",
    title: "اطلاعات حقوقی",
    icon: FaBuilding,
    path: "/profile/legal",
  },
  {
    id: "change-password",
    title: "تغییر رمز عبور",
    icon: FaKey,
    path: "/profile/change-password",
  },
];

function ResponsiveMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { items, loading, openMenuRes } = useSelector((state) => state.menuRes);
  const [isSticky, setIsSticky] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [user, setUser] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const isCalculatingRef = useRef(false);

  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    const userData = getUserCookie();
    setUser(userData || {});
  }, []);

  const showDrawer = () => {
    dispatch(setOpenMenuRes(true));
  };

  const onClose = () => {
    dispatch(setOpenMenuRes(false));
  };

  const Title = () => (
    <div className="flex justify-end">
      <Link
        onClick={onClose}
        href={
          settings.find((item) => item.propertyKey === "site_home_url")?.value
        }
      >
        <img
          className="w-14 "
          src={getImageUrl(
            settings.find((item) => item.propertyKey === "site_footer_logo")
              ?.value
          )}
          alt=""
        />
      </Link>
      {/* <img className="w-11" src="/images/logo.png" alt="logo" /> */}
    </div>
  );

  // تابع برای مدیریت کلیک روی لینک‌ها
  const handleNavigation = (url) => {
    // بستن دراور
    dispatch(setOpenMenuRes(false));

    // هدایت به URL مورد نظر
    router.push(url);
  };

  // تابع برای پیدا کردن کلید اکوردئون بر اساس مسیر فعلی
  const getAccordionKeyFromPath = (path) => {
    if (!path) return null;

    const normalizedPath = decodeURIComponent(path);

    // چک کردن مسیرهای داشبورد
    if (path.startsWith("/profile/")) {
      return "dashboard-group";
    }

    // چک کردن همه آیتم‌های منو
    for (const item of items) {
      // اگر آیتم زیرمنو داره
      if (item.Children && item.Children.length > 0) {
        // چک کردن مستقیم URL آیتم
        const itemUrl = item.url || item.pageUrl;
        if (itemUrl && decodeURIComponent(itemUrl) === normalizedPath) {
          return item.id;
        }

        // چک کردن زیرمنوها
        for (const child of item.Children) {
          const childUrl = child.url || child.pageUrl;
          if (childUrl && decodeURIComponent(childUrl) === normalizedPath) {
            return item.id;
          }

          // چک کردن زیرمنوهای سطح دوم
          if (child.Children && child.Children.length > 0) {
            for (const subChild of child.Children) {
              const subChildUrl = subChild.url || subChild.pageUrl;
              if (
                subChildUrl &&
                decodeURIComponent(subChildUrl) === normalizedPath
              ) {
                return item.id;
              }
            }
          }
        }
      }
    }

    return null;
  };

  // تنظیم کلید اکوردئون وقتی مسیر تغییر می‌کنه
  useEffect(() => {
    const currentKey = getAccordionKeyFromPath(pathname);
    if (currentKey) {
      setOpenKeys((prev) => {
        // اگر کلید قبلاً وجود نداشته، اضافه کن
        if (!prev.includes(currentKey)) {
          return [...prev, currentKey];
        }
        return prev;
      });
    }
  }, [pathname, items]);

  // تابع برای چک کردن اینکه آیا مسیر فعلی با مسیر داده شده مطابقت دارد
  const isActivePath = (path) => {
    if (!path) return false;

    // تبدیل URL به حالت نرمال
    const normalizedPathname = decodeURIComponent(pathname);
    const normalizedPath = decodeURIComponent(path);
    return normalizedPathname === normalizedPath;
  };

  // تابع برای چک کردن اینکه آیا آیتم پدر فعال است
  const isParentActive = (items) => {
    if (!items) return false;
    return items.some((item) => {
      if (item.Children) {
        return isParentActive(item.Children);
      }
      const itemUrl = item.url || item.pageUrl;
      if (!itemUrl) return false;

      const normalizedPathname = decodeURIComponent(pathname);
      const normalizedItemUrl = decodeURIComponent(itemUrl);

      return normalizedPathname === normalizedItemUrl;
    });
  };

  const handleMouseEnter = useCallback((e) => {
    if (isCalculatingRef.current) return;
    isCalculatingRef.current = true;

    const navbar = navbarRef.current;
    if (!navbar) return;

    const navbarRect = navbar.getBoundingClientRect();
    const topPosition = isSticky ? navbar.offsetHeight : navbarRect.bottom;
    setDropdownPosition({ top: topPosition });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    isCalculatingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Loading navbar={true} />
      </div>
    );
  }

  // Desktop Menu Component
  const DesktopMenu = () => {
    return (
      <div
        ref={navbarRef}
        className={`main-navbar  duration-1000 ease-in-out w-full flex text-white ${
          isSticky
            ? "fixed top-0 left-0 z-[9998] translate-y-0 shadow-lg"
            : "relative"
        }`}
      >
        <div className="w-full ">
          <div className="flex justify-start w-full overflow-x-auto lg:overflow-visible">
            <div className="flex items-center" ref={menuRef}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`hover:bg-[#0002] duration-300 px-2 relative group hidden lg:flex items-center ${
                    i === items.length - 1 ? "" : "border-l border-[#fff8]"
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.Children && item.Children.length > 0 ? (
                    <div className=" py-2 cursor-pointer font-semibold">
                      {item.title}
                    </div>
                  ) : (
                    <Link href={item.url || item.pageUrl || "#"}>
                      <div className="py-2 cursor-pointer font-semibold">
                        {item.title}
                      </div>
                    </Link>
                  )}
                  {item.Children && item.Children.length > 0 && (
                    <div
                      className="bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 translate-y-5 group-hover:translate-y-0 p-3 z-[999]"
                      style={{
                        position: "fixed",
                        top: `${dropdownPosition.top}px`,
                        left: 0,
                        right: 0,
                        width: "100%",
                        transform: "translateY(0)",
                        transition: "all 0.3s ease-in-out",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <div className="container mx-auto">
                        <div className="flex flex-wrap text-black">
                          {item.Children.map((child) => (
                            <div key={child.id} className="w-1/2">
                              <div className="p-3">
                                {child.Children && child.Children.length > 0 ? (
                                  <Link
                                    href={child.url || child.pageUrl || "#"}
                                  >
                                    <div className=" py-2 rounded-lg mb-3">
                                      <h3 className=" font-bold text-[#130f26]">
                                        {child.title}
                                      </h3>
                                    </div>
                                  </Link>
                                ) : (
                                  <Link
                                    href={child.url || child.pageUrl || "#"}
                                  >
                                    <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#d1182b] transition-colors">
                                      <img
                                        src="/images/icons/Arrow-Left.png"
                                        alt=""
                                        className="w-4"
                                      />
                                      <span className=" text-sm font-semibold">
                                        {child.title}
                                      </span>
                                    </div>
                                  </Link>
                                )}
                                {child.Children &&
                                  child.Children.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                      {child.Children.map((subChild) => (
                                        <Link
                                          key={subChild.id}
                                          href={
                                            subChild.url ||
                                            subChild.pageUrl ||
                                            "#"
                                          }
                                        >
                                          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#d1182b] transition-colors">
                                            <img
                                              src="/images/icons/Arrow-Left.png"
                                              alt=""
                                              className="w-4"
                                            />
                                            <span className=" text-sm font-semibold">
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
                          <img
                            src="/images/gallery/best-video-cameras.png"
                            alt=""
                            className="h-24 object-contain"
                          />
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
          const isActive = isParentActive(item.Children);
          return {
            key: item.id,
            label: (
              <div
                className={`text-right py-2 cursor-pointer ${
                  isActive ? "text-[#d1182b]" : ""
                }`}
              >
                {item.title}
              </div>
            ),
            children: renderMenuItems(item.Children),
          };
        }
        return {
          key: item.id,
          label: (
            <button
              onClick={() => handleNavigation(item.url || item.pageUrl || "#")}
              className={`w-full text-right py-2 transition-colors cursor-pointer ${
                isActivePath(item.url || item.pageUrl)
                  ? "text-[#d1182b]"
                  : "text-gray-800 hover:text-[#d1182b]"
              }`}
            >
              {item.title}
            </button>
          ),
        };
      });
    };

    const handleLogout = async () => {
      try {
        Cookies.remove("user");
        dispatch(setOpenMenuRes(false));
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    // ایجاد آیتم‌های داشبورد برای منو
    const dashboardItems = user?.token
      ? [
          {
            key: "dashboard-group",
            label: (
              <div
                className={`text-right  py-2 cursor-pointer ${
                  dashboardMenuItems.some((item) => isActivePath(item.path))
                    ? "text-[#d1182b]"
                    : ""
                }`}
              >
                داشبورد کاربری
              </div>
            ),
            children: dashboardMenuItems.map((item) => ({
              key: item.id,
              label: (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full py-2 transition-colors cursor-pointer ${
                    isActivePath(item.path)
                      ? "text-[#d1182b]"
                      : "text-gray-800 hover:text-[#d1182b]"
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span>{item.title}</span>
                </button>
              ),
            })),
          },
        ]
      : [];

    // ترکیب آیتم‌های منو
    const menuItems = [
      ...dashboardItems,
      ...renderMenuItems(items),
      ...(user?.token
        ? [
            {
              key: "logout",
              label: (
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full text-red-600 bg-transparent py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>خروج از حساب</span>
                </button>
              ),
            },
          ]
        : []),
    ];

    // پیدا کردن کلید اکوردئون فعلی
    const currentAccordionKey = getAccordionKeyFromPath(pathname);

    return (
      <>
        <div className="p-3 lg:hidden flex justify-between items-center w-full">
          <div className="flex items-center">
            <FaBars className="text-2xl cursor-pointer" onClick={showDrawer} />
          </div>
        </div>

        <Drawer
          zIndex={1001}
          width={350}
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
            <div className="bg-[#d1182b] rounded-full p-1 text-white cursor-pointer">
              <FaXmark className="text-xl" />
            </div>
          }
        >
          <Menu
            mode="inline"
            style={{
              width: "100%",
              direction: "rtl",
              zIndex: "1000",
              backgroundColor: "#fff",
            }}
            className="custom-menu"
            items={menuItems}
            defaultOpenKeys={[]}
          />

          <style jsx global>{`
            .custom-menu .ant-menu-item {
              padding: 10px !important;
            }
               .custom-menu .ant-menu-submenu-title {
              padding: 10px !important;
            }
            .custom-menu .ant-menu-item-selected {
              background-color: #b91626 !important;
              color: white !important;
            }
            .custom-menu .ant-menu-item:hover {
              color: #d1182b !important;
            }
            .custom-menu .ant-menu-submenu-title:hover {
              color: #d1182b !important;
            }
            .custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
              color: #d1182b !important;
            }
            .custom-menu .ant-menu-submenu-open > .ant-menu-submenu-title {
              color: #d1182b !important;
            }
            .custom-menu .ant-menu-submenu-active > .ant-menu-submenu-title {
              color: #d1182b !important;
            }
            .custom-menu .ant-menu-item-active {
              background-color: rgba(209, 24, 43, 0.1) !important;
            }
            .custom-menu .ant-menu-submenu-active > .ant-menu-submenu-title {
              background-color: rgba(209, 24, 43, 0.1) !important;
            }
            .custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
              background-color: #b91626 !important;
              color: white !important;
            }
          `}</style>
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
