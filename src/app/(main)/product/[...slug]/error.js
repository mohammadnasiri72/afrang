"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-20 z-50 relative">
      <div className="xl:px-16">
        <div className="bg-white rounded-lg p-8 text-center max-w-2xl mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            خطا در بارگذاری محصول
          </h1>
          <p className="text-gray-600 mb-6">
            متأسفانه در بارگذاری اطلاعات محصول مشکلی پیش آمده است.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/products"
              className="bg-gray-500 !text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              بازگشت به لیست محصولات
            </Link>
            <Link
              href="/"
              className="bg-blue-500 !text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>اگر مشکل همچنان ادامه دارد، لطفاً با پشتیبانی تماس بگیرید.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
