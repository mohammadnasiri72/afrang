'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 text-center max-w-2xl w-full">
            <div className="text-red-500 text-6xl mb-4">🚨</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              خطای غیرمنتظره
            </h1>
            <p className="text-gray-600 mb-6">
              متأسفانه مشکلی غیرمنتظره در سیستم پیش آمده است.
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
              <p className="mb-2">لطفاً:</p>
              <ul className="text-right space-y-1">
                <li>• صفحه را بارگذاری مجدد کنید</li>
                <li>• مرورگر خود را ببندید و دوباره باز کنید</li>
                <li>• کش مرورگر را پاک کنید</li>
                <li>• اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید</li>
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
                href="/" 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>کد خطا: {error?.name || 'UNKNOWN_ERROR'}</p>
              <p>زمان: {new Date().toLocaleString('fa-IR')}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
