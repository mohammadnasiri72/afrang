"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

const BreadcrumbComponent = ({ items }) => {
  // گرفتن آخرین آیتم از آرایه
  const lastItem = items[items.length - 1];
  
  // ساخت آرایه جدید با دو آیتم: خانه و آخرین آیتم
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
          خانه
        </Link>
      ),
    },
    {
      title: lastItem.href ? (
        <Link href={lastItem.href} className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
          {lastItem.title}
        </Link>
      ) : (
        <span className="text-[#d1182b] font-[Yekan]">{lastItem.title}</span>
      ),
    },
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
};

export default BreadcrumbComponent; 