import Link from "next/link";
import { setOpenShopping } from "@/redux/slice/shopping";
import { Badge } from "antd";
import { useRouter } from "next/navigation";
import { BiPhoneCall } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slice/user";
import { getImageUrl, mainDomainImg } from "@/utils/mainDomain";

export default function Header() {
  const { user: authUser, isLoading } = useAuth();
  const user = useSelector((state) => state.user.user);
  const { items } = useSelector((state) => state.settings);
  const { items: cartItems } = useSelector((state) => state.cart);
  const disPatch = useDispatch();
  const route = useRouter();

  const checkAuthStatus = () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) return false;
    
    try {
      const userData = JSON.parse(userCookie);
      return !!userData.token;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        if (!user || !user.token) {
          disPatch(setUser(userData));
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const isAuthenticated = user?.token && checkAuthStatus();

  return (
    <div className="flex items-center justify-between lg:px-16 px-4 py-5 bg-white">
      <div className="flex items-center lg:w-1/2 w-auto">
        <div className="flex items-center lg:w-2/5 w-auto">
          {items.find((item) => item.propertyKey === "site_home_url") ? (
            <Link
              href={
                items.find((item) => item.propertyKey === "site_home_url")
                  ?.value
              }
            >
              <img
                className="w-14 "
                src={
                  getImageUrl(
                    items.find((item) => item.propertyKey === "site_footer_logo")
                      ?.value
                  )
                }
                alt=""
              />
            </Link>
          ) : (
            <img className="w-14" src="/images/logo.png" alt="" />
          )}
          <div className="flex-col px-1 font-extrabold logo-text lg:flex hidden">
           
            <span className="w-20">
              {items.find((item) => item.propertyKey === "site_title")
                      ?.value}
            </span>
          </div>
        </div>
        <div className="px-3 lg:flex hidden items-center justify-start rounded-lg bg-slate-200 lg:w-3/5 w-4/5">
          <IoSearchSharp className="text-2xl cursor-pointer" />
          <input
            className=" bg-transparent border-none outline-none p-2 w-full"
            type="text"
            placeholder="جستجو..."
          />
        </div>
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
                  items.find((item) => item.propertyKey === "site_tel")
                    ?.value || "02177615546"
                }`}
              >
                {items.find((item) => item.propertyKey === "site_tel")?.value ||
                  "77615546"}
              </a>
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        ) : isAuthenticated ? (
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
            count={cartItems?.length || 0}
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              backgroundColor: "#000",
              color: "#fff",
              transform: "translate(-8px, -8px)",
            }}
          >
            <FaCartShopping className="text-4xl text-[#d1182b]" />
          </Badge>
        </div>
      </div>
    </div>
  );
}
