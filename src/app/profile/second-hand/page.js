"use client";

import { Segmented, Empty } from "antd";
import { useState } from "react";
import { FaRecycle } from "react-icons/fa";
import Buy from "@/components/profile/second-hand/Buy";
import Sell from "@/components/profile/second-hand/Sell";

const SecondHand = () => {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    { label: "خرید", value: 0 },
    { label: "فروش ", value: 1 },
  ];

 

  

  return (
    <>
      <style jsx global>{`
        .SegmentedProduct .ant-segmented {
          background-color: #ebebeb;
        }
        .SegmentedProduct .ant-segmented-item {
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 8px;
          padding-bottom: 8px;
          margin-right: 10px !important;
          margin-left: 10px !important;
          width: 100%;
          font-weight: 600 !important;
          font-size: 14px;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected {
          background-color: #fff !important;
          color: #d1182b !important;
          border-radius: 6px;
          font-weight: 900 !important;
          font-size: 16px !important;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected:hover {
          color: #d1182b !important;
        }
        .SegmentedProduct .ant-segmented-thumb {
          background-color: #fff !important;
          font-weight: 900 !important;
        }
        /* حالت جمع و جورتر در sticky */
        .SegmentedProduct.sticky .ant-segmented-item {
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 12px;
          margin-right: 4px !important;
          margin-left: 4px !important;
        }
        .SegmentedProduct.sticky .ant-segmented-item-selected {
          font-size: 13px !important;
          border-radius: 4px;
        }
      `}</style>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <div className="flex items-center gap-2 mb-6">
          <FaRecycle className="text-gray-800 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">کالای دسته دوم</h1>
        </div>

        <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
          <div className="w-full SegmentedProduct !overflow-hidden mx-auto flex justify-center">
            <Segmented
              className="font-semibold text-3xl w-full !overflow-auto"
              dir="rtl"
              style={{
                padding: "8px",
                fontFamily: "yekan",
                width: "100%",
              }}
              value={activeTab}
              onChange={(value) => setActiveTab(value)}
              options={options}
            />
          </div>

          <div className="w-full">
            {activeTab === 0 ? <Buy /> : <Sell />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondHand;
