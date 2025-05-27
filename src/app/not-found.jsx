"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
        <div className="mb-8">
          <Image
            src="/images/gallery/404.png"
            alt="404 Illustration"
            width={256}
            height={256}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">صفحه مورد نظر یافت نشد</h1>
        <p className="text-gray-600 mb-8">
          متأسفانه صفحه ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <FaArrowRight className="rotate-180" />
            بازگشت
          </button>
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