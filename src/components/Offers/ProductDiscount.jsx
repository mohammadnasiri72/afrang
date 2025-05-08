import React from "react";
import { SlBasket } from "react-icons/sl";

function ProductDiscount() {
  return (
    <>
      <div className="flex flex-wrap mt-10 sm:px-16 px-2">
        {new Array(20).fill(null).map((item, index) => (
          <div key={index} className="sm:w-1/2 md:w-1/3 lg:w-1/5 w-full">
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-3 left-3 z-50 duration-300">
                  <span className="bg-[#d1182b] text-white rounded-md px-3 py-1 ">
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
                <div className="sm:flex hidden justify-center gap-2 group-hover:-translate-y-1/2 translate-y-0 duration-300 opacity-0 group-hover:opacity-100">
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
                </div>
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
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
                <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
                <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center py-2 text-white rounded-b-lg  duration-300 cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductDiscount;
