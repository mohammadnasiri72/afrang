"use client";

import React, { useRef, useState } from "react";

function SpecificationsProduct({ product }) {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);

  return (
    <>
      {product.properties.length > 0 && (
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
      )}
    </>
  );
}

export default SpecificationsProduct;
