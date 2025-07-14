"use client";

import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import { Drawer, Menu } from "antd";
import { getUserCookie } from "@/utils/cookieUtils";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
import { 
  Popper, 
  Paper, 
  Box,
  Grow
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SubmenuDropdown from "./SubmenuDropdown";

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
  backgroundColor: '#fff',
  borderRadius: '0px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  width: '100vw', // عرض کامل viewport
  maxWidth: '100vw',
  overflow: 'hidden',
  marginTop: '0px',
  paddingTop: '0px',
  fontFamily: 'inherit',
  position: 'fixed', // فیکس شده
  left: '0', // چسبیده به لبه چپ
  right: '0', // چسبیده به لبه راست
  maxHeight: '70vh',
  overflowY: 'auto',
  direction: 'rtl', // راست‌چین برای فارسی
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#d1182b',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#b91626',
  },
}));



function ResponsiveMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { items, loading, openMenuRes } = useSelector((state) => state.menuRes);
  const [openKeys, setOpenKeys] = useState([]);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedChildren, setExpandedChildren] = useState(new Set());
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const childDropdownTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);

  const { settings } = useSelector((state) => state.settings);

  // باید قبل از هر استفاده‌ای از open تعریف شود
  const open = Boolean(anchorEl);

  // غیرفعال کردن اسکرول صفحه وقتی زیرمنو باز است
  useEffect(() => {
    if (open && activeMenu && activeMenu.Children && activeMenu.Children.length > 0) {
      // ذخیره overflow اصلی
      const originalOverflow = document.body.style.overflow;
      // غیرفعال کردن اسکرول
      document.body.style.overflow = 'hidden';
      
      // اضافه کردن event listener برای کلید Escape
      const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
          handleMenuClose();
        }
      };
      
      // اضافه کردن event listener برای کلیک خارج از زیرمنو
      const handleClickOutside = (event) => {
        // چک کردن اینکه آیا کلیک خارج از navbar و dropdown است
        const navbar = navbarRef.current;
        const dropdown = document.querySelector('[data-popper-placement]');
        
        if (navbar && !navbar.contains(event.target) && 
            dropdown && !dropdown.contains(event.target)) {
          handleMenuClose();
        }
      };
      
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        // بازگرداندن overflow اصلی
        document.body.style.overflow = originalOverflow;
        // حذف event listener
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, activeMenu]);

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
    </div>
  );

  // تابع برای مدیریت کلیک روی لینک‌ها
  const handleNavigation = (url) => {
    // بستن دراور
    dispatch(setOpenMenuRes(false));
    // بستن dropdown
    setAnchorEl(null);
    setActiveMenu(null);
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

  // تابع‌های مدیریت dropdown
  const handleMenuOpen = (event, menuItem) => {
    // اگر آیتم فرزند ندارد، هیچ کاری نکن
    if (!menuItem.Children || menuItem.Children.length === 0) {
      return;
    }
    
    // جلوگیری از باز شدن مجدد اگر همان منو باز است
    if (activeMenu && activeMenu.id === menuItem.id && open) {
      return;
    }
    
    // پیدا کردن موقعیت دقیق navbar
    const navbar = navbarRef.current;
    if (navbar) {
      const navbarRect = navbar.getBoundingClientRect();
      const headerFixed = document.querySelector('[data-header-fixed="true"]');
      const navbarFixed = document.querySelector('[data-navbar-fixed="true"]');
      
      // ایجاد یک عنصر anchor مصنوعی برای موقعیت دقیق dropdown
      const createAnchorElement = () => {
        const rect = event.currentTarget.getBoundingClientRect();
        let topPosition;
        
        if (navbarFixed) {
          // اگر navbar فیکس شده، dropdown باید دقیقاً زیر navbar فیکس شده باشه
          const headerHeight = headerFixed ? headerFixed.offsetHeight : 0;
          topPosition = headerHeight + navbarFixed.offsetHeight;
        } else {
          // اگر navbar فیکس نشده، dropdown باید زیر navbar اصلی باشه
          topPosition = navbarRect.bottom;
        }
        
        const anchorElement = {
          getBoundingClientRect: () => ({
            top: topPosition,
            bottom: topPosition,
            left: 0,
            right: window.innerWidth,
            width: window.innerWidth,
            height: 0,
            x: 0,
            y: topPosition,
          })
        };
        
        return anchorElement;
      };
      
      setAnchorEl(createAnchorElement());
    } else {
      setAnchorEl(event.currentTarget);
    }
    setActiveMenu(menuItem);
  };

  const handleMenuClose = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    
    // Add a small delay to prevent immediate closing when moving to dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setActiveMenu(null);
      setExpandedChildren(new Set()); // Reset expanded children
      // فعال کردن مجدد اسکرول صفحه فقط اگر dropdown باز بود
      if (activeMenu && activeMenu.Children && activeMenu.Children.length > 0) {
        document.body.style.overflow = '';
      }
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when entering dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    handleMenuClose();
  };

  // تابع برای toggle کردن دروپ‌داون فرزندان
  const handleChildToggle = (childId, event) => {
    // جلوگیری از bubble شدن event
    event.preventDefault();
    event.stopPropagation();
    
    setExpandedChildren(prev => {
      const newSet = new Set(prev);
      if (newSet.has(childId)) {
        newSet.delete(childId);
      } else {
        newSet.add(childId);
      }
      return newSet;
    });
  };

  // Update dropdown position on scroll and resize
  useEffect(() => {
    let timeoutId;
    
    const handleScrollAndResize = () => {
      if (open && anchorEl && activeMenu) {
        // Debounce the position update to prevent excessive re-renders
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const navbar = navbarRef.current;
          if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            const headerFixed = document.querySelector('[data-header-fixed="true"]');
            const navbarFixed = document.querySelector('[data-navbar-fixed="true"]');
            
            let topPosition;
            if (navbarFixed) {
              const headerHeight = headerFixed ? headerFixed.offsetHeight : 0;
              topPosition = headerHeight + navbarFixed.offsetHeight;
            } else {
              topPosition = navbarRect.bottom;
            }
            
            // Update the anchor element position
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
              })
            };
            setAnchorEl(updatedAnchorEl);
          }
        }, 16); // ~60fps
      }
    };

    window.addEventListener('scroll', handleScrollAndResize, { passive: true });
    window.addEventListener('resize', handleScrollAndResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
      clearTimeout(timeoutId);
      // Cleanup timeout on unmount
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [open, anchorEl, activeMenu]);

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
        className="main-navbar duration-1000 ease-in-out w-full flex text-white relative"
      >
        <div className="w-full">
          <div className="flex justify-center w-full overflow-x-auto lg:overflow-visible">
            <div className="flex items-center" ref={menuRef}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`hover:bg-[#0002] duration-300 px-2 relative group hidden lg:flex items-center ${
                    i === items.length - 1 ? "" : "border-l border-[#fff8]"
                  }`}
                  style={{ fontSize: '15px' , whiteSpace:'nowrap'}}
                  onMouseEnter={(e) => item.Children && item.Children.length > 0 ? handleMenuOpen(e, item) : null}
                  onMouseLeave={item.Children && item.Children.length > 0 ? handleMenuClose : null}
                >
                  {item.Children && item.Children.length > 0 ? (
                    <div className="py-2 cursor-pointer font-semibold">
                      {item.title}
                    </div>
                  ) : (
                    <Link href={item.url || item.pageUrl || "#"}>
                      <div className="py-2 cursor-pointer font-semibold">
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
          style={{ zIndex: 1100, width: '100vw', position: 'fixed', left: 0, right: 0 }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 0,
              },
            },
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false,
                adaptive: false,
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={0}>
              <StyledPaper
                sx={{
                  width: '100vw',
                  maxWidth: '100vw',
                  mt: 0,
                  pt: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <SubmenuDropdown
                  activeMenu={activeMenu}
                  expandedChildren={expandedChildren}
                  onChildToggle={handleChildToggle}
                  onNavigation={handleNavigation}
                />
              </StyledPaper>
            </Grow>
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
