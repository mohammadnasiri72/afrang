"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { FaFileAlt } from "react-icons/fa";

function DetailsProduct({ product }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            توضیحاتی ثبت نشده!
          </h3>
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
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.product.body }}
        />
      </div>
    </>
  );
}

export default DetailsProduct;
