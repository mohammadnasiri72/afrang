"use client";

import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaArrowRight, FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function Error({ error, reset }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
          <div className="!mb-8">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto" />
          </div>
          <span className="text-4xl font-bold text-gray-800 !mb-4">خطای سرور</span>
          <p className="text-gray-600 !mb-4">
            متأسفانه مشکلی در سرور رخ داده است. لطفاً دوباره تلاش کنید.
          </p>
          <p className="text-sm text-gray-500 !mb-8">
            {error?.message || "خطای ناشناخته"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 bg-gray-200 !text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <FaArrowRight className="rotate-180" />
              تلاش مجدد
            </button>
            <Link
              onClick={(ev) => {
                ev.preventDefault();
                startTransition(() => {
                  router.push("/");
                });
              }}
              href="/"
              className="flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
            >
              <FaHome />
              صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}
