"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

function BreadcrumbNav({ items = [] }) {
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#d1182b]">
          <FaHome className="text-lg" />
          <span>خانه</span>
        </Link>
      ),
    },
    ...items.map((item, index) => ({
      title: item.href ? (
        <Link href={item.href} className="text-gray-500 hover:text-[#d1182b]">
          {item.title}
        </Link>
      ) : (
        <span className="text-[#d1182b]">{item.title}</span>
      ),
    })),
  ];

  return (
    <div className="bg-white py-4 px-5 rounded-lg">
      <Breadcrumb
        items={breadcrumbItems}
        separator={<span className="text-gray-400 mx-2">/</span>}
      />
    </div>
  );
}

export default BreadcrumbNav; 