"use client";
import React from "react";
import { Pagination, Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

function PaginationProduct({ total }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("pageSize")) || 20;

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size) => {
    const params = new URLSearchParams(searchParams);
    if (size === 20) {
      params.delete("pageSize");
    } else {
      params.set("pageSize", size);
    }
    // Reset to first page when changing page size
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      dir="ltr"
      className="flex md:flex-row flex-col-reverse justify-center items-center mt-8 relative z-50"
    >
      <span className="font-semibold md:mt-0 mt-3">
        مجموع <span className="text-lg">{total}</span> محصول
      </span>
      <div className="md:mt-0 mt-3">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={currentPageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="rtl"
          showLessItems
        />
      </div>
      <div className="flex items-center gap-2 pl-2">
        <Select
          value={currentPageSize}
          onChange={handlePageSizeChange}
          options={[
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 30, label: "30" },
            { value: 50, label: "50" },
          ]}
          className="w-16"
        />
        <span>: تعداد در هر صفحه </span>
      </div>
    </div>
  );
}

export default PaginationProduct;
