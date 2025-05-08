"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { fetchBrandingItems } from "@/services/brandingService";

export default function BoxImgBranding() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRequested = useRef(false);

  useEffect(() => {
    const getBrandingItems = async () => {
      if (isRequested.current) return;
      isRequested.current = true;

      try {
        const items = await fetchBrandingItems();
        if (items) {
          setBrands(items);
        }
      } catch (error) {
        console.error('Error fetching branding items:', error);
      } finally {
        setLoading(false);
      }
    };

    getBrandingItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:px-16 px-2 bg-[#f6f6f6] relative">
      <div className="absolute left-0 -top-52">
        <img src="/images/gallery/bg-shadow-1.png" />
      </div>
      <div className="absolute right-0 top-0">
        <img src="/images/gallery/bg-shadow-2.png" />
      </div>
      <Swiper
        spaceBetween={10}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={5000}
        breakpoints={{
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          100: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
              <img
                src={`https://afrangadmin.aitest2.ir${brand.image}`}
                alt={brand.title}
                className="w-36 h-36 object-contain"
              />
            {/* <div className="rounded-lg bg-white p-5 flex sm:flex-row flex-col justify-center gap-2 items-center">
              <span className="text-sm font-semibold">{brand.title}</span>
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
