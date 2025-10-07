"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

function BreadcrumbNavProduct({ breadcrumb }) {
  

 

  // Check if breadcrumb exists and has data
  if (!breadcrumb || !Array.isArray(breadcrumb) || breadcrumb.length === 0) {
    return (
      <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
        <div className="flex items-center space-x-2 !text-gray-800">
          <Link href="/" className="!text-gray-800 hover:!text-[#d1182b] font-[Yekan]">
            خانه
          </Link>
          <span className="!text-gray-700 mx-2 text-xs font-[Yekan]">&gt;</span>
          <span className="!text-[#d1182b] font-[Yekan]">محصول</span>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    {
      // آیتم خانه همیشه اول مسیر است
      title: (
        <Link
          href="/"
          className="!text-gray-800 hover:!text-[#d1182b] font-[Yekan]"
        >
          خانه
        </Link>
      ),
    },
    // تبدیل داده‌های دریافتی به فرمت مورد نیاز کامپوننت Breadcrumb
    ...breadcrumb.map((item) => ({
      title: item.href ? (
        <Link
          href={item.href}
          className={`font-[Yekan] !text-xs ${
            item.format === "selftext"
              ? "!text-[#d1182b]"
              : "!text-gray-800 hover:text-[#d1182b]"
          }`}
        >
          {item.title}
        </Link>
      ) : (
        <span className="!text-[#d1182b] font-[Yekan]">{item.title}</span>
      ),
    })),
  ];

  return (
    <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
      <Breadcrumb
        items={breadcrumbItems}
        separator={
          <span className="!text-gray-700 mx-2 text-xs font-[Yekan]">&gt;</span>
        }
        className="font-[Yekan]"
      />
    </div>
  );
}

export default BreadcrumbNavProduct;
