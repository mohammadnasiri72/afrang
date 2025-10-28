"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "./Loading";

function BreadcrumbMain({ breadcrumb }) {
  const lastItem = breadcrumb[breadcrumb.length - 1];

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Check if breadcrumb exists and has data
  if (!breadcrumb || !Array.isArray(breadcrumb) || breadcrumb.length === 0) {
    return (
      <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
        <div className="flex items-center space-x-2 !text-gray-800">
          <Link
            href="/"
            className="!text-gray-800 hover:!text-[#d1182b] font-[Yekan]"
          >
            خانه
          </Link>
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
          onClick={(ev) => {
            ev.preventDefault();
            startTransition(() => {
              router.push("/");
            });
          }}
          className="!text-gray-800 hover:!text-[#d1182b] font-[Yekan]"
        >
          خانه
        </Link>
      ),
    },
    // تبدیل داده‌های دریافتی به فرمت مورد نیاز کامپوننت Breadcrumb
    ...breadcrumb
      .slice(0, -1)
      .filter((ev) => ev.href && ev.href !== "#")
      .map((item) => ({
        title: item.href ? (
          <Link
            href={item.href}
            onClick={(ev) => {
              ev.preventDefault();
              startTransition(() => {
                router.push(item.href);
              });
            }}
            className="!text-gray-800 hover:!text-[#d1182b] font-[Yekan]"
          >
            {item.title}
          </Link>
        ) : (
          <span className="!text-[#d1182b] font-[Yekan]">{item.title}</span>
        ),
      })),

    {
      // آیتم آخر همیشه آخر است
      title: (
        <span className="text-[#d1182b] font-[Yekan]">{lastItem.title}</span>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white py-2 px-5 rounded-lg xl:px-16">
        <Breadcrumb
          items={breadcrumbItems}
          separator={
            <span className="!text-gray-700 mx-2 text-xs font-[Yekan]">
              &gt;
            </span>
          }
          className="font-[Yekan]"
        />
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default BreadcrumbMain;
