"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaArrowRight, FaLock } from "react-icons/fa";

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <FaLock className="w-16 h-16 text-yellow-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">دسترسی غیرمجاز</h1>
        <p className="text-gray-600 mb-8">
          متأسفانه شما دسترسی لازم برای مشاهده این صفحه را ندارید.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-gray-200 !text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaArrowRight className="rotate-180" />
            بازگشت
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
          >
            <FaHome />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
} 