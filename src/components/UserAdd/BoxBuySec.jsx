"use client";
import { Pagination, Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShowInfoContact from "./ShowInfoContact";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      const updateSize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };
  
      // اجرا در ابتدا
      updateSize();
  
      // اجرا در هر بار resize شدن
      window.addEventListener("resize", updateSize);
  
      // پاک‌سازی event موقع unmount شدن
      return () => window.removeEventListener("resize", updateSize);
    }
  }, [breakpoint]);

  return isMobile;
}

function BoxBuySec({ productList }) {
  const [viewMode, setViewMode] = useState("list");

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const orderBy = searchParams.get("orderby") || "1";
  const pageIndex = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    } else {
      setViewMode("list");
    }
  }, [isMobile]);

  // کامپوننت محصول برای حالت لیست
  const ProductListItem = ({ product }) => (
    <div className="border border-gray-200 rounded-lg p-4 !mb-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-[#d1182b] !mb-3">
        {product.nickname}
      </h3>
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 !mb-1">
            <span className="font-[YekanEn,sans-serif]! line-height-font-yekanEn">{product.title}</span>
          </h3>
          <p className="text-sm text-gray-600 !mb-2">{product.categoryTitle}</p>
        </div>
      </div>
      <div className="flex items-start py-2 text-xs text-gray-600 gap-1">
        <span className="text-black font-bold whitespace-nowrap">
          توضیحات :
        </span>
        <p className="text-justify">
          {product.description ? product.description : "توضیحاتی ثبت نشده"}
        </p>
      </div>
      <div className="mt-2">
        <ShowInfoContact id={product.id} />
      </div>
    </div>
  );

  // کامپوننت محصول برای حالت گرید
  const ProductGridItem = ({ product }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-[#d1182b] !mb-3">
        {product.nickname}
      </h3>
      <h3 className="text-base font-semibold text-gray-900 !mb-2 line-clamp-2">
        <span className="font-[YekanEn,sans-serif]! line-height-font-yekanEn">{product.title}</span>
      </h3>
      <p className="text-sm text-gray-600 !mb-2">{product.categoryTitle}</p>
      <div className="flex flex-col items-start py-2 text-xs text-gray-600 gap-1">
        <span className="text-black font-bold whitespace-nowrap">
          توضیحات :
        </span>
        <p className="text-justify">
          {product.description ? product.description : "توضیحاتی ثبت نشده"}
        </p>
      </div>
      <ShowInfoContact id={product.id} />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with view toggle */}
      <div className="flex justify-between items-center !mb-4">
        <div className="flex flex-wrap items-center sm:gap-10 gap-1">
          <div className="flex items-center gap-2">
            <label className={` text-gray-700 text-sm font-bold`}>
              نمایش بر اساس :
            </label>
            <Select
              value={Number(orderBy)}
              onChange={(value) => {
                params.set("orderby", value);
                params.delete("page");
                router.push(`${window.location.pathname}?${params.toString()}`);
              }}
              className="sm:w-36 w-28"
              options={[
                { value: 1, label: "جدیدترین" },
                { value: 11, label: "قدیمی‌ترین" },
              ]}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className={` text-gray-700 text-sm font-bold`}>
              تعداد در صفحه :
            </label>
            <Select
              value={Number(pageSize)}
              onChange={(value) => {
                params.set("pageSize", value);
                params.delete("page");
                router.push(`${window.location.pathname}?${params.toString()}`);
              }}
              className="sm:w-20 w-14"
              options={[
                { value: 20, label: "20" },
                { value: 40, label: "40" },
                { value: 60, label: "60" },
                { value: 80, label: "80" },
              ]}
            />
          </div>
        </div>

      
      </div>

      {/* Products container */}
      {productList.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto !mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 !mb-2">
            محصولی یافت نشد
          </h3>
          <p className="text-gray-600">
            در حال حاضر محصول دست دومی برای نمایش وجود ندارد.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : ""
          }
        >
          {productList.map((product) => (
            <div key={product.id} data-id={product.id}>
              {viewMode === "list" ? (
                <ProductListItem product={product} />
              ) : (
                <ProductGridItem product={product} />
              )}
            </div>
          ))}
        </div>
      )}
      {productList.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={Number(pageIndex)}
            onChange={(value) => {
              params.set("page", value);
              router.push(`${window.location.pathname}?${params.toString()}`);
            }}
            total={productList[0].total}
            pageSize={Number(pageSize)}
            showSizeChanger={false}
            className="rtl"
            showLessItems
          />
        </div>
      )}
    </div>
  );
}

export default BoxBuySec;
