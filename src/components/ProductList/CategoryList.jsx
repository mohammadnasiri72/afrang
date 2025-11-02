"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import Loading from "../Loading";

export default function CategoryList({ categories }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (categories.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4 relative z-50">
          <div className="flex justify-center !mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <h2 className="text-2xl font-bold !mb-4 text-gray-800">
            دسته‌بندی یافت نشد!
          </h2>
          <p className="text-gray-600 !mb-6">
            متأسفانه در حال حاضر دسته‌بندی‌ای برای نمایش وجود ندارد.
          </p>
          <Link
            href="/"
            onClick={(ev) => {
                ev.preventDefault();
                startTransition(() => {
                  router.push("/");
                });
              }}
            className="bg-[#d1182b] !text-white px-6 py-2 rounded-md hover:bg-[#b31525] transition-colors duration-300"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold !mb-8 text-center">
          دسته‌بندی‌های محصولات
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  router.push(category.url + "?OrderBy=5");
                });
              }}
              key={category.id}
              href={category.url + "?OrderBy=5"}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 z-50 relative group"
            >
              <div className="flex flex-col items-center text-center">
                {category.image && (
                  <div className="bg-gray-600 p-10 rounded-full !mb-4 group-hover:bg-[#d1182b] transition-colors duration-300 shadow-sm flex items-center justify-center">
                    <Image
                      src={getImageUrl(category.image)}
                      alt={category.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold !mb-2 group-hover:text-[#d1182b] transition-colors duration-300">
                  {category.title}
                </h2>
                {category.count > 0 && (
                  <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full group-hover:bg-[#d1182b]/10 transition-colors duration-300">
                    {category.count} محصول
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}
