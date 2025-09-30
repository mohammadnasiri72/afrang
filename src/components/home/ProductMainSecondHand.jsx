"use client";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";


import { getImageUrl2 } from "@/utils/mainDomain";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AddToCartButton from "../ProductList/AddToCartButton";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";

export default function ProductMainSecondHand({ oldProducts }) {
 
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        grabCursor={true}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={2000}
        className="mySwiperProduct2"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          100: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        }}
      >
        {oldProducts &&
          oldProducts.map((oldProduct) => (
            <SwiperSlide key={oldProduct.id}>
              <div className="w-full p-2">
                <div className="relative rounded-lg group overflow-hidden bg-white">
                  <div className="p-4">
                    <img
                      className="duration-1000 w-full"
                      style={{ filter: " brightness(0.95)" }}
                      src={getImageUrl2(oldProduct.image)}
                      alt=""
                    />
                  </div>

                  <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                    {oldProduct.title}
                  </p>
                  <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                    <span className="font-bold text-lg text-[#333]">
                      {oldProduct.finalPrice.toLocaleString()} تومان
                    </span>
                    <span className="text-[#333a] font-semibold text-lg line-through">
                      {oldProduct.price1.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                    <SlBasket className="text-xl" />
                    <span className="px-1">افزودن به سبد خرید</span>
                  </div> */}
                  {oldProduct.canAddCart && (
                    <div>
                      <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-[#40768c] font-bold">
                        {/* <SlBasket className="text-xl" />
                          <span className="px-1">افزودن به سبد خرید</span> */}
                        <AddToCartButtonCard productId={oldProduct.productId} />
                      </div>
                      <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center text-white rounded-b-lg  duration-300 cursor-pointer hover:bg-[#40768c] font-bold absolute">
                        <AddToCartButton productId={oldProduct.productId} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        {/* <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden bg-white">
                
                <div className="p-4">
                  <img
                    className="duration-1000 w-full"
                    style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/image11.jpg"
                    alt=""
                  />
                </div>
               
                <p className="mt-10 text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer">
                  دوربین دیجیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر
                  DC III
                </p>
                <div className="flex justify-between items-center p-2 mt-3 opacity-100 sm:group-hover:opacity-0 duration-300">
                  <span className="font-bold text-lg text-[#333]">
                    15,000,000 تومان
                  </span>
                  <span className="text-[#333a] font-semibold text-lg line-through">
                    18,000,000
                  </span>
                </div>
                <div className="bg-[#40768c] bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center py-3 text-white rounded-b-lg sm:translate-y-[90%] sm:group-hover:translate-y-0 duration-300 sm:absolute cursor-pointer hover:bg-teal-500 font-bold">
                  <SlBasket className="text-xl" />
                  <span className="px-1">افزودن به سبد خرید</span>
                </div>
              </div>
            </div>
          </SwiperSlide> */}

        <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
          <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#40768c] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretRight className="text-2xl cursor-pointer" />
          </div>
          <div className=" custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#40768c] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretLeft className="text-2xl cursor-pointer" />
          </div>
        </div>
      </Swiper>
      
    </>
  );
}
