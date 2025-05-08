"use client";

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";

const BlogPagination = ({ current, total, pageSize }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [localPage, setLocalPage] = useState(current);
  const [localPageSize, setLocalPageSize] = useState(pageSize);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (localPage !== 1) {
      params.set("page", localPage);
    }

    if (localPageSize !== 12) {
      params.set("pageSize", localPageSize);
    }

    if (category) {
      params.set("category", category);
    }

    router.push(`/news?${params.toString()}`, { scroll: false });
  }, [localPage, localPageSize, router]);

  const handlePageChange = useCallback((page) => {
    setLocalPage(page);
  }, []);

  const handlePageSizeChange = useCallback((_, size) => {
    setLocalPageSize(size);
    setLocalPage(1);
  }, []);

  return (
    <>
      {total > pageSize && (
        <div
          dir="ltr"
          className="relative z-50 w-full flex justify-center py-3 sm:flex-row flex-col-reverse items-center"
        >
          <span className="sm:mt-0 mt-3 select-none">{`مجموع ${total} آیتم`}</span>
          <Pagination
            current={localPage}
            total={total}
            pageSize={localPageSize}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={[12, 24, 50, 100]}
            defaultPageSize={12}
          />
        </div>
      )}
    </>
  );
};

export default BlogPagination;
