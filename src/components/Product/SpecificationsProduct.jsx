"use client";

import React, { useRef, useState, useEffect } from "react";
import { Skeleton } from "antd";
import { FaClipboardList } from "react-icons/fa";

function SpecificationsProduct({ product }) {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    // شبیه‌سازی زمان لودینگ برای نمایش اسکلتون
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="mt-5 px-5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="mt-3">
            <Skeleton.Input active block className="!h-14" />
          </div>
        ))}
      </div>
    );
  }

  if (!product.properties || product.properties.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-[#f3f3f3] p-8 rounded-lg text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <FaClipboardList className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">مشخصاتی ثبت نشده!</h2>
          <p className="text-gray-600">
            در حال حاضر مشخصات فنی برای این محصول ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          maxHeight: showMore
            ? `${contentRef.current?.scrollHeight}px`
            : "230px",
        }}
        className="mt-5 w-full overflow-hidden duration-500 px-5"
      >
        {product.properties.map((property) => (
          <div
            key={property.key}
            className="bg-[#f3f3f3] w-full py-3 px-6 flex items-center mt-3"
          >
            <div className="w-1/2">{property.key}</div>
            <div className="w-1/2 font-semibold">{property.value}</div>
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          setShowMore((e) => !e);
        }}
        className="flex items-center cursor-pointer group mt-3 py-4 px-7"
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
    </div>
  );
}

export default SpecificationsProduct;
