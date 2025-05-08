"use client";

import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function ErrorAuth() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">خطا در احراز هویت</h1>
        <p className="text-gray-600 mb-6">
          متأسفانه مشکلی در فرآیند احراز هویت رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaHome />
            صفحه اصلی
          </Link>
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 bg-[#d1182b] text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors cursor-pointer"
          >
            <FaRedo />
            تلاش مجدد
          </button>
        </div>
      </div>
    </div>
  );
}