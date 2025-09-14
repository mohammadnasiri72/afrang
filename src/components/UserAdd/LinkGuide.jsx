"use client";
import { setActiveTab } from "@/redux/slices/idEditSec";
import { getUserCookie } from "@/utils/cookieUtils";
import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { BsPatchQuestionFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

function LinkGuide() {
  const [href, setHref] = useState("/login");
  const [href2, setHref2] = useState("/login");
  const disPatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  if (isPending) {
    return (
      <>
        <div className="fixed inset-0 bg-[#fff] flex items-center justify-center !z-[10000000000000] transition-opacity duration-300">
          <div className="w-8 h-8 border-4 border-[#d1182b] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  useEffect(() => {
    const userData = getUserCookie();
    if (!userData?.token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setHref("/login");
    } else {
      setHref("/profile/second-hand/add");
    }
  }, []);

  useEffect(() => {
    const userData = getUserCookie();
    if (!userData?.token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setHref2("/login");
    } else {
      setHref2("/profile/missing-report");
    }
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-1/4 w-full p-3">
          <Alert
            message="
        بازدید کننده گرامی جهت ثبت سفارشات خرید و فروش تجهیزات عکاسی و دوربین دیجیتال کارکرده و دست دوم باید عضو سایت افرنگ دیجیتال شوید . در صورتیکه تا کنون به عضویت سایت افرنگ دیجیتال در نیامده اید فرم مربوطه را از اینجا تکمیل نمایید . 
       "
            type="info"
            className="text-justify"
          />
        </div>
        <div className="lg:w-3/4 w-full p-3 flex flex-col items-start justify-between gap-4 my-2">
          <Link
            className=" flex items-center gap-1 group"
            href={"/UsedRules"}
            onClick={(e) => {
              e.preventDefault();

              startTransition(() => {
                router.push("/UsedRules");
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BsPatchQuestionFill className="text-[#d1182b] text-xl" />
            <span className="font-semibold text-cyan-700 group-hover:text-[#d1182b] duration-300">
              مشاهده قوانین خرید و فروش تجهیزات عکاسی و دوربین دیجیتال کارکرده و
              دست دوم.
            </span>
          </Link>
          <Link
            className=" flex items-center gap-1 group"
            href={href}
            onClick={(e) => {
              disPatch(setActiveTab(2));
              e.preventDefault();

              startTransition(() => {
                router.push(href);
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BsPatchQuestionFill className="text-[#d1182b] text-xl" />
            <span className="font-semibold text-cyan-700 group-hover:text-[#d1182b] duration-300">
              ثبت آگهی خرید دست دوم
            </span>
          </Link>
          <Link
            className=" flex items-center gap-1 group"
            href={href}
            onClick={(e) => {
              disPatch(setActiveTab(1));
              e.preventDefault();

              startTransition(() => {
                router.push(href);
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BsPatchQuestionFill className="text-[#d1182b] text-xl" />
            <span className="font-semibold text-cyan-700 group-hover:text-[#d1182b] duration-300">
              ثبت آگهی فروش دست دوم
            </span>
          </Link>
          <Link
            className=" flex items-center gap-1 group"
            href={href2}
            onClick={(e) => {
              e.preventDefault();

              startTransition(() => {
                router.push(href2);
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BsPatchQuestionFill className="text-[#d1182b] text-xl" />
            <span className="font-semibold text-cyan-700 group-hover:text-[#d1182b] duration-300">
              جهت ثبت سریال محصول مفقود شده خود برروی این لینک کلیک نمایید.
            </span>
          </Link>
          <Link
            className=" flex items-center gap-1 group"
            target="_blank"
            href={"https://www.afrangdigital.com/help/help.htm"}
          >
            <BsPatchQuestionFill className="text-[#d1182b] text-xl" />
            <span className="font-semibold text-cyan-700 group-hover:text-[#d1182b] duration-300">
              درصورت تمایل جهت آگاهی از روند کار ، از راهنمای سایت استفاده
              نمایید.
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LinkGuide;
