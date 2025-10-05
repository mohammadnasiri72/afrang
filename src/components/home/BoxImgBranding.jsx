"use client";

import { useTransition } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Loading";
import BoxImgBrandingPhoto from "./BoxImgBrandingPhoto";

export default function BoxImgBranding({ brands }) {
  const [isPending, startTransition] = useTransition();

  
  return (
    <>
      <div className="relative">
        <div className="absolute left-0 -top-52">
          <img src="/images/gallery/bg-shadow-1.png" alt="" />
        </div>
        <div className="absolute right-0 top-0">
          <img src="/images/gallery/bg-shadow-2.png" alt="" />
        </div>
        <Swiper
          spaceBetween={10}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper bg-white"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
          grabCursor={true}
          breakpoints={{
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="relative overflow-hidden w-36 h-36 aspect-square">
                <BoxImgBrandingPhoto
                  brand={brand}
                  startTransition={startTransition}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isPending && <Loading />}
    </>
  );
}
