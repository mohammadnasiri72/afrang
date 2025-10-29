// components/compare/ComparePageSkeleton.jsx
"use client";

import { Divider, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const ComparePageSkeleton = () => {
  const [columnsCount, setColumnsCount] = useState(4);

  // تابع برای محاسبه تعداد ستون‌ها بر اساس عرض صفحه
  const updateColumnsCount = () => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    if (width < 768) {
      setColumnsCount(2); // موبایل: 2 ستون
    } else if (width < 1024) {
      setColumnsCount(3); // تبلت: 3 ستون
    } else {
      setColumnsCount(4); // دسکتاپ: 4 ستون
    }
  };

  useEffect(() => {
    updateColumnsCount();
    window.addEventListener("resize", updateColumnsCount);

    return () => {
      window.removeEventListener("resize", updateColumnsCount);
    };
  }, []);

  // محاسبه عرض هر ستون
  const columnWidth = `calc(${100 / columnsCount}% - 12px)`;

  // اسکلتون برای محصولات
  const ProductSkeleton = () => (
    <div
      className="bg-white rounded-lg shadow-lg flex flex-col items-center relative border border-gray-100 transition-all duration-200"
      style={{
        width: columnWidth,
        minWidth: columnWidth,
        flex: `0 0 ${columnWidth}`,
      }}
    >
      {/* دکمه حذف اسکلتون */}
      <Skeleton
        variant="circular"
        width={32}
        height={32}
        className="absolute top-2 left-2"
      />

      {/* عکس و عنوان */}
      <div className="w-full">
        <div className="flex flex-col items-center w-full p-3">
          {/* عکس محصول */}
          <Skeleton
            variant="rectangular"
            width={80}
            height={80}
            className="rounded-lg mx-auto"
          />

          {/* عنوان و قیمت */}
          <div className="bg-white w-full mt-3">
            <Skeleton
              variant="text"
              width="90%"
              height={20}
              className="mx-auto mb-2"
            />
            <Skeleton
              variant="text"
              width="70%"
              height={18}
              className="mx-auto mb-3"
            />
            {/* دکمه افزودن به سبد خرید */}
            <Skeleton
              variant="rounded"
              width="100%"
              height={36}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // اسکلتون برای ویژگی‌ها
  const PropertySkeleton = () => (
    <div className="w-full">
      {/* عنوان ویژگی */}
      <Skeleton variant="text" width={120} height={28} className="mb-2 mr-5" />

      <div className="w-full flex gap-3 pb-2">
        {/* مقادیر ویژگی برای هر محصول */}
        {[...Array(columnsCount)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: columnWidth,
              minWidth: columnWidth,
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={48}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <Divider style={{ margin: 5, padding: 5 }} />
    </div>
  );

  // اسکلتون برای دکمه اضافه کردن محصول
  const AddProductSkeleton = () => (
    <div
      className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative"
      style={{
        width: columnWidth,
        minWidth: columnWidth,
        flex: `0 0 ${columnWidth}`,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full py-2">
        <Skeleton variant="circular" width={48} height={48} className="mb-2" />
        <Skeleton variant="text" width={100} height={20} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* هدر اسکلتون - محصولات */}
        <div className="flex gap-3 pb-2 bg-white">
          {/* محصولات اسکلتون */}
          {[...Array(Math.min(columnsCount, 4))].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}

          {/* دکمه اضافه کردن اسکلتون (اگر جای خالی وجود دارد) */}
          {columnsCount > 2 && <AddProductSkeleton />}
        </div>

        {/* ویژگی‌های اسکلتون */}
        <div className="w-full mt-4">
          {[...Array(6)].map((_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>

        {/* پیام اسکلتون برای محصولات hidden شده */}
        <div className="w-full mt-6">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ComparePageSkeleton;
