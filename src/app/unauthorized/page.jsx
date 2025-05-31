"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaArrowRight, FaUserLock } from "react-icons/fa";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center z-50 relative">
        <div className="mb-8">
          <FaUserLock className="w-16 h-16 text-blue-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">احراز هویت ناموفق</h1>
        <p className="text-gray-600 mb-8">
          برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaArrowRight className="rotate-180" />
            ورود به حساب
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#d1182b] text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
          >
            <FaHome />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
} 