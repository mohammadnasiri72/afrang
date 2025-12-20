"use client";

import Link from "next/link";
import { FaArrowRight, FaSearch } from "react-icons/fa";

export default function NotFoundBlogPost() {
  return (
    <>
      <div className="bg-[#f6f6f6] flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
          <div className="!mb-8">
            <FaSearch className="w-16 h-16 text-gray-400 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 !mb-4">
            مطلب مورد نظر یافت نشد
          </h1>
          <p className="text-gray-600 !mb-6">
            متأسفانه مطلبی با این شناسه در وبلاگ وجود ندارد. ممکن است مطلب حذف
            شده یا آدرس اشتباه باشد.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blogs"
              className="flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
            >
              <FaArrowRight className="rotate-180" />
              بازگشت به وبلاگ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
