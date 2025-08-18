"use client";


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl } from "@/utils/mainDomain";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import ShowUserContact from "./ShowUserContact";



export default function ProductMainUser({ products }) {
 

  


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
              <div className="relative group w-full pb-2 overflow-hidden rounded-xl bg-white shadow-md">
                <Link
                  href={product.url}
                  className="w-full min-h-40 sm:min-h-40 flex items-center justify-center bg-[#fff] overflow-hidden relative"
                >
                  <Image
                    className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain`}
                    src={getImageUrl(product.image)}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                  />

                  <div className="absolute top-2 right-2 bg-[#fff] border border-[#40768c] text-[#40768c] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                    دست دوم کاربران
                  </div>
                </Link>
                <div className="flex flex-col flex-1 justify-between mt-2">
                  <Link
                    href={product.url}
                    className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer flex items-start"
                  >
                    <h3 className="text-justify line-clamp-1 w-full font-bold text-[16px]">
                      {product.title}
                    </h3>
                  </Link>
                  <Divider style={{ margin: 5, padding: 0 }} />

                  <div className="px-2 duration-300">
                    {product.price !== 0 && (
                      <div className="flex flex-col">
                        <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300">
                          {product.price.toLocaleString()} تومان
                        </span>
                      </div>
                    )}
                    {product.price === 0 && (
                      <span className="font-bold text-base text-[#333]">
                        توافقی (تماس بگیرید)
                      </span>
                    )}
                  </div>
                </div>
                {/* <ShowUserContact product={product}/> */}
                
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
