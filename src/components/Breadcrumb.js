"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

const BreadcrumbComponent = ({ items }) => {
  const breadcrumbItems = items.map((item) => ({
    title: item.href ? (
      <Link href={item.href} className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
        {item.title}
      </Link>
    ) : (
      <span className="text-[#d1182b] font-[Yekan]">{item.title}</span>
    ),
  }));

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