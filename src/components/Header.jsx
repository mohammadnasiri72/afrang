"use client";

import { setOpenShopping } from "@/redux/slices/shoppingSlice";
import { setUser } from "@/redux/slices/userSlice";
import { getImageUrl } from "@/utils/mainDomain";
import { Badge } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import SearchHeader from "./SearchHeader";

const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between lg:px-8 px-2 py-2 bg-white">
      {" "}
      {/* کاهش padding */}
      {/* Left Section - Logo and Search */}
      <div className="flex items-center lg:w-1/2 w-auto">
        <div className="flex items-center lg:w-2/5 w-auto">
          {/* Logo */}
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg" />{" "}
          {/* کوچکتر */}
          {/* Logo Text */}
          <div className="flex-col px-1 lg:flex hidden">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-20" />{" "}
            {/* کوچکتر */}
          </div>
        </div>
        {/* Search Bar */}
        <div className="px-2 lg:flex hidden items-center justify-start rounded-lg bg-slate-200 lg:w-3/5 w-4/5">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded-full mx-1" />{" "}
          {/* کوچکتر */}
          <div className="h-6 bg-gray-300 animate-pulse rounded w-full" />{" "}
          {/* کوچکتر */}
        </div>
      </div>
      {/* Right Section - Contact, User, Cart */}
      <div className="flex items-center justify-end lg:w-1/2 w-auto gap-4">
        {" "}
        {/* کاهش فاصله */}
        {/* Contact Info */}
        <div className="lg:flex hidden items-center">
          <div className="bg-slate-200 rounded-lg p-1">
            {" "}
            {/* کوچکتر */}
            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col pr-1 gap-1">
            {" "}
            {/* کاهش فاصله */}
            <div className="h-2 bg-gray-200 animate-pulse rounded w-16" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
          </div>
        </div>
        {/* User Section */}
        <div className="flex items-center gap-2">
          {" "}
          {/* کاهش فاصله */}
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-8" />
          </div>
          <div className="border-r border-[#0005] pr-2">
            <div className="h-3 bg-gray-200 animate-pulse rounded w-10" />
          </div>
        </div>
        {/* Cart Icon */}
        <div className="relative mt-1">
          {" "}
          {/* کاهش فاصله */}
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function Header(props) {
  const user = useSelector((state) => state.user.user);
  const { settings, loading } = useSelector((state) => state.settings);
  const { currentItems } = useSelector((state) => state.cart);
  const disPatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        disPatch(setUser(userData));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && props.onLoaded) {
      props.onLoaded();
    }
  }, [loading]);

  if (loading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="bg-white w-full">
      <div
        style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
        className="flex items-center justify-between lg:px-16 px-4 py-1"
      >
        <div className="flex items-center lg:w-1/2 w-auto">
          <div className="flex items-center lg:w-2/5 w-auto">
            {settings?.find((item) => item.propertyKey === "site_home_url") ? (
              <Link
                href={
                  settings.find((item) => item.propertyKey === "site_home_url")
                    ?.value || "/"
                }
                aria-label="صفحه اصلی"
              >
                <img
                  className="lg:w-14 w-24 "
                  src={getImageUrl(
                    settings.find(
                      (item) => item.propertyKey === "site_footer_logo"
                    )?.value
                  )}
                  alt=""
                />
              </Link>
            ) : (
              <img className="lg:w-14 w-24" src="/images/logo.png" alt="" />
            )}

            <Link
              aria-label="صفحه اصلی"
              href={
                settings?.find((item) => item.propertyKey === "site_home_url")
                  ?.value || "/"
              }
            >
              <div className="flex-col px-1 lg:flex hidden">
                <span className="w-28 font-semibold text-lg">
                  {"خانــه عکاســــان افــــــــــرنـگ" ||
                    settings?.find((item) => item.propertyKey === "site_title")
                      ?.value}
                </span>
              </div>
            </Link>
          </div>
          <SearchHeader />
        </div>
        <div className="flex items-center justify-end lg:w-1/2 w-auto gap-7">
          <div className="lg:flex hidden items-center">
            <div className="bg-slate-200 rounded-lg p-2">
              <BiPhoneCall className="text-xl text-[#0008]" />
            </div>
            <div className="flex flex-col pr-2 text-xs">
              <span className="text-[#0008]"> آیا سوالی دارید </span>
              <span className="text-red-700 font-semibold text-sm">
                <a
                  href={`tel:${
                    settings?.find((item) => item.propertyKey === "site_tel")
                      ?.value || "02177615546"
                  }`}
                >
                  {settings?.find((item) => item.propertyKey === "site_tel")
                    ?.value || "77615546"}
                </a>
              </span>
            </div>
          </div>

          {user?.token ? (
            <ProfileDropdown />
          ) : (
            <div className="flex items-center gap-3 font-semibold">
              <div
                onClick={() => {
                  route.push("/login");
                }}
                className="flex items-center cursor-pointer hover:text-[#d1182b] duration-300"
              >
                <img src="/images/icons/arrow-login.png" alt="" />
                <span>ورود</span>
              </div>
              <div
                onClick={() => {
                  route.push("/register");
                }}
                className="border-r border-[#0005] pr-3"
              >
                <span className="cursor-pointer hover:text-[#d1182b] duration-300">
                  عضویت
                </span>
              </div>
            </div>
          )}
          <div
            onClick={() => disPatch(setOpenShopping(true))}
            className="cursor-pointer relative mt-3"
          >
            <Badge
              count={
                currentItems.length > 0
                  ? currentItems?.filter((e) => e.parentId === -1)?.length
                  : 0
              }
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                backgroundColor:
                  currentItems.length > 0 &&
                  currentItems?.filter((e) => e.parentId === -1).length !== 0
                    ? "#d1182b"
                    : "#000",
                color: "#fff",
                transform: "translate(-8px, -8px)",
              }}
            >
              <FaCartShopping
                className={`text-4xl  ${
                  currentItems.length > 0 &&
                  currentItems?.filter((e) => e.parentId === -1).length !== 0
                    ? "text-teal-500"
                    : "text-[#d1182b]"
                }`}
              />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
