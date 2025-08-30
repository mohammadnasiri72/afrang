"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

function BreadcrumbNav({ breadcrumb }) {
  if (!breadcrumb?.length) return null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    {
      title: (
        <Link
          href="/"
          className="text-gray-500 hover:text-[#d1182b] font-[Yekan]"
        >
          خانه
        </Link>
      ),
    },
    ...breadcrumb.map((item) => ({
      title: item.href ? (
        <Link
          href={item.href}
          className="text-gray-500 hover:text-[#d1182b] font-[Yekan]"
        >
          {item.title}
        </Link>
      ) : (
        <span className="text-[#d1182b] font-[Yekan]">{item.title}</span>
      ),
    })),
  ];

  return (
    <>
      {mounted && (
        <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
          <Breadcrumb
            items={items}
            separator={
              <span className="text-gray-400 mx-2 text-xs font-[Yekan]">
                &gt;
              </span>
            }
            className="font-[Yekan] whitespace-nowrap min-w-full flex"
          />
        </div>
      )}
    </>
  );
}

export default BreadcrumbNav;
