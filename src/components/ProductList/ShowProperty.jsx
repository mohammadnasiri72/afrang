"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";

function ShowProperty({product}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
    
      {/* <ul className="list-disc text-[#444] px-4 leading-6">
        {product.property.map((item, index) => (
          <li
            key={index}
            className={`list-disc transition-all duration-500 marker:text-[#888] marker:text-lg align-middle ${
              index < 3 || showMore
                ? "opacity-100 translate-y-0 h-auto visible max-h-10"
                : "opacity-0 -translate-y-2 invisible max-h-0"
            }`}
          >
            {item}
          </li>
        ))}
      </ul> */}
      <div className="mt-5 flex justify-between items-center">
        <div
          onClick={() => {
            setShowMore((e) => !e);
          }}
          className="flex items-center cursor-pointer group px-2"
        >
          <span className="group-hover:text-[#18d1be] text-[#40768c] duration-300 font-semibold">
            {showMore ? "بستن ویژگی ها" : " همه ویژگی ها"}
          </span>
          <img
            style={{ rotate: showMore ? "90deg" : "0deg" }}
            className="-translate-x-1 group-hover:translate-x-0 duration-300"
            src="/images/icons/Arrow-Left.png"
            alt=""
          />
        </div>
        <Link href={`${product.url}`} className="flex items-center cursor-pointer group">
          <FaEye className="text-[#d1182b]" />
          <span className="group-hover:text-[#d1182b] duration-300 px-2 font-semibold">
            نمایش سریع
          </span>
        </Link>
      </div>
    </>
  );
}

export default ShowProperty;
