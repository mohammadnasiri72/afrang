"use client";

import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import { Fade, Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Drawer, Menu } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaAddressBook,
  FaBuilding,
  FaCamera,
  FaComment,
  FaExclamationTriangle,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaKey,
  FaNewspaper,
  FaRecycle,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SubmenuDropdown from "./SubmenuDropdown";

import { keyframes } from "@emotion/react";

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

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "0px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  width: "auto",
  maxWidth: "calc(100vw - 200px)",
  overflow: "hidden",
  marginTop: "0px",
  paddingTop: "0px",
  fontFamily: "inherit",
  position: "fixed",
  left: "100px",
  right: "100px",
  maxHeight: "70vh",
  // overflowY: "auto",
  direction: "rtl",
  zIndex: 1200,
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#d1182b",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#b91626",
  },
}));

const slideDown = keyframes`
   0% { 
    height: 0;
    opacity: 0;
  }
  100% { 
    height: 70vh;
    opacity: 1;
  }
`;

const AnimatedPaper = styled(StyledPaper)`
  animation: ${slideDown} 0.3s ease-in-out;
`;

// تابع کمکی برای مدیریت اسکرول بدن
const disableBodyScroll = () => {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

const enableBodyScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

function ResponsiveMenu({
  activeMenu,
  setActiveMenu,
  initialItems,
  startTransition,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { items: itemsFromRedux, openMenuRes } = useSelector(
    (state) => state.menuRes
  );
  const items =
    initialItems && initialItems.length ? initialItems : itemsFromRedux;
  const [openKeys, setOpenKeys] = useState([]);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const [expandedChildren, setExpandedChildren] = useState(new Set());
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);

  const firstNavItemRef = useRef(null);
  const lastNavItemRef = useRef(null);
  const [dropdownOffsets, setDropdownOffsets] = useState({
    right: 50,
    left: 50,
  });

  // تابع برای محاسبه dropdownOffsets بر اساس عرض صفحه
  const calculateDropdownOffsets = useCallback(() => {
    const windowWidth = window.innerWidth;
    const maxWidth = 1600; // حداکثر عرض
    const baseOffset = 50; // offset پایه

    if (windowWidth > maxWidth) {
      // اگر صفحه از 1600px بیشتر است، offsetها را طوری محاسبه کن که 50px کمتر از 1600px باشد
      const extraWidth = windowWidth - maxWidth;
      const calculatedOffset = baseOffset + Math.floor(extraWidth / 2);

      setDropdownOffsets({
        right: calculatedOffset,
        left: calculatedOffset,
      });
    } else {
      // برای صفحات کوچکتر از 1600px از مقادیر پیش‌فرض استفاده کن
      setDropdownOffsets({
        right: baseOffset,
        left: baseOffset,
      });
    }
  }, []);

  useEffect(() => {
    // محاسبه اولیه
    calculateDropdownOffsets();

    // گوش دادن به تغییرات سایز صفحه
    const handleResize = () => {
      calculateDropdownOffsets();
    };

    window.addEventListener("resize", handleResize);

    // تمیز کردن event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateDropdownOffsets]);

  const { settings } = useSelector((state) => state.settings);

  const open = Boolean(anchorEl);

  // مدیریت اسکرول صفحه وقتی زیرمنو باز است
  useEffect(() => {
    if (
      open &&
      activeMenu &&
      activeMenu.Children &&
      activeMenu.Children.length > 0
    ) {
      disableBodyScroll();

      const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
          handleMenuClose();
        }
      };

      const handleClickOutside = (event) => {
        const navbar = navbarRef.current;
        const dropdown = document.querySelector("[data-popper-placement]");

        if (
          navbar &&
          !navbar.contains(event.target) &&
          dropdown &&
          !dropdown.contains(event.target)
        ) {
          handleMenuClose();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        enableBodyScroll();
        document.removeEventListener("keydown", handleEscapeKey);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      enableBodyScroll();
    }
  }, [open, activeMenu]);

  const updateHeaderNavbarHeights = useCallback(() => {
    setTimeout(() => {
      const headerFixed = document.querySelector("[data-header-fixed]");
      const navbarFixed = document.querySelector("[data-navbar-fixed]");
      const header =
        document.querySelector("div[ref-header]") ||
        document.querySelector("header");
      const navbar = navbarRef.current;

      if (
        headerFixed &&
        headerFixed.getAttribute("data-header-fixed") === "true"
      ) {
        setHeaderHeight(headerFixed.offsetHeight || 0);
      } else if (header) {
        setHeaderHeight(header.offsetHeight || 0);
      }

      if (
        navbarFixed &&
        navbarFixed.getAttribute("data-navbar-fixed") === "true"
      ) {
        setNavbarHeight(navbarFixed.offsetHeight || 0);
      } else if (navbar) {
        setNavbarHeight(navbar.offsetHeight || 0);
      }
    }, 60);
  }, []);

  useEffect(() => {
    updateHeaderNavbarHeights();
    window.addEventListener("resize", updateHeaderNavbarHeights);
    return () => {
      window.removeEventListener("resize", updateHeaderNavbarHeights);
    };
  }, [updateHeaderNavbarHeights]);

  useEffect(() => {
    const userData = getUserCookie();
    setUser(userData || {});
  }, []);

  const showDrawer = () => {
    dispatch(setOpenMenuRes(true));
  };

  const Title = () => (
    <div className="flex justify-end">
      <Link className="font-bold!"
        onClick={(ev) => {
          ev.preventDefault();
          startTransition(() => {
            router.push(
              settings?.find((item) => item.propertyKey === "site_home_url")
                ?.value
            );
          });
          onClose();
        }}
        href={
          settings?.find((item) => item.propertyKey === "site_home_url")?.value
        }
      >
        <img
          className="w-14 "
          src={getImageUrl(
            settings?.find((item) => item.propertyKey === "site_footer_logo")
              ?.value
          )}
          alt=""
        />
      </Link>
    </div>
  );

  const onClose = () => {
    dispatch(setOpenMenuRes(false));
    setAnchorEl(null);
    setActiveMenu(null);
    enableBodyScroll();
  };

  const getAccordionKeyFromPath = (path) => {
    if (!path) return null;

    const normalizedPath = decodeURIComponent(path);

    if (path.startsWith("/profile/")) {
      return "dashboard-group";
    }

    for (const item of items) {
      if (item.Children && item.Children.length > 0) {
        const itemUrl = item.url || item.pageUrl;
        if (itemUrl && decodeURIComponent(itemUrl) === normalizedPath) {
          return item.id;
        }

        for (const child of item.Children) {
          const childUrl = child.url || child.pageUrl;
          if (childUrl && decodeURIComponent(childUrl) === normalizedPath) {
            return item.id;
          }

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

  useEffect(() => {
    const currentKey = getAccordionKeyFromPath(pathname);
    if (currentKey) {
      setOpenKeys((prev) => {
        if (!prev.includes(currentKey)) {
          return [...prev, currentKey];
        }
        return prev;
      });
    }
  }, [pathname, items]);

  const isActivePath = (path) => {
    if (!path) return false;
    const normalizedPathname = decodeURIComponent(pathname);
    const normalizedPath = decodeURIComponent(path);
    return normalizedPathname === normalizedPath;
  };

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

  const handleMenuOpen = (event, menuItem) => {
    if (!menuItem.Children || menuItem.Children.length === 0) {
      return;
    }

    if (activeMenu && activeMenu.id === menuItem.id && open) {
      return;
    }

    let navbar = navbarRef.current;
    if (navbar && window.getComputedStyle(navbar).visibility === "hidden") {
      const navbars = document.querySelectorAll(".main-navbar");
      navbar = Array.from(navbars)?.find(
        (el) => window.getComputedStyle(el).visibility !== "hidden"
      );
    }

    const headerFixed = document.querySelector('[data-header-fixed="true"]');
    const navbarFixed = document.querySelector('[data-navbar-fixed="true"]');

    let topPosition = 0;
    if (navbarFixed) {
      const headerH = headerFixed ? headerFixed.offsetHeight : headerHeight;
      const navbarH = navbarFixed.offsetHeight || navbarHeight;
      topPosition = headerH + navbarH;
    } else if (navbar) {
      const navbarRect = navbar.getBoundingClientRect();
      topPosition = navbarRect.bottom - window.scrollY;
    }

    setDropdownTop(topPosition);

    const createAnchorElement = () => ({
      getBoundingClientRect: () => ({
        top: topPosition,
        bottom: topPosition,
        left: 0,
        right: window.innerWidth,
        width: window.innerWidth,
        height: 0,
        x: 0,
        y: topPosition,
      }),
    });
    setAnchorEl(createAnchorElement());
    setActiveMenu(menuItem);
  };

  const handleMenuClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    dropdownTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setActiveMenu(null);
      setExpandedChildren(new Set());
      enableBodyScroll();
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    handleMenuClose();
  };

  useEffect(() => {
    let timeoutId;
    const handleScrollAndResize = () => {
      if (open && anchorEl && activeMenu) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          let navbar = navbarRef.current;
          if (
            navbar &&
            window.getComputedStyle(navbar).visibility === "hidden"
          ) {
            const navbars = document.querySelectorAll(".main-navbar");
            navbar = Array.from(navbars)?.find(
              (el) => window.getComputedStyle(el).visibility !== "hidden"
            );
          }

          const headerFixed = document.querySelector(
            '[data-header-fixed="true"]'
          );
          const navbarFixed = document.querySelector(
            '[data-navbar-fixed="true"]'
          );

          let topPosition = 0;
          if (navbarFixed) {
            const headerH = headerFixed
              ? headerFixed.offsetHeight
              : headerHeight;
            const navbarH = navbarFixed.offsetHeight || navbarHeight;
            topPosition = headerH + navbarH;
          } else if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            topPosition = navbarRect.bottom - window.scrollY;
          }

          setDropdownTop(topPosition);
          const updatedAnchorEl = {
            getBoundingClientRect: () => ({
              top: topPosition,
              bottom: topPosition,
              left: 0,
              right: window.innerWidth,
              width: window.innerWidth,
              height: 0,
              x: 0,
              y: topPosition,
            }),
          };
          setAnchorEl(updatedAnchorEl);
        }, 16);
      }
    };

    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      clearTimeout(timeoutId);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [open, anchorEl, activeMenu, headerHeight, navbarHeight]);

  // Desktop Menu Component
  const DesktopMenu = () => {
    return (
      <div
        ref={navbarRef}
        className="main-navbar duration-1000 ease-in-out w-full flex !text-white relative z-[1200]"
      >
        <div className="w-full">
          <div className="flex justify-center w-full overflow-x-auto lg:overflow-visible">
            <div className="flex items-center" ref={menuRef}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  ref={
                    i === 0
                      ? firstNavItemRef
                      : i === items.length - 1
                      ? lastNavItemRef
                      : null
                  }
                  className={`hover:bg-[#0002] duration-300 px-2 relative group hidden lg:flex items-center ${
                    i === items.length - 1 ? "" : "border-l border-[#fff8]"
                  }`}
                  style={{
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    background:
                      activeMenu && activeMenu.id === item.id
                        ? "#fff"
                        : undefined,
                    color:
                      activeMenu && activeMenu.id === item.id
                        ? "#d1182b"
                        : undefined,
                    zIndex:
                      activeMenu && activeMenu.id === item.id
                        ? 1200
                        : undefined,
                    cursor: item.url || item.pageUrl ? "pointer" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (item.Children && item.Children.length > 0) {
                      if (window.__navbarHoverTimer)
                        clearTimeout(window.__navbarHoverTimer);
                      window.__navbarHoverTimer = setTimeout(() => {
                        handleMenuOpen(e, item);
                      }, 100);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.Children && item.Children.length > 0) {
                      if (window.__navbarHoverTimer)
                        clearTimeout(window.__navbarHoverTimer);
                      handleMenuClose();
                    }
                  }}
                  onClick={() => {
                    if (item.url || item.pageUrl) {
                      enableBodyScroll();
                    }
                  }}
                >
                  {item.Children && item.Children.length > 0 ? (
                    <Link
                      onClick={(e) => {
                        dispatch(setOpenMenuRes(false));
                        setAnchorEl(null);
                        setActiveMenu(null);
                        enableBodyScroll();

                        e.preventDefault();
                        startTransition(() => {
                          router.push(item.url || item.pageUrl || "#");
                        });
                      }}
                      href={item.url || item.pageUrl || "#"}
                      className="py-2 cursor-pointer font-bold!"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Link className="font-bold!"
                      onClick={(e) => {
                        dispatch(setOpenMenuRes(false));
                        setAnchorEl(null);
                        setActiveMenu(null);
                        enableBodyScroll();

                        e.preventDefault();
                        startTransition(() => {
                          router.push(item.url || item.pageUrl || "#");
                        });
                      }}
                      href={item.url || item.pageUrl || "#"}
                    >
                      <div className="py-2 cursor-pointer font-bold">
                        {item.title}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Material-UI Dropdown */}
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          keepMounted
          disablePortal
          style={{
            zIndex: 1200,
            width: "auto",
            position: "fixed",
            margin: 0,
            left: dropdownOffsets.left,
            right: dropdownOffsets.right,
            top: dropdownTop,
            maxWidth: `calc(100vw - ${
              dropdownOffsets.left + dropdownOffsets.right
            }px)`,
          }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 0],
              },
            },
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
                padding: 0,
              },
            },
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "computeStyles",
              options: {
                gpuAcceleration: false,
                adaptive: false,
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade
              style={{ margin: 0, padding: 0 }}
              {...TransitionProps}
              timeout={200}
            >
              <AnimatedPaper
                sx={{
                  width: "auto",
                  maxWidth: `calc(100vw - ${
                    dropdownOffsets.left + dropdownOffsets.right
                  }px)`,
                  mt: 0,
                  pb: 5,
                  pt: 1,
                  left: dropdownOffsets.left,
                  right: dropdownOffsets.right,
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <SubmenuDropdown
                  activeMenu={activeMenu}
                  onClose={onClose}
                  startTransition={startTransition}
                />
              </AnimatedPaper>
            </Fade>
          )}
        </Popper>
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
                className={`text-right py-2 cursor-pointer font-bold ${
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
            <Link
              onClick={(e) => {
                dispatch(setOpenMenuRes(false));
                setAnchorEl(null);
                setActiveMenu(null);
                enableBodyScroll();

                e.preventDefault();
                startTransition(() => {
                  router.push(item.url || item.pageUrl || "#");
                });
              }}
              href={item.url || item.pageUrl || "#"}
              className={`w-full text-right py-2 transition-colors cursor-pointer font-bold! ${
                isActivePath(item.url || item.pageUrl)
                  ? "text-[#d1182b]"
                  : "text-gray-800 hover:text-[#d1182b]"
              }`}
            >
              {item.title}
            </Link>
          ),
        };
      });
    };

    const handleLogout = async () => {
      try {
        Cookies.remove("user");
        dispatch(setOpenMenuRes(false));
        enableBodyScroll();
        startTransition(() => {
          router.push("/");
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    const dashboardItems = user?.token
      ? [
          {
            key: "dashboard-group",
            label: (
              <div
                className={`text-right  py-2 cursor-pointer font-bold ${
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
                <Link
                  onClick={(e) => {
                    dispatch(setOpenMenuRes(false));
                    setAnchorEl(null);
                    setActiveMenu(null);
                    enableBodyScroll();

                    e.preventDefault();
                    startTransition(() => {
                      router.push(item.path);
                    });
                  }}
                  href={item.path}
                  className={`flex items-center gap-3 w-full py-2 transition-colors cursor-pointer font-bold! ${
                    isActivePath(item.path)
                      ? "text-[#d1182b]"
                      : "text-gray-800 hover:text-[#d1182b]"
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span>{item.title}</span>
                </Link>
              ),
            })),
          },
        ]
      : [];

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
                  className="flex items-center font-bold gap-3 w-full !text-red-600 bg-transparent py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>خروج از حساب</span>
                </button>
              ),
            },
          ]
        : []),
    ];

    const currentAccordionKey = getAccordionKeyFromPath(pathname);

    return (
      <>
        <div className="p-3 lg:hidden flex justify-between items-center w-full">
          <div className="flex items-center">
            <FaBars className="text-2xl cursor-pointer" onClick={showDrawer} />
          </div>
        </div>

        <Drawer
          zIndex={10010000}
          width={250}
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
            <div className="bg-[#d1182b] rounded-full p-1 !text-white cursor-pointer">
              <FaXmark className="text-xl" />
            </div>
          }
        >
          <Menu
            mode="inline"
            style={{
              width: "100%",
              direction: "rtl",
              zIndex: "100000",
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
