"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
          <div className="!mb-8">
            <Image
              src="/images/404.png"
              alt="404 Illustration"
              width={256}
              height={256}
              className="mx-auto"
              priority
            />
          </div>
          <span className="text-4xl font-bold text-gray-800 !mb-4">
            صفحه مورد نظر یافت نشد
          </span>
          <p className="text-gray-600 !mb-8">
            متأسفانه صفحه ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </>
  );
}
