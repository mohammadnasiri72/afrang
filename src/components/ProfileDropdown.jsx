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
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(Cookies.get("user"));

  const dispatch = useDispatch();
  const router = useRouter();
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

  const LogoutHandler = async () => {
    setLoading(true);
    try {
      await authServiceSignOut.signOut(user.token);
      Cookies.remove("user");
      dispatch(setUser(""));
      setIsOpen(false);
      router.push("/");
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
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
      href: "/card",
    },
    {
      id: 2,
      label: "تنظیمات حساب",
      icon: <IoMdSettings className="text-lg" />,
      href: "/settings",
    },
    {
      id: 3,
      label: "سفارش‌های من",
      icon: <BsBoxSeam className="text-lg" />,
      href: "/orders",
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
        <div className="overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center z-[9999]">
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
                  className="w-full h-full object-cover"
                  src={
                    mainDomain + user?.avatar || "/images/default-avatar.jpg"
                  }
                  alt={`${user?.displayName || "کاربر"}`}
                />
              </div>
              <div className="select-none">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || "کاربر مهمان"}
                </p>
                {user?.mobile && (
                  <p className="text-xs text-gray-500">{user.mobile}</p>
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
