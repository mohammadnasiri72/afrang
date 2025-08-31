'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-20">
      <div className="xl:px-16">
        <div className="bg-white rounded-lg p-8 text-center max-w-2xl mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            خطا در بارگذاری محصول
          </h1>
          <p className="text-gray-600 mb-6">
            متأسفانه در بارگذاری اطلاعات محصول مشکلی پیش آمده است.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
              <p className="mb-2 font-semibold">جزئیات خطا (فقط در حالت توسعه):</p>
              <details className="text-right">
                <summary className="cursor-pointer text-[#d1182b]">
                  نمایش جزئیات
                </summary>
                <pre className="mt-2 text-xs text-left overflow-auto bg-gray-200 p-2 rounded">
                  {error.message}
                  <br />
                  {error.stack}
                </pre>
              </details>
            </div>
          )}
          
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
            <p className="mb-2">ممکن است:</p>
            <ul className="text-right space-y-1">
              <li>• محصول مورد نظر وجود نداشته باشد</li>
              <li>• مشکلی در ارتباط با سرور پیش آمده باشد</li>
              <li>• آدرس وارد شده صحیح نباشد</li>
              <li>• مشکلی در بارگذاری داده‌ها پیش آمده باشد</li>
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={reset}
              className="bg-[#d1182b] text-white px-6 py-3 rounded-lg hover:bg-[#b31414] transition-colors"
            >
              تلاش مجدد
            </button>
            <Link 
              href="/products" 
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              بازگشت به لیست محصولات
            </Link>
            <Link 
              href="/" 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
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
