"use client";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ProgressButton from "./ProgressButton";

const TransactionResult = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("success");
  const msg = searchParams.get("msg");

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
              status === "true" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <h1 className="text-white text-center text-2xl font-bold">
              {status === "true" ? "تراکنش موفق" : "تراکنش ناموفق"}
            </h1>
          </div>

          <div className="p-6">
            {/* آیکون وضعیت */}
            <div className="flex justify-center my-6">
              <div
                className={`rounded-full p-4 ${
                  status === "true"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {status === "true" ? (
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
                {status === "true"
                  ? "پرداخت شما با موفقیت انجام شد"
                  : "متاسفانه پرداخت انجام نشد"}
              </h2>
              <p className="text-gray-600 mt-2">{msg}</p>
            </div>

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
