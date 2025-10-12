"use client";

import { clearUser } from "@/redux/slices/userSlice";
import { SignOut } from "@/services/Account/AccountService";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import { Spin } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import ReactDOM from "react-dom";
import {
  FaAddressBook,
  FaBox,
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
  FaUser,
} from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const resetUserCookie = () => {
  const initialData = {
    token: "",
    refreshToken: "",
    expiration: "",
    userId: generateRandomUserId(),
    displayName: "",
    roles: [],
  };
  Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
  return initialData;
};

const ProfileDropdown = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const [user, setUser] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [menuAnimate, setMenuAnimate] = useState(false); // <-- new state
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const dispatch = useDispatch();

  // تابع به‌روزرسانی موقعیت منو
  const updateMenuPos = () => {
    if (profileBtnRef.current) {
      const rect = profileBtnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 6, // فقط فاصله، بدون window.scrollY
        left: rect.left, // فقط مختصات، بدون window.scrollX
      });
    }
  };

  useEffect(() => {
    updateMenuPos();
  }, []);

  // بستن منو هنگام کلیک خارج از آن
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (isOpen) {
      setMenuAnimate(false); // reset before showing
      document.body.style.overflow = "hidden";
      updateMenuPos();
      window.addEventListener("scroll", updateMenuPos, true);
      window.addEventListener("resize", updateMenuPos, true);
      // Always trigger animation after mount
      setTimeout(() => setMenuAnimate(true), 10);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", updateMenuPos, true);
      window.removeEventListener("resize", updateMenuPos, true);
      setMenuAnimate(false); // reset on close
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
      window.removeEventListener("scroll", updateMenuPos, true);
      window.removeEventListener("resize", updateMenuPos, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const userData = getUserCookie();
    setUser(userData);
  }, []);

  const LogoutHandler = async () => {
    const user = JSON.parse(Cookies.get("user"));
    if (!user?.token) {
      resetUserCookie();
      dispatch(clearUser());
      setIsLoggedIn(false);
      router.replace("/");
      return;
    }

    setLoading(true);
    try {
      const res = await SignOut(user.token);

      if (res.ok) {
        resetUserCookie();
        dispatch(clearUser());
        setIsOpen(false);
        setIsLoggedIn(false);
        router.replace("/");
      } else {
        Toast.fire({
          icon: "error",
          text: res.message || "خروج با مشکل مواجه شد",
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response.data || "خروج با مشکل مواجه شد",
      });
    } finally {
      setLoading(false);
    }
  };

  // آیتم‌های داشبورد کاربری (مطابق ResponsiveMenu.jsx)
  const dashboardMenuItems = [
    {
      id: "dashboard",
      label: "داشبورد",
      icon: <FaHome className="text-lg" />,
      href: "/profile/dashboard",
    },
    {
      id: "edit-profile",
      label: "ویرایش پروفایل",
      icon: <FaUser className="text-lg" />,
      href: "/profile/edit-profile",
    },
    {
      id: "orders",
      label: "سفارشات من",
      icon: <FaBox className="text-lg" />,
      href: "/profile/orders",
    },
    {
      id: "favorites",
      label: "علاقه‌مندی‌های من",
      icon: <FaHeart className="text-lg" />,
      href: "/profile/favorites",
    },
    {
      id: "second-hand",
      label: "کالای دسته دوم",
      icon: <FaRecycle className="text-lg" />,
      href: "/profile/second-hand",
    },
    {
      id: "user-comments",
      label: "نظرات ارسالی",
      icon: <FaComment className="text-lg" />,
      href: "/profile/user-comments",
    },
    {
      id: "my-articles",
      label: "ارسال اخبار و مقالات",
      icon: <FaNewspaper className="text-lg" />,
      href: "/profile/my-articles",
    },
    {
      id: "send-image",
      label: "ارسال عکس",
      icon: <FaCamera className="text-lg" />,
      href: "/profile/send-photo",
    },
    {
      id: "report-loss",
      label: "گزارش مفقودی",
      icon: <FaExclamationTriangle className="text-lg" />,
      href: "/profile/missing-report",
    },
    {
      id: "about-me",
      label: "درباره من",
      icon: <FaInfoCircle className="text-lg" />,
      href: "/profile/about-me",
    },
    {
      id: "addresses",
      label: "آدرس‌های من",
      icon: <FaAddressBook className="text-lg" />,
      href: "/profile/addresses",
    },
    {
      id: "legal",
      label: "اطلاعات حقوقی",
      icon: <FaBuilding className="text-lg" />,
      href: "/profile/legal",
    },
    {
      id: "change-password",
      label: "تغییر رمز عبور",
      icon: <FaKey className="text-lg" />,
      href: "/profile/change-password",
    },
  ];

  // فقط باکس منو و overlay را با پورتال رندر کن
  const menuPortal =
    isOpen && typeof window !== "undefined"
      ? ReactDOM.createPortal(
          <>
            {/* overlay */}
            <div
              className="fixed inset-0 bg-[#0008] bg-opacity-30 backdrop-blur-sm z-[99998]"
              onClick={() => setIsOpen(false)}
            />
            {/* منو */}
            <div
              ref={dropdownRef}
              className={`fixed w-64 bg-white/95 shadow-lg rounded-lg z-[99999] transition-all duration-300 ease-out
          ${
            menuAnimate
              ? "opacity-100 scale-105 translate-y-5"
              : "opacity-0 scale-95 pointer-events-none translate-y-0"
          }`}
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              {/* هدر منو */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-md cursor-pointer">
                  {user?.avatar ? (
                    <img
                      src={getImageUrl(user.avatar)}
                      alt={`${user?.displayName?.slice(0, 1)}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
                      {user?.displayName?.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                <div className="select-none">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.displayName || "کاربر مهمان"}
                  </p>
                  {user?.userId && (
                    <p className="text-xs text-gray-500">{user.userId}</p>
                  )}
                </div>
              </div>
              {/* خط جداکننده */}
              <div className="px-6">
                <div className="h-px bg-[#0002] w-full" />
              </div>
              {/* آیتم‌های منو */}
              <div className="py-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {dashboardMenuItems.map((item) => (
                  <Link
                    onClick={(e) => {
                      setIsOpen(false);
                      e.preventDefault();
                      startTransition(() => {
                        router.push(item.href || "#");
                      });
                    }}
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300`}
                  >
                    <span className="ml-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div
                  onClick={LogoutHandler}
                  className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300 cursor-pointer"
                >
                  <span className="ml-2">
                    <RiLogoutBoxLine className="text-lg" />
                  </span>
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span>درحال خروج</span>
                      <Spin className="red-spin" size="small" />
                    </div>
                  ) : (
                    <span>خروج</span>
                  )}
                </div>
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <>
      <div className="relative inline-block z-[1000000]">
        {/* آیکون پروفایل */}
        <div
          ref={profileBtnRef}
          className="inline-block"
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div
            className={`overflow-hidden transition-all duration-300 flex items-center justify-center bg-white rounded-full shadow-lg`}
          >
            <FaUser
              className={
                isOpen ? "text-2xl text-[#d1182b]" : "text-2xl text-gray-500"
              }
            />
          </div>
        </div>
        {menuPortal}
      </div>
      {isPending && <Loading />}
    </>
  );
};

export default ProfileDropdown;
