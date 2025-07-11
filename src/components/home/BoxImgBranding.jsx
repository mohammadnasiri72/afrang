"use client";

import { fetchBrandingItems } from "@/services/brandingService";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LoadingSkeleton = () => {
  return (
    <div className="sm:px-16 px-2 bg-[#f6f6f6] relative z-50">
      <div className="absolute left-0 -top-52">
        <img src="/images/gallery/bg-shadow-1.png" />
      </div>
      <div className="absolute right-0 top-0">
        <img src="/images/gallery/bg-shadow-2.png" />
      </div>
      <div className="flex gap-2 overflow-hidden justify-between items-center">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-36 h-36 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default function BoxImgBranding() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRequested = useRef(false);
  const router = useRouter();


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
    return <LoadingSkeleton />;
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
        modules={[Pagination]}
        className="mySwiper"
        // autoplay={{
        //   delay: 0,
        //   disableOnInteraction: false,
        // }}
        // speed={5000}
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
            <img onClick={() => {
              router.push(`/products?brandid=${brand.id}`)
            }}
              src={`https://afrangadmin.aitest2.ir${brand.image}`}
              alt={brand.title}
              className="w-20 h-20 object-contain cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
