"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { mainDomainImg } from "@/utils/mainDomain";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function CameraAccessories({ category }) {

  const defaultImage = "/images/icons/lens.png";
  const getImageUrl = (image) => {
    if (!image) return defaultImage;
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return defaultImage;
    }
  };
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
                slidesPerView: 2,
                spaceBetween: 5,
              },
            }}
          >
            {
              category.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={item.url} className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                      <div className="w-[200px] h-[200px] flex items-center justify-center">
                        <img
                          src={getImageUrl(item.image) || defaultImage}
                          alt={item.title}
                          className="w-full h-full object-contain"
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
