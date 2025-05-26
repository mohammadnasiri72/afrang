"use client";

import { setUser } from "@/redux/slice/user";
import { authServiceSignOut } from "@/services/Auth/authService";
import { mainDomain } from "@/utils/mainDomain";
import { Spin } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaBox, FaKey, FaShoppingCart, FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getUserCookie } from "@/utils/cookieUtils";
import { clearUser } from "@/redux/slice/user";

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

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  // بستن منو هنگام کلیک خارج از آن
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userData = getUserCookie();
    setUser(userData);
  }, []);

  const LogoutHandler = async () => {
    if (!user?.token) {
      resetUserCookie();
      dispatch(clearUser());
      router.replace("/");
      return;
    }

    setLoading(true);
    try {
      await authServiceSignOut.signOut(user.token);
      resetUserCookie();
      dispatch(clearUser());
      setIsOpen(false);
      router.replace("/");
    } catch (err) {
      console.error("Logout error:", err);
      resetUserCookie();
      dispatch(clearUser());
      setIsOpen(false);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  // منوی آیتم‌ها
  const menuItems = [
    {
      id: 1,
      label: "سبد خرید",
      icon: <FaShoppingCart className="text-lg" />,
      href: "/cart",
    },
    {
      id: 2,
      label: "ویرایش پروفایل",
      icon: <FaUser className="text-lg" />,
      href: "/profile/edit-profile",
    },
    {
      id: 3,
      label: "سفارش‌های من",
      icon: <FaBox className="text-lg" />,
      href: "/profile/orders",
    },
    {
      id: 4,
      label: "تغییر رمز عبور",
      icon: <FaKey className="text-lg" />,
      href: "/profile/change-password",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* دکمه پروفایل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
        aria-label="منوی پروفایل"
      >
        <div className={`overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center  ${isOpen ? "z-[10000]" : ""}`}>
          <FaUser
            className={
              isOpen ? "text-2xl text-white/95" : "text-2xl text-gray-500"
            }
          />
        </div>
      </button>

      {/* منوی آبشاری */}
      {isOpen && (
        <>
          {/* پس‌زمینه تار */}
          <div
            className="fixed inset-0 bg-[#0008] bg-opacity-30 backdrop-blur-sm z-[9998]"
            onClick={() => setIsOpen(false)}
          />

          {/* منو */}
          <div className="absolute left-0 top-full mt-2 w-64 bg-white/95 shadow-lg rounded-lg z-[9999] animate-fadeIn">
            {/* هدر منو */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md cursor-pointer">
                <img
                  className="w-full h-full object-cover flex items-center justify-center bg-gray-200"
                  src={
                    mainDomain + user?.avatar || "/images/default-avatar.jpg"
                  }
                  alt={`${user?.displayName.slice(0, 1) || "کاربر"}`}
                />
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
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300`}
                  onClick={() => setIsOpen(false)}
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
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
