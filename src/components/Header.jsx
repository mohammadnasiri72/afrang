"use client";

import { setUser } from "@/redux/slices/userSlice";
import { getImageUrl } from "@/utils/mainDomain";
import { Badge } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaArrowRightLong, FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import SearchHeader from "./SearchHeader";
import ShoppingDrawer from "./ShoppingDrawer";

export default function Header({ onLoaded, settings }) {
  const userCookie = Cookies.get("user");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const disPatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
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
    if (onLoaded) {
      onLoaded();
    }
  }, []);

  return (
    <div className="bg-white w-full">
      <div
        style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
        className="flex items-center justify-between lg:px-16 px-4"
      >
        <div className="flex items-center w-auto ">
          <div className="flex items-center ">
            {settings?.find((item) => item.propertyKey === "site_home_url")?.value && (
              <Link
                href={
                  settings.find((item) => item.propertyKey === "site_home_url")
                    ?.value
                }
                aria-label="صفحه اصلی"
              >
                <img
                  className="w-14"
                  src={getImageUrl(
                    settings.find(
                      (item) => item.propertyKey === "site_footer_logo"
                    )?.value
                  )}
                  alt={
                    settings.find(
                      (item) => item.propertyKey === "site_footer_logo"
                    )?.title
                  }
                />
              </Link>
            ) }

            <Link
              aria-label="صفحه اصلی"
              href={
                settings?.find((item) => item.propertyKey === "site_home_url")
                  ?.value || "/"
              }
            >
              <div className="flex-col px-1 lg:flex hidden">
                <span className="w-28 font-semibold text-lg">
                  خانــه عکاســــان افــــــــــرنـگ
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <SearchHeader />
        </div>
        <div className="flex items-center justify-end w-auto gap-7">
          <div className="lg:flex hidden items-center">
            <div className="bg-slate-200 rounded-lg p-2">
              <BiPhoneCall className="text-xl text-[#0008]" />
            </div>
            <div className="flex flex-col pr-2 text-xs">
              <span className="text-[#0008]"> آیا سوالی دارید </span>
              {
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
              }
            </div>
          </div>
          {mounted && (
            <div>
              {userCookie && JSON.parse(userCookie)?.token ? (
                <ProfileDropdown />
              ) : (
                <div className="flex items-center gap-3 font-semibold">
                  <div
                    onClick={() => {
                      route.push("/login");
                    }}
                    className="flex items-center gap-1 cursor-pointer hover:text-[#d1182b] duration-300"
                  >
                    <FaArrowRightLong />
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
            </div>
          )}
          {!mounted && (
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#d1182b] duration-300">
                <FaArrowRightLong />
                <span>ورود</span>
              </div>
              <div className="border-r border-[#0005] pr-3">
                <span className="cursor-pointer hover:text-[#d1182b] duration-300">
                  عضویت
                </span>
              </div>
            </div>
          )}
          <div className="relative mt-3">
            {mounted && <ShoppingDrawer header />}
            {!mounted && (
              <Badge
                count={0}
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  backgroundColor: "#000",
                  color: "#fff",
                  transform: "translate(-8px, -8px)",
                }}
              >
                <FaCartShopping className={`text-4xl  ${"text-[#d1182b]"}`} />
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
