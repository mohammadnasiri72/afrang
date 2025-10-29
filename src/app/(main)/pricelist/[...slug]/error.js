"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import Loading from "../loading";

export default function Error({ error, reset }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    console.error("Price list error:", error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message?.includes("NetworkError")) {
      return "مشکل در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
    }
    if (error.message?.includes("404")) {
      return "دسته‌بندی مورد نظر یافت نشد.";
    }
    if (error.message?.includes("500")) {
      return "خطای سرور. لطفاً کمی بعد دوباره تلاش کنید.";
    }
    return "متأسفانه در دریافت اطلاعات از سرور مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="text-center">
          <div className="w-24 h-24 !mb-4 mx-auto">
            <svg
              className="w-full h-full text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 !mb-4">
            خطا در بارگذاری اطلاعات
          </h2>
          <p className="text-gray-600 !mb-6">{getErrorMessage()}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-2 bg-[#18d1be] !text-white rounded-lg hover:bg-[#15b8a7] transition-colors"
            >
              تلاش مجدد
            </button>
            <Link
              href="/"
              onClick={(ev) => {
                ev.preventDefault();
                startTransition(() => {
                  router.push("/");
                });
              }}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}
