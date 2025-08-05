"use client";

import { setActiveTab } from "@/redux/slices/activeTab";
import { getUserAdBuy, getUserAdSell } from "@/services/UserAd/UserAdServices";
import { Divider } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import BoxBuySec from "./BoxBuySec";
import BoxSellSec from "./BoxSellSec";
import SearchProductSec from "./SearchProductSec";

function BodyUserAdd() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.activeTab);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderby") || "1";
  const pageIndex = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const price1 = searchParams.get("price1") || undefined;
  const price2 = searchParams.get("price2") || undefined;
  const categoryParams = searchParams.getAll("category");


  // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });


  const orginalData = {
    LangCode: "fa",
    CategoryIdArray:
      categoryParams.length > 0 ? categoryParams.join(",") : undefined,
    ...(price1 && { price1: price1 }),
    ...(price2 && { price2: price2 }),
    // IsActive: 1,
    OrderBy: Number(orderBy),
    // OrderOn: 1,
    PageSize: Number(pageSize),
    PageIndex: Number(pageIndex),
  };

  const fetchProductsSec = async (data) => {
    setLoading(true);
    try {
      const productsData =
        activeTab === 1
          ? await getUserAdSell(data)
          : activeTab === 2
          ? await getUserAdBuy(data)
          : [];
      if (productsData?.type === "error") {
        Toast.fire({
          icon: "error",
          title: productsData.message,
        });
        return;
      }
      setProductList(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setProductList([]);
    fetchProductsSec(orginalData);
  }, [searchParams]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center mb-6 gap-4">
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

        <div className="flex flex-wrap items-center ">
         
          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <div
              onClick={() => {
                if (activeTab !== 1) {
                  setLoading(true);
                }
                dispatch(setActiveTab(1));
                router.replace("/used?tab=1");
              }}
              className={` cursor-pointer text-white rounded-lg  p-3 flex flex-col items-center justify-start gap-2 relative z-50 duration-300 h-44 ${
                activeTab === 1 ? "bg-amber-500" : "bg-amber-400"
              }`}
            >
              {/* <img className="w-20" src="/images/gallery/image11.jpg" alt="" /> */}
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
            {/* arrow */}
            {activeTab === 1 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-amber-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <div
              onClick={() => {
                if (activeTab !== 2) {
                  setLoading(true);
                }
                dispatch(setActiveTab(2));
                router.replace("/used?tab=2");
              }}
              className={` cursor-pointer text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44 ${
                activeTab === 2 ? "bg-teal-500" : "bg-teal-400"
              }`}
            >
              {/* <img className="w-20" src="/images/gallery/image11.jpg" alt="" /> */}
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
            {/* arrow */}
            {activeTab === 2 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-teal-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

           <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <div
              onClick={() => {
                // if (activeTab !== 3) {
                //   setLoading(true);
                // }
                // dispatch(setActiveTab(3));
                router.push("/products?conditionId=20&orderby=2");
              }}
              className={` cursor-pointer text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44 ${
                activeTab === 3 ? "bg-[#720807]" : "bg-[#8c1413]"
              }`}
            >
              {/* <img className="w-20" src="/images/gallery/image11.jpg" alt="" /> */}
              <div className="used-icon-thumb icon1 ">
                <span></span>
              </div>
              <span className="font-bold sm:text-lg whitespace-nowrap">
                پیشنهادات افرنگ
              </span>
            </div>
            {/* arrow */}
            {activeTab === 3 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-[#720807] left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

          <div className="sm:px-3 px-1 py-3 sm:w-1/2 lg:w-1/4 w-1/2 relative">
            <div
              onClick={() => {
                if (activeTab !== 4) {
                  setLoading(true);
                }
                dispatch(setActiveTab(4));
                router.replace("/used?tab=4");
              }}
              className={` cursor-pointer text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 h-44 ${
                activeTab === 4 ? "bg-blue-500" : "bg-blue-400"
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
            {/* arrow */}
            {activeTab === 4 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-blue-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>
        </div>
        <Divider style={{ marginBottom: 0, paddingBottom: 0 }} />
        {activeTab === 1 && (
          <BoxSellSec productList={productList} loading={loading} />
        )}
        {activeTab === 2 && (
          <BoxBuySec productList={productList} loading={loading} />
        )}
      </div>
    </>
  );
}

export default BodyUserAdd;
