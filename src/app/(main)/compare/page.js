"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ComparePage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="py-20 bg-gray-50 flex items-center justify-center z-50 relative">
          <div className="text-center">
            <div className="text-6xl text-gray-300 !mb-4">⚖️</div>
            <h1 className="text-2xl font-bold text-gray-700 !mb-2">
              محصولی برای مقایسه یافت نشد
            </h1>
            <p className="text-gray-500 !mb-6">
              محصولاتی را برای مقایسه انتخاب کنید
            </p>
            <Link
              href="/products"
              className="bg-blue-500 !text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors !mt-5"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparePage;
