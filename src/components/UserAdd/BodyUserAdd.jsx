"use client";
import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaRecycle } from "react-icons/fa";
import BoxBuySec from "./BoxBuySec";
import BoxSellSec from "./BoxSellSec";
import LinkGuide from "./LinkGuide";
import SearchProductSec from "./SearchProductSec";
import Loading from "../Loading";

function BodyUserAdd({ productList, pathname, archived }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
 
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center !mb-6 gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaRecycle className="text-gray-800 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800 ">
              کالای دسته دوم
            </h1>
          </div>
          <div className="w-full">
            <SearchProductSec />
          </div>
        </div>
        <LinkGuide />
        <div className="flex flex-wrap items-center ">
          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <Link
              href={"/useds/-1"}
              onClick={(e) => {
                e.preventDefault();

                startTransition(() => {
                  router.push("/useds/-1");
                });
              }}
            >
              <div
                className={` !text-white rounded-lg  p-3 flex flex-col items-center justify-start gap-2 relative z-50 duration-300 h-44 ${
                  pathname === "useds" ? "bg-amber-500" : "bg-amber-400"
                }`}
              >
                <div className="used-icon-thumb icon2 ">
                  <span></span>
                </div>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  پیشنهادات فروش
                </span>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  دست دوم کاربران
                </span>
              </div>
            </Link>
            {/* arrow */}
            {pathname === "useds" && !archived && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-amber-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <Link
              href={"/buyers/-1"}
              onClick={(e) => {
                e.preventDefault();

                startTransition(() => {
                  router.push("/buyers/-1");
                });
              }}
            >
              <div
                className={` !text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44 ${
                  pathname === "buyers" ? "bg-teal-500" : "bg-teal-400"
                }`}
              >
                <div className="used-icon-thumb icon3 ">
                  <span></span>
                </div>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  پیشنهادات خرید
                </span>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  دست دوم کاربران
                </span>
              </div>
            </Link>
            {/* arrow */}
            {pathname === "buyers" && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-teal-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <Link
              href={"/products?conditionId=20&orderby=5"}
              onClick={(e) => {
                e.preventDefault();

                startTransition(() => {
                  router.push("/products?conditionId=20&orderby=5");
                });
              }}
            >
              <div
                className={` !text-white rounded-lg bg-[#720807] p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44`}
              >
                <div className="used-icon-thumb icon1 ">
                  <span></span>
                </div>
                <span className="font-bold sm:text-lg whitespace-nowrap">
                  پیشنهادات افرنگ
                </span>
              </div>
            </Link>
          </div>

          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <Link
              href={"/useds/-1?archived=true"}
              onClick={(e) => {
                e.preventDefault();

                startTransition(() => {
                  router.push("/useds/-1?archived=true");
                });
              }}
            >
              <div
                className={` !text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44 ${
                  pathname === "useds" && archived
                    ? "bg-blue-500"
                    : "bg-blue-400"
                }`}
              >
                <div className="used-icon-thumb icon4 ">
                  <span></span>
                </div>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  درخواست های آرشیو
                </span>
                <span className="font-semibold sm:text-lg whitespace-nowrap">
                  و فروخته شده
                </span>
              </div>
            </Link>
            {/* arrow */}
            {pathname === "useds" && archived && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-blue-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>
        </div>
        <Divider style={{ marginBottom: 0, paddingBottom: 0 }} />
        {pathname === "useds" && <BoxSellSec productList={productList} />}
        {pathname === "buyers" && <BoxBuySec productList={productList} />}
      </div>
      {
        isPending && <Loading />
      }
    </>
  );
}

export default BodyUserAdd;
