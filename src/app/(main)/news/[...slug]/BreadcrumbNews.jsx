"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

const BreadcrumbNews = ({ breadcrumb }) => {
  if (!breadcrumb || !breadcrumb.length) return null;

  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="!text-black hover:text-[#d1182b] font-[Yekan]">
          خانه
        </Link>
      ),
    },
    ...breadcrumb.map((item, index) => ({
      title: item.href ? (
        <Link
          href={item.href}
          className="!text-black hover:text-[#d1182b] font-[Yekan]"
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
        separator={
          <span className="text-black mx-2 text-xs font-[Yekan]">&gt;</span>
        }
        className="font-[Yekan]"
      />
    </div>
  );
};

export default BreadcrumbNews;
