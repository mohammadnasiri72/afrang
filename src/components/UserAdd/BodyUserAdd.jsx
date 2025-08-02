"use client";

import { Divider } from "antd";
import { useState } from "react";
import { FaRecycle } from "react-icons/fa";
import BoxBuySec from "./BoxBuySec";
import BoxSellSec from "./BoxSellSec";

function BodyUserAdd() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <div className="flex items-center gap-2 mb-6">
          <FaRecycle className="text-gray-800 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">کالای دسته دوم</h1>
        </div>

        <div className="flex flex-wrap items-center ">
          <div className="p-3 sm:w-1/2 lg:w-1/4 w-full relative">
            <div
              onClick={() => setActiveTab(1)}
              className={` cursor-pointer text-white rounded-lg  p-3 flex flex-col items-center justify-start gap-2 relative z-50 duration-300 ${
                activeTab === 1 ? "bg-amber-500" : "bg-amber-400"
              }`}
            >
              {/* <img className="w-20" src="/images/gallery/image11.jpg" alt="" /> */}
              <div className="used-icon-thumb icon2 ">
              <span></span>
              </div>
              <span className="font-bold text-lg whitespace-nowrap">پیشنهادات فروش</span>
              <span className="font-semibold text-lg whitespace-nowrap">دست دوم کاربران</span>
            </div>
            {/* arrow */}
            {activeTab === 1 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-amber-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>

          <div className="p-3 sm:w-1/2 lg:w-1/4 w-full relative">
            <div
              onClick={() => setActiveTab(2)}
              className={` cursor-pointer text-white rounded-lg p-3 flex flex-col items-center justify-start gap-2 relative z-50 ${
                activeTab === 2 ? "bg-teal-500" : "bg-teal-400"
              }`}
            >
              {/* <img className="w-20" src="/images/gallery/image11.jpg" alt="" /> */}
               <div className="used-icon-thumb icon3 ">
              <span></span>
              </div>
              <span className="font-bold text-lg whitespace-nowrap">پیشنهادات خرید</span>
              <span className="font-semibold text-lg whitespace-nowrap">دست دوم کاربران</span>
            </div>
            {/* arrow */}
            {activeTab === 2 && (
              <div className="absolute w-10 h-10 rounded-sm bottom-0 bg-teal-500 left-1/2 -translate-x-1/2 rotate-45"></div>
            )}
          </div>
        </div>
        <Divider style={{ marginBottom: 0, paddingBottom: 0 }} />
        {activeTab === 1 && <BoxSellSec />}
        {activeTab === 2 && <BoxBuySec />}
      </div>
    </>
  );
}

export default BodyUserAdd;
