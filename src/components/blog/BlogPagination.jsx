"use client";

import { Pagination, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "../Loading";

const BlogPagination = ({ blogs, searchParams: initialSearchParams , startTransition}) => {
  const pathname = usePathname();
  const router = useRouter();

  const createPageURL = (page) => {
    const params = new URLSearchParams(initialSearchParams);

    if (page !== 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page) => {
    const url = createPageURL(page);
     startTransition(() => {
       router.push(url, { scroll: false });
      });
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (size) => {
    const params = new URLSearchParams(initialSearchParams);

    if (size !== 12) {
      params.set("pageSize", size.toString());
    } else {
      params.delete("pageSize");
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    
    
  };

  // تابع برای رندر کردن لینک‌های واقعی
  const itemRender = (current, type, originalElement) => {
    if (type === "page") {
      return (
        <Link href={createPageURL(current)} passHref legacyBehavior>
          <a
            rel="follow"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(current);
            }}
            className="ant-pagination-item-link"
          >
            {current}
          </a>
        </Link>
      );
    }

    return originalElement;
  };

  const page = Number(initialSearchParams?.page) || 1;
  const pageSize = Number(initialSearchParams?.pageSize) || 12;

  return (
    <>
      {blogs[0]?.total > pageSize && (
        <div
          dir="ltr"
          className="relative z-50 w-full flex justify-center py-3 sm:flex-row flex-col-reverse items-center"
        >
          <div className="flex items-center">
            <span className="sm:mt-0 mt-3 select-none">{`مجموع ${blogs[0]?.total} آیتم`}</span>
            <div className="flex items-center mt-3 sm:hidden ">
              <Select
                value={pageSize}
                style={{ width: 55 }}
                onChange={handlePageSizeChange}
                options={[
                  { value: 12, label: "12" },
                  { value: 24, label: "24" },
                  { value: 50, label: "50" },
                  { value: 100, label: "100" },
                ]}
              />
              <span className="px-1">: تعداد در هر صفحه </span>
            </div>
          </div>

          <Pagination
            current={page}
            total={blogs[0]?.total}
            pageSize={pageSize}
            onChange={handlePageChange}
            itemRender={itemRender}
            showSizeChanger={false}
            pageSizeOptions={[12, 24, 50, 100]}
            defaultPageSize={12}
          />

          <div className="sm:flex hidden items-center">
            <Select
              value={pageSize}
              style={{ width: 55 }}
              onChange={handlePageSizeChange}
              options={[
                { value: 12, label: "12" },
                { value: 24, label: "24" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
            />
            <span className="px-1">: تعداد در هر صفحه </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPagination;
