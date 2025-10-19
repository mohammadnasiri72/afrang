// components/ServerError.tsx
"use client";

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100">
        {/* آیکون و لوگو */}
        <div className="mb-8">
          <div className="relative flex flex-col items-center">
            {/* لوگو */}
            <div className="w-24 h-16 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="لوگو"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
            {/* تصویر خطای سرور */}
            <div className="w-32 h-32 mt-6 flex items-center justify-center">
              <img
                src="/images/server-error.png"
                alt="خطای سرور"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* متن */}
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            خطا در اتصال به سرور
          </h1>

          <div className="space-y-3">
            <p className="text-gray-600 leading-relaxed">
              متأسفانه در حال حاضر سرور پاسخگو نیست
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              این مشکل موقتی است، لطفاً چند دقیقه دیگر مجدداً تلاش کنید
            </p>
          </div>
        </div>

        {/* دکمه اقدام */}
        <div className="mb-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer !text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="font-medium">تلاش مجدد</span>
          </button>
        </div>

        {/* اطلاعات فنی */}
        <div className="pt-6 border-t border-gray-200">
          <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-sm font-mono">کد خطا: 503</span>
          </div>
          <p className="text-gray-400 text-xs mt-3">Service Unavailable</p>
        </div>
      </div>
    </div>
  );
}
