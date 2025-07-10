"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

function BreadcrumbNavProduct({ breadcrumb }) {
  if (!breadcrumb?.length) return null;

  const breadcrumbItems = [
    {
      // آیتم خانه همیشه اول مسیر است
      title: (
        <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
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
              ? "text-[#d1182b]" 
              : "text-gray-500 hover:text-[#d1182b]"
          }`}
        >
          {item.title}
        </Link>
      ) : (
        <span className="text-[#d1182b] font-[Yekan]">{item.title}</span>
      ),
    })),
  ];

  return (
    <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
      <Breadcrumb
        items={breadcrumbItems}
        separator={<span className="text-gray-400 mx-2 text-xs font-[Yekan]">&gt;</span>}
        className="font-[Yekan]"
      />
    </div>
  );
}

export default BreadcrumbNavProduct;