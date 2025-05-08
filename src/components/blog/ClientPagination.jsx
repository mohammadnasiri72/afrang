"use client";

import { Pagination } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useRef } from "react";

const ClientPagination = ({ current, total, pageSize }) => {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  const handlePageChange = useCallback((page, size) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      params.set('page', page);
      if (size !== pageSize) {
        params.set('pageSize', size);
      }
      
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }, 300); // 300ms debounce
  }, [router, pathname, pageSize]);

  return (
    <div dir="ltr" className="relative z-50">
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[6, 12, 20, 50, 100]}
        showTotal={(total) => `مجموع ${total} آیتم`}
        defaultPageSize={6}
      />
    </div>
  );
};

export default ClientPagination; 