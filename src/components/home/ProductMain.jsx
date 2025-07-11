"use client";

import { SlBasket } from "react-icons/sl";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl2 } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import CountdownTimer from "./CountdownTimer";
import { FaRecycle } from "react-icons/fa";

export default function ProductMain({ products }) {
  return (
    <>
      <Swiper
        // loop={true}
        grabCursor={true}
        modules={[Pagination, Navigation]}
        className="mySwiperProduct"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
        }}
        speed={1000}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 10,
          },
          850: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 8,
          },
          100: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
          },
        }}
      >
        {products &&
          products.map((product, index) => (
            <SwiperSlide
              key={`${product.id || product.productId || index}-${index}`}
            >
              <div className="relative group w-full sm:h-[28rem] h-[25rem] overflow-hidden rounded-xl bg-white shadow-md flex flex-col">
                {/* تصویر */}
                <Link
                  href={product.url}
                  className="w-full h-40 sm:h-56 flex items-center justify-center bg-[#fafbfc]"
                >
                  <img
                    className="group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain"
                    src={getImageUrl2(product.image)}
                    alt={product.title}
                  />
                </Link>
                {/* محتوا */}
                <div className="flex flex-col flex-1 justify-between">
                  {/* تایمر */}
                  {product.salePlanTimer && (
                    <CountdownTimer targetDate={product.salePlanTimer} />
                  )}
                  {/* عنوان */}
                  <Link
                    href={product.url}
                    className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer min-h-[48px] flex items-center"
                  >
                    <p className="text-justify line-clamp-2 w-full">
                      {product.title}
                    </p>
                  </Link>
                  {/* کالای کارکرده */}
                  <div className="h-6 flex items-center mt-1 mb-2 px-2">
                    {product.conditionId === 20 && (
                      <div className="flex items-center text-xs text-[#d1182b]">
                        <FaRecycle className="ml-1.5" />
                        <span className="font-semibold whitespace-nowrap">
                          کالای کارکرده
                        </span>
                      </div>
                    )}
                  </div>
                  {/* قیمت */}
                  <div className="h-10  px-2 group-hover:opacity-100 group-hover:sm:opacity-0 duration-300 group-hover:visible group-hover:sm:invisible">
                    {!product.callPriceButton && product.finalPrice !== 0 && (
                      <div className="flex flex-col">
                        <span className="font-bold text-base text-[#333] whitespace-nowrap">
                          {product.finalPrice.toLocaleString()} تومان
                        </span>
                        {product.discount !== 0 && (
                          <span className="text-[#333a] font-semibold text-sm line-through">
                            {product.price1.toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                    {!product.callPriceButton && product.finalPrice === 0 && (
                      <span className="font-bold text-base text-[#333]">
                        بدون قیمت
                      </span>
                    )}
                    {product.callPriceButton && (
                      <span className="font-bold text-base text-[#333]">
                        تماس بگیرید
                      </span>
                    )}
                  </div>
                  {/* دکمه افزودن به سبد یا وضعیت */}
                  <div className="mt-2 ">
                    {product.canAddCart ? (
                      <div className="bg-[#d1182b] w-full flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-[#40768c] font-bold duration-300 sm:absolute relative bottom-0 sm:translate-y-[90%] group-hover:translate-y-[0%]">
                        <AddToCartButtonCard productId={product.productId} />
                      </div>
                    ) : (
                      <div className="bg-[#e1e1e1] w-full flex justify-center items-center py-2 rounded-lg font-bold">
                        <SlBasket className="text-xl text-[#333]" />
                        <span className="px-1 text-[#666]">
                          {product.statusDesc}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* تخفیف */}
                {product.discount !== 0 && (
                  <div className="absolute top-3 left-3 z-50 duration-300">
                    <span className="bg-[#d1182b] text-white rounded-md px-3 py-1 ">
                      {product.discount}%
                    </span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}

        <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
          <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretRight className="text-2xl cursor-pointer " />
          </div>
          <div className=" custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretLeft className="text-2xl cursor-pointer" />
          </div>
        </div>
      </Swiper>
    </>
  );
}
