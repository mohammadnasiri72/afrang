"use client";

import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BoxImgBranding({ brands }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white flex justify-center items-center z-[46546546]">
          <Spin />
      </div>
    );
  }

  return (
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
            <img
              onClick={() => {
                startTransition(() => {
                  router.push(`/products?brandid=${brand.id}`);
                });
              }}
              src={`https://afrangadmin.aitest2.ir${brand.image}`}
              alt={brand.title}
              className="w-36 h-36 object-contain cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
