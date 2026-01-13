"use client";

import { SlBasket } from "react-icons/sl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Divider } from "antd";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import ProductMainPhotoLazy from "./ProductMainPhotoLazy";
import ProductMainPhotoNoLazy from "./ProductMainPhotoNoLazy";

export default function ProductMain({ products, noLazy }) {
  return (
    <>
      <div className="sm:min-h-[22rem] min-h-[23rem]">
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
            1724: {
              slidesPerView: 7,
              slidesPerGroup: 7,
              spaceBetween: 15,
            },
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
                <div className="relative group w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
                  {/* تصویر */}
                  {noLazy ? (
                    <ProductMainPhotoNoLazy product={product} />
                  ) : (
                    <ProductMainPhotoLazy product={product} />
                  )}

                  {/* محتوا */}
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    {/* عنوان */}
                    <Link
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer min-h-[70px] flex items-start"
                    >
                      <h3 className="text-justify line-clamp-3 w-full">
                        {product.title}
                      </h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    {/* قیمت */}
                    <div className="h-[4.5rem] px-2 duration-300">
                      {!product.callPriceButton && product.finalPrice !== 0 && (
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300 group-hover:text-lg ">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333] font-semibold text-sm line-through">
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
                    <div className="">
                      {product.canAddCart ? (
                        <div className="bg-[#d1182b] w-full flex justify-center items-center !text-white cursor-pointer hover:bg-[#40768c] font-bold duration-300 absolute bottom-0 sm:translate-y-[90%] group-hover:translate-y-[0%]">
                          <AddToCartButtonCard productId={product.productId} />
                        </div>
                      ) : (
                        <div className="bg-[#e1e1e1] w-full flex justify-center items-center py-2 font-bold duration-300 absolute bottom-0 sm:translate-y-full group-hover:translate-y-[0%] cursor-not-allowed">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#333]">
                            {product.statusTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* تخفیف */}
                  {product.discount !== 0 && product.showOffPercent && (
                    <div className="absolute top-3 left-3 z-50 duration-300">
                      <span className="bg-[#d1182b] !text-white rounded-md px-3 py-1 ">
                        {product.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}

          <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="custom-prev bg-[#ddd] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretRight className="text-2xl cursor-pointer " />
            </div>
            <div className=" custom-next bg-[#ddd] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretLeft className="text-2xl cursor-pointer" />
            </div>
          </div>
        </Swiper>
      </div>
    </>
  );
}
