"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProgressButton from "./ProgressButton";

const TransactionResult = ({ status }) => {
  // حالت‌های ممکن: 'success', 'failed'
  const [transactionStatus] = useState(status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        scale: { type: "spring", visualDuration: 1, bounce: 0.3 },
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 relative z-50">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
          {/* هدر با رنگ متغیر بر اساس وضعیت */}
          <div
            className={`py-5 ${
              transactionStatus === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <h1 className="text-white text-center text-2xl font-bold">
              {transactionStatus === "success"
                ? "تراکنش موفق"
                : "تراکنش ناموفق"}
            </h1>
          </div>

          <div className="p-6">
            {/* آیکون وضعیت */}
            <div className="flex justify-center my-6">
              <div
                className={`rounded-full p-4 ${
                  transactionStatus === "success"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {transactionStatus === "success" ? (
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                )}
              </div>
            </div>

            {/* پیام وضعیت */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {transactionStatus === "success"
                  ? "پرداخت شما با موفقیت انجام شد"
                  : "متاسفانه پرداخت انجام نشد"}
              </h2>
              <p className="text-gray-600 mt-2">
                {transactionStatus === "success"
                  ? "رسید پرداخت به ایمیل شما ارسال گردید"
                  : "لطفاً مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید"}
              </p>
            </div>

            {/* دکمه‌های اقدام */}
            {/* <div className="flex flex-col gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg font-medium transition-colors">
                بازگشت به صفحه اصلی
              </button>
            </div> */}
            <ProgressButton />
          </div>

          {/* فوتر */}
          <div className="bg-gray-100 p-4 text-center text-sm text-gray-500">
            <p>در صورت بروز مشکل با پشتیبانی تماس بگیرید: ۶۱۹۳-۰۲۱</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionResult;
