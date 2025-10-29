"use client";

import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function ErrorProductList() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-[#f6f6f6] flex flex-col items-center justify-center px-4 py-10 ">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
          <div className="!mb-8">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 !mb-4">
            خطا در نمایش محصولات
          </h1>
          <p className="text-gray-600 !mb-6">
            متأسفانه مشکلی در نمایش لیست محصولات رخ داده است. لطفاً دوباره تلاش
            کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              onClick={(ev) => {
                ev.preventDefault();
                startTransition(() => {
                  router.push("/");
                });
              }}
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <FaHome />
              صفحه اصلی
            </Link>
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors cursor-pointer"
            >
              <FaRedo />
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}
