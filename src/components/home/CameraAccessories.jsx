"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function CameraAccessories({ category }) {


  return (
    <>
      <div className="box-slider-CameraAccessories pt-16 pb-48 mt-3">
        <div className="sm:px-16 px-2">
          <Swiper
            // loop={true}
            grabCursor={true}
            modules={[Pagination]}
            className="mySwiperCamera"
            pagination={{
              clickable: true,
            }}
            speed={1000}
            breakpoints={{
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              100: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
            }}
          >
            {
              category.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={item.url} className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                      <div className="w-[50px] h-[50px] flex items-center justify-center">
                        <img
                          src={getImageUrl(item.image)}
                          alt={'🚫'}
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <span className="text-white text-xl mt-3 font-medium">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </>
  );
}
