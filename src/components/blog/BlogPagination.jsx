"use client";

import { setLoadingBlog } from "@/redux/slices/blogSlice";
import { Pagination, Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BlogPagination = ({ blogs }) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(setLoadingBlog(true));
    const params = new URLSearchParams(searchParams);

    if (page !== 1) {
      params.set("page", page);
      router.push(`?${params.toString()}`);
    } else {
      params.delete("page");
      router.push(`?${params.toString()}`);
    }
  };

  const handlePageSizeChange = (size) => {
    dispatch(setLoadingBlog(true));
    const params = new URLSearchParams(searchParams);
    if (size !== 12) {
      params.set("pageSize", size);
      params.delete("page");
      router.push(`?${params.toString()}`);
    } else {
      params.delete("pageSize");
      params.delete("page");
      router.push(`?${params.toString()}`);
    }
  };

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 12;

  return (
    <>
      {blogs[0]?.total > pageSize && (
        <div
          dir="ltr"
          className="relative z-50 w-full flex justify-center py-3 sm:flex-row flex-col-reverse items-center"
        >
          <span className="sm:mt-0 mt-3 select-none">{`مجموع ${blogs[0]?.total} آیتم`}</span>

          <Pagination
            current={page}
            total={blogs[0]?.total}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            pageSizeOptions={[12, 24, 50, 100]}
            defaultPageSize={12}
          />
          <div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPagination;
