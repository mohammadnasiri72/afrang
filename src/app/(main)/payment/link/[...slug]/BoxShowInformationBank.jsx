"use client";

import {
  addLinkPaymentInfo,
  getLinkPaymentInfo,
  smsPaymentAlert,
} from "@/services/payment/paymentLink";
import { message } from "antd";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaExclamationTriangle,
  FaMobile,
  FaMoneyBillWave,
  FaReceipt,
  FaUser,
} from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import Swal from "sweetalert2";

// تنظیمات نوتیفیکیشن
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

// کامپوننت اسکلتون
const PaymentSkeleton = () => (
  <div className="flex justify-center pt-3">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md border border-gray-200 animate-pulse">
      <div className="bg-gray-300 h-16"></div>
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mt-2"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

// کامپوننت خطا
const PaymentNotFound = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center p-8 text-center"
  >
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      className="mb-4"
    >
      <div className="relative">
        <FaReceipt className="text-6xl text-gray-300 mb-2" />
        <FaExclamationTriangle className="text-2xl text-amber-500 absolute -top-1 -right-1" />
      </div>
    </motion.div>

    <motion.h3
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl font-semibold text-gray-700 !mb-2"
    >
      اطلاعات پرداخت یافت نشد
    </motion.h3>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-gray-500 text-sm !mb-6 max-w-sm"
    >
      ممکن است لینک پرداخت معتبر نباشد یا اطلاعات حذف شده باشد
    </motion.p>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.reload()}
      className="flex gap-2 cursor-pointer items-center space-x-2 space-x-reverse bg-blue-500 hover:bg-blue-600 !text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      <TbRefresh className="text-sm" />
      <span>تلاش مجدد</span>
    </motion.button>
  </motion.div>
);

function BoxShowInformationBank({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
 

  const fetchLinkPaymentInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getLinkPaymentInfo(id);
      if (response) {
        setPaymentInfo(response);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "خطا در دریافت اطلاعات پرداخت",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const response = await addLinkPaymentInfo(id);
      if (response) {
        window.location.href = response.url;
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "خطا در اتصال به درگاه پرداخت",
      });
      setIsPaying(false);
    }
  };

  const handleSMS = async () => {
    try {
      const response = await smsPaymentAlert(id);
      
      if (response.response.status === 200) {
        message.success("پیامک با موفقیت ارسال شد");
      } else {
        message.error("خطا در ارسال پیامک");
      }
    } catch (error) {
      message.error("خطا در ارسال پیامک");
      setIsPaying(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  useEffect(() => {
    fetchLinkPaymentInfo();
  }, []);

  if (isLoading) {
    return <PaymentSkeleton />;
  }

  if (!paymentInfo) {
    return <PaymentNotFound />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center p-3 z-50 relative"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md border border-gray-200">
        {/* هدر */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-4">
          <div className="flex items-center justify-center space-x-2 space-x-reverse gap-2">
            <FaCreditCard className="text-white text-lg" />
            <span className="text-white text-xl font-bold">لینک پرداخت</span>
          </div>
        </div>

        <div className="p-4">
          {/* اطلاعات کاربر */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <FaUser className="text-blue-500 text-sm" />
              <span className="text-gray-600 text-sm">پرداخت کننده</span>
              <span className="font-semibold text-gray-800 text-sm mr-auto">
                {paymentInfo.name}
              </span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <FaMobile className="text-blue-500 text-sm" />
              <span className="text-gray-600 text-sm">شماره موبایل</span>
              <span
                onClick={handleSMS}
                className="font-semibold text-gray-800 text-sm mr-auto"
              >
                {paymentInfo.mobile}
              </span>
            </div>
          </div>

          {/* اطلاعات مالی */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">مبلغ کل</span>
              <span className="font-bold text-gray-800">
                {formatPrice(paymentInfo.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">پرداخت شده</span>
              <span className="font-semibold text-green-600">
                {formatPrice(paymentInfo.totalPayment)}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">مانده</span>
              <span className="font-semibold text-orange-600">
                {formatPrice(paymentInfo.remain)}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 bg-blue-100 rounded-lg px-3 mt-3">
              <div className="flex items-center space-x-2 space-x-reverse gap-2">
                <FaMoneyBillWave className="text-blue-500" />
                <span className="font-semibold text-gray-700">قابل پرداخت</span>
              </div>
              <span className="font-bold text-lg text-blue-600">
                {formatPrice(paymentInfo.amountToPayment)}
              </span>
            </div>
          </div>

          {/* وضعیت پرداخت */}
          <div
            className={`rounded-lg p-2 mb-4 text-center ${
              paymentInfo.statusId === 5725
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            <span className="font-semibold text-sm">
              وضعیت : {paymentInfo.statusTitle}
            </span>
          </div>

          {/* توضیحات پرداخت */}
          {paymentInfo.desc && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
              {paymentInfo.desc}
            </div>
          )}

          {/* دکمه پرداخت */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isPaying || paymentInfo.amountToPayment === 0}
            className={`w-full cursor-pointer py-2.5 rounded-lg font-bold !text-white text-base transition-all duration-200 ${
              isPaying || paymentInfo.amountToPayment === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md"
            }`}
          >
            {isPaying ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                در حال انتقال...
              </div>
            ) : paymentInfo.amountToPayment === 0 ? (
              "پرداخت شده"
            ) : (
              "پرداخت آنلاین"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default BoxShowInformationBank;
