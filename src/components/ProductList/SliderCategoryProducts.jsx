"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function SliderCategoryProducts({ categories }) {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="relative px-3 pb-3">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2.5}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 4.5,
            },
            1024: {
              slidesPerView: 5.5,
            },
          }}
          className="category-slider"
        >
          {categories?.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                href={category.url + "?" + searchParams.toString()}
                className={`block group cursor-pointer rounded-lg `}
              >
                <div
                  className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border-2 border-transparent group-hover:border-[#ce1a2a] `}
                >
                  <div className="relative h-24 w-full bg-white flex items-center justify-center overflow-hidden">
                    {category.image ? (
                      <img
                        src={getImageUrl(category.image)}
                        alt={category.title}
                        className="object-contain group-hover:scale-105 transition-transform duration-300 h-full"
                      />
                    ) : (
                      <Skeleton.Image />
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <h3
                      className={` font-bold! truncate text-[#0a1d39] group-hover:text-[#ce1a2a] transition-colors duration-300`}
                    >
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .category-slider {
            padding: 0 0px;
          }
          .category-slider .swiper-button-next,
          .category-slider .swiper-button-prev {
            color: #0a1d39;
            background: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .category-slider .swiper-button-next:after,
          .category-slider .swiper-button-prev:after {
            font-size: 16px;
          }
          .category-slider .swiper-button-disabled {
            pointer-events: visible !important;
          }
        `}</style>
      </div>
    </>
  );
}

export default SliderCategoryProducts;
