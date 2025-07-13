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
import { 
  Popper, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Typography,
  Box,
  Divider,
  Fade,
  Grow
} from "@mui/material";
import { styled } from "@mui/material/styles";

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
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  marginTop: '0px',
  paddingTop: '0px',
  fontFamily: 'inherit',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '12px 16px',
  transition: 'all 0.2s ease-in-out',
  fontFamily: 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(209, 24, 43, 0.08)',
    transform: 'translateX(-4px)',
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'inherit',
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    fontFamily: 'inherit',
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#d1182b',
  padding: '16px 16px 8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '8px',
  fontFamily: 'inherit',
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
  const menuRef = useRef(null);
  const navbarRef = useRef(null);

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
    // پیدا کردن موقعیت دقیق navbar
    const navbar = navbarRef.current;
    if (navbar) {
      const navbarRect = navbar.getBoundingClientRect();
      const headerFixed = document.querySelector('[data-header-fixed="true"]');
      const navbarFixed = document.querySelector('[data-navbar-fixed="true"]');
      
      // تنظیم موقعیت dropdown
      if (navbarFixed) {
        // اگر navbar فیکس شده، dropdown باید دقیقاً زیر navbar فیکس شده باشه
        const headerHeight = headerFixed ? headerFixed.offsetHeight : 0;
        const dropdownTop = headerHeight + navbarFixed.offsetHeight;
        
        // تنظیم موقعیت anchorEl
        const rect = event.currentTarget.getBoundingClientRect();
        const newAnchorEl = {
          getBoundingClientRect: () => ({
            ...rect,
            top: dropdownTop,
            bottom: dropdownTop,
            left: 0,
            right: window.innerWidth,
            width: window.innerWidth,
          })
        };
        setAnchorEl(newAnchorEl);
      } else {
        // اگر navbar فیکس نشده، dropdown باید زیر navbar اصلی باشه
        const rect = event.currentTarget.getBoundingClientRect();
        const newAnchorEl = {
          getBoundingClientRect: () => ({
            ...rect,
            top: navbarRect.bottom,
            bottom: navbarRect.bottom,
            left: 0,
            right: window.innerWidth,
            width: window.innerWidth,
          })
        };
        setAnchorEl(newAnchorEl);
      }
    } else {
      setAnchorEl(event.currentTarget);
    }
    setActiveMenu(menuItem);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const open = Boolean(anchorEl);

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
          <div className="flex justify-start w-full overflow-x-auto lg:overflow-visible">
            <div className="flex items-center" ref={menuRef}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`hover:bg-[#0002] duration-300 px-2 relative group hidden lg:flex items-center ${
                    i === items.length - 1 ? "" : "border-l border-[#fff8]"
                  }`}
                  onMouseEnter={(e) => handleMenuOpen(e, item)}
                  onMouseLeave={handleMenuClose}
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
          style={{ zIndex: 9999, width: '100%' }}
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
              options: {
                fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={200}>
              <StyledPaper
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  mt: 0,
                  pt: 0,
                }}
              >
                {activeMenu && activeMenu.Children && activeMenu.Children.length > 0 && (
                  <>
                    <CategoryTitle>
                      {activeMenu.title}
                    </CategoryTitle>
                    <List sx={{ py: 0 }}>
                      {activeMenu.Children.map((child, index) => (
                        <div key={child.id}>
                          {child.Children && child.Children.length > 0 ? (
                            <>
                              <StyledListItem
                                button
                                onClick={() => handleNavigation(child.url || child.pageUrl || "#")}
                              >
                                <StyledListItemText
                                  primary={child.title}
                                  primaryTypographyProps={{
                                    sx: { 
                                      fontWeight: 600, 
                                      color: '#d1182b',
                                      fontFamily: 'inherit',
                                      fontSize: '14px',
                                    }
                                  }}
                                />
                              </StyledListItem>
                              <Box sx={{ px: 2, pb: 1 }}>
                                <div className="grid grid-cols-3 gap-1">
                                  {child.Children.map((subChild) => (
                                    <StyledListItem
                                      key={subChild.id}
                                      button
                                      onClick={() => handleNavigation(subChild.url || subChild.pageUrl || "#")}
                                      sx={{ 
                                        py: 1, 
                                        px: 1,
                                        minHeight: 'auto',
                                        '&:hover': {
                                          backgroundColor: 'rgba(209, 24, 43, 0.08)',
                                        }
                                      }}
                                    >
                                      <StyledListItemText
                                        primary={subChild.title}
                                        primaryTypographyProps={{
                                          sx: { 
                                            fontSize: '12px', 
                                            fontWeight: 500,
                                            fontFamily: 'inherit',
                                          }
                                        }}
                                      />
                                    </StyledListItem>
                                  ))}
                                </div>
                              </Box>
                            </>
                          ) : (
                            <StyledListItem
                              button
                              onClick={() => handleNavigation(child.url || child.pageUrl || "#")}
                            >
                              <StyledListItemText 
                                primary={child.title}
                                primaryTypographyProps={{
                                  sx: {
                                    fontFamily: 'inherit',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                  }
                                }}
                              />
                            </StyledListItem>
                          )}
                          {index < activeMenu.Children.length - 1 && (
                            <Divider sx={{ mx: 2 }} />
                          )}
                        </div>
                      ))}
                    </List>
                  </>
                )}
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
