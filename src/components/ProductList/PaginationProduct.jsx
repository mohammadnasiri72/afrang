"use client";
import { setFilterLoading } from "@/redux/features/filterLoadingSlice";
import { Pagination, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

function PaginationProduct({ total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("pageSize")) || 20;
  const dispatch = useDispatch();

  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page) => {
    dispatch(setFilterLoading(true));
    const url = createPageURL(page);
    router.push(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          >
            {current}
          </a>
        </Link>
      );
    }

    return originalElement;
  };

  return (
    <>
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
            itemRender={itemRender}
            showSizeChanger={false}
            className="rtl"
            // showPrevNextJumpers={false}
            // showQuickJumper={false}
            // showLessItems
            // responsive={true}
          />
        </div>
      </div>
      <style jsx global>{`
        .ant-pagination-item {
          padding: 0 !important;
          margin-left: 2px !important;
          margin-right: 2px !important;
        }
        .ant-pagination-jump-prev {
          padding: 0 !important;
          margin-left: 2px !important;
          margin-right: 2px !important;
        }
        .ant-pagination-jump-next {
          padding: 0 !important;
          margin-left: 2px !important;
          margin-right: 2px !important;
        }
      `}</style>
    </>
  );
}

export default PaginationProduct;
