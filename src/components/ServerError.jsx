// components/ServerError.tsx
"use client";

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function ServerError() {
  const [countdown, setCountdown] = useState(30);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.reload();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoRefreshEnabled]);

  const handleManualRefresh = () => {
    window.location.reload();
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefreshEnabled(!isAutoRefreshEnabled);
    if (!isAutoRefreshEnabled) {
      setCountdown(30);
    }
  };

  // محاسبه درصد برای progress
  const progressValue = (countdown / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100">
        {/* آیکون و لوگو */}
        <div className="!mb-8">
          <div className="relative flex flex-col items-center">
            {/* لوگو */}
            <div className="w-24 h-16 flex items-center justify-center">
              <img
                src="/public/images/logo.png"
                alt="لوگو"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
            {/* تصویر خطای سرور */}
            <div className="w-32 h-32 mt-6 flex items-center justify-center">
              <img
                src="/public/images/server-error.png"
                alt="خطای سرور"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* متن */}
        <div className="space-y-4 !mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            خطا در اتصال به سرور
          </h1>

          <div className="space-y-3">
            <p className="text-gray-600 leading-relaxed">
              متأسفانه در حال حاضر سرور پاسخگو نیست
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              این مشکل موقتی است، لطفاً چند دقیقه دیگر مجدداً تلاش کنید
            </p>
          </div>
        </div>

        {/* دکمه اقدام با تایمر */}
        <div className="!mb-6 space-y-3">
          <button
            onClick={handleManualRefresh}
            disabled={!isAutoRefreshEnabled && countdown > 0}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer !text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Progress Circular - جایگزین آیکون */}
            <div className="relative flex items-center justify-center">
              <CircularProgress
                variant="determinate"
                value={progressValue}
                size={28}
                thickness={4}
                sx={{
                  color: "rgba(255,255,255,0.3)",
                  position: "absolute",
                }}
              />
              <CircularProgress
                variant="determinate"
                value={100}
                size={28}
                thickness={4}
                sx={{
                  color: "rgba(255,255,255,0.1)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {countdown}
                </span>
              </div>
            </div>

            <span className="font-medium">
              {isAutoRefreshEnabled
                ? "تلاش مجدد"
                : countdown > 0
                ? "غیرفعال شده"
                : "تلاش مجدد"}
            </span>
          </button>
        </div>

        {/* اطلاعات فنی */}
        <div className="pt-6 border-t border-gray-200">
          <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-mono">کد خطا: 503</span>
          </div>
          <p className="text-gray-400 text-xs mt-3">Service Unavailable</p>
        </div>
      </div>
    </div>
  );
}
