"use client";

import { useRef, useState, useEffect } from "react";
import { Skeleton } from "antd";
import { FaFileAlt } from "react-icons/fa";

function DetailsProduct({ product }) {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    // شبیه‌سازی زمان لودینگ
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-9 px-7">
        <Skeleton active paragraph={{ rows: 2 }} />
        <div className="mt-4">
          <Skeleton.Image active className="!w-full !h-48" />
        </div>
        <div className="mt-4">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  }

  if (!product?.product?.body) {
    return (
      <div className="py-9 px-7">
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <FaFileAlt className="text-6xl text-[#d1182b] opacity-80" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">توضیحاتی ثبت نشده!</h3>
          <p className="text-gray-600 text-center">
            در حال حاضر توضیحات تکمیلی برای این محصول ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-9 px-7">
        <div
          ref={contentRef}
          style={{
            maxHeight: showMore
              ? `${contentRef.current?.scrollHeight}px`
              : '230px',
          }}
          className="overflow-hidden duration-500"
          dangerouslySetInnerHTML={{ __html: product.product.body }}
        />
        
        {contentRef.current && contentRef.current.scrollHeight > 230 && (
          <div
            onClick={() => setShowMore(prev => !prev)}
            className="flex items-center cursor-pointer group mt-3 px-2"
          >
            <span className="group-hover:text-[#18d1be] text-[#40768c] duration-300 font-semibold">
              {showMore ? "نمایش کمتر" : "نمایش بیشتر"}
            </span>
            <img
              style={{ rotate: showMore ? "90deg" : "0deg" }}
              className="-translate-x-1 group-hover:translate-x-0 duration-300"
              src="/images/icons/Arrow-Left.png"
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DetailsProduct;
