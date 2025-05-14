"use client";
import { Segmented, Steps } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function HeaderCard() {
  
  const pathname = usePathname();
  const isCompleteinfosend = pathname.includes("infosend");
  const isCompleteinfopay = pathname.includes("infopay");
  const isCompletepayment = pathname.includes("order");

  return (
    <>
      {/* <div className="bg-[#ebebeb] my-3 py-2 flex justify-center SegmentedCard">
        <div className="w-60">
          <Segmented
            className="font-semibold text-3xl w-full"
            dir="ltr"
            style={{
              padding: 0,
              fontFamily: "yekan",
            }}
            value={typeArticle}
            onChange={(e) => {
              setTypeArticle(e);
            }}
            options={["خرید بعدی", "سبد خرید"]}
          />
        </div>
      </div> */}
      <div className="flex flex-wrap items-center justify-center py-10">
        {/* <div className="md:w-1/3 w-full flex gap-3 text-lg font-semibold md:justify-start justify-center">
          <span>سبد خرید</span>
          <span className="text-[#888]"> {items.length} مرسوله</span>
        </div> */}

        <div className="md:w-1/2 w-full md:mt-0 mt-4">
          <Steps
            direction="horizontal"
            responsive={false}
            items={[
              {
                title: "سبد خرید",
                description: "انتخاب محصولات",
                status: "finish",
                icon: <FaShoppingCart className="text-red-600 text-2xl" />,
              },
              {
                title: "اطلاعات ارسال",
                description: "اطلاعات ارسال",
                status: (isCompleteinfopay || isCompleteinfosend || isCompletepayment) ? "finish" : "wait",
                icon: <FaMapMarkerAlt className={`text-2xl ${(isCompleteinfosend || isCompleteinfopay || isCompletepayment) ? "text-red-600" : ""}`} />,
              },
              {
                title: "اطلاعات پرداخت",
                description: "اطلاعات پرداخت",
                status: (isCompleteinfopay || isCompletepayment) ? "finish" : "wait",
                icon: <FaCreditCard className={`text-2xl ${(isCompleteinfopay || isCompletepayment) ? "text-red-600" : ""}`} />,
              },
              {
                title: "پرداخت و اتمام",
                description: "پرداخت و اتمام",
                status: isCompletepayment ? "finish" : "wait",
                icon: <FaCheckCircle className={`text-2xl ${isCompletepayment ? "text-red-600" : ""}`} />,
              },
            ]}
          />
        </div>
      </div>

      <style jsx global>{`
        .ant-steps-item-title {
          font-size: 12px !important;
          margin-top: -10px !important;
          text-align: center !important;
        }
        .ant-steps-item-description {
          font-size: 11px !important;
          text-align: center !important;
          margin-top: 1px !important;
        }
        .ant-steps-item-icon {
          width: 40px !important;
          height: 40px !important;
          line-height: 40px !important;
        }
        .ant-steps-item-content {
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }
        .ant-steps-item-tail {
          top: 20px !important;
          width: 100% !important;
          padding: 0 !important;
        }
        .ant-steps-item-tail::after {
          height: 3px !important;
          width: 100% !important;
        }
        .ant-steps-item {
          flex: 1 !important;
          text-align: center !important;
        }
      `}</style>
    </>
  );
}

export default HeaderCard;
