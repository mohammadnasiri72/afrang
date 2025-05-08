"use client";

import { SlBasket } from "react-icons/sl";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useEffect } from "react";
import { mainDomainImg } from "@/utils/mainDomain";
import Link from "next/link";

export default function ProductMain({ products }) {
  // useEffect(() => {
  //   if (products) {
  //     console.log(products);
  //   }
  // }, [products]);
  return (
    <>
      <Swiper
        loop={true}
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
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          100: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        }}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative group w-full h-[25rem] overflow-hidden rounded-lg bg-white">
                <div className="">
                  {product.discount !== 0 && (
                    <div className="absolute top-3 left-3 z-50 duration-300">
                      <span className="bg-[#d1182b] text-white rounded-md px-3 py-1 ">
                        {product.discount}%
                      </span>
                    </div>
                  )}
                  <Link href={product.url}>
                    <img
                      className="group-hover:scale-110 scale-100 duration-1000 w-full h-56 object-cover"
                      style={{ filter: " brightness(0.95)" }}
                      src={mainDomainImg + product.image}
                      // src="/images/gallery/image11.jpg"
                      alt={product.title}
                    />
                  </Link>
                  <div className="p-4">
                    {/* <div className="sm:flex hidden justify-center gap-2 group-hover:-translate-y-1/2 translate-y-0 duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">22</span>
                        <span className="pr-1">ساعت</span>
                      </div>
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">11</span>
                        <span className="pr-1">دقیقه</span>
                      </div>
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">15</span>
                        <span className="pr-1">ثانیه</span>
                      </div>
                    </div>
                    <div className="sm:hidden flex justify-center gap-2 -translate-y-1/2 duration-300  opacity-100">
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">22</span>
                        <span className="pr-1">ساعت</span>
                      </div>
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">11</span>
                        <span className="pr-1">دقیقه</span>
                      </div>
                      <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
                        <span className="text-[#d1182b] font-semibold">15</span>
                        <span className="pr-1">ثانیه</span>
                      </div>
                    </div> */}
                    <Link
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer"
                    >
                      {product.title}
                    </Link>
                    {
                      !product.callPriceButton && product.finalPrice !== 0 &&
                      <div>
                        <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through">
                              {product.price1.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through">
                              {product.price1.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    }
                    {
                      !product.callPriceButton && product.finalPrice === 0 &&
                      <div>
                        <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            بدون قیمت
                          </span>

                        </div>
                        <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            بدون قیمت
                          </span>

                        </div>
                      </div>
                    }
                    {
                      product.callPriceButton &&
                      <div>
                        <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            تماس بگیرید
                          </span>

                        </div>
                        <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            تماس بگیرید
                          </span>

                        </div>
                      </div>
                    }

                    {
                      product.canAddCart &&
                      <div>
                        <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-teal-500 font-bold">
                          <SlBasket className="text-xl" />
                          <span className="px-1">افزودن به سبد خرید</span>
                        </div>
                        <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center py-2 text-white rounded-b-lg  duration-300 cursor-pointer hover:bg-teal-500 font-bold absolute">
                          <SlBasket className="text-xl" />
                          <span className="px-1">افزودن به سبد خرید</span>
                        </div>
                      </div>
                    }
                    {
                      !product.canAddCart &&
                      <div>
                        <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute font-bold">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#666]">موجود نیست</span>
                        </div>
                        <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center py-2 text-white rounded-b-lg  duration-300 font-bold absolute">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#666]">موجود نیست</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
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
