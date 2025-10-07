"use client";

import { SlBasket } from "react-icons/sl";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import { Pagination, Navigation } from "swiper/modules";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

export default function ProductSuchSlider() {
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
        {Array(8)
          .fill(null)
          .map((e, i) => (
            <SwiperSlide key={i}>
              <div className="w-full p-2">
                <div className="relative rounded-lg group overflow-hidden">
                  <div className="absolute top-3 left-3 z-50 duration-300">
                    <span className="bg-[#d1182b] !text-white rounded-md px-3 py-1 ">
                      20%
                    </span>
                  </div>
                  <div>
                    <img
                      className="group-hover:scale-110 scale-100 duration-1000 w-full"
                      style={{ filter: " brightness(0.95)" }}
                      src="/images/gallery/image11.jpg"
                      alt=""
                    />
                  </div>
                 
                  <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                    دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی
                    متر DC III
                  </p>
                  <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300">
                    <span className="font-bold text-lg text-[#333]">
                      15,000,000 تومان
                    </span>
                    <span className="text-[#333a] font-semibold text-lg line-through">
                      18,000,000
                    </span>
                  </div>
                  <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300">
                    <span className="font-bold text-lg text-[#333]">
                      15,000,000 تومان
                    </span>
                    <span className="text-[#333a] font-semibold text-lg line-through">
                      18,000,000
                    </span>
                  </div>
                  <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 !text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-teal-500 font-bold">
                    <SlBasket className="text-xl" />
                    <span className="px-1">افزودن به سبد خرید</span>
                  </div>
                  <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center py-2 !text-white rounded-b-lg  duration-300 cursor-pointer hover:bg-teal-500 font-bold">
                    <SlBasket className="text-xl" />
                    <span className="px-1">افزودن به سبد خرید</span>
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
