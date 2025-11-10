"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategorySlider({ currentId, categoriesChilds }) {
  const handleCategoryClick = (categoryId) => {
    // پیدا کردن المنت مربوط به دسته‌بندی
    const categoryElement = document.getElementById(`category-${categoryId}`);

    if (categoryElement) {
      // محاسبه موقعیت المنت
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 150;

      // اسکرول به موقعیت محاسبه شده
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // اضافه کردن هایلایت موقت
      categoryElement.classList.add("highlight-category");
      setTimeout(() => {
        categoryElement.classList.remove("highlight-category");
      }, 2000);
    }
  };
  

  return (
    <>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          initialSlide={
            categoriesChilds?.findIndex(
              (category) => category.id === currentId
            ) || 0
          }
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="category-slider"
        >
          {categoriesChilds?.map((category) => (
            <SwiperSlide key={category.id}>
              <div
                onClick={() => handleCategoryClick(category.id)}
                className={`block group cursor-pointer ${
                  category.id === currentId ? " rounded-lg" : ""
                }`}
              >
                <div
                  className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                    category.id === currentId ? "border-2 border-[#18d1be]" : ""
                  }`}
                >
                  <div className="relative h-24 w-full bg-gray-400 flex items-center justify-center p-2">
                    {category.image ? (
                      <Image
                        src={getImageUrl(category.image)}
                        alt={category.title}
                        width={60}
                        height={60}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <Skeleton.Image />
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <h3
                      className={`text-sm font-medium truncate ${
                        category.id === currentId
                          ? "text-[#18d1be]"
                          : "text-[#0a1d39] group-hover:text-[#18d1be]"
                      } transition-colors duration-300`}
                    >
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .category-slider {
            padding: 0 40px;
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
            opacity: 0.5;
          }
          .category-slider .swiper-slide {
            padding: 2px;
          }
          .category-slider .swiper-slide-active {
            padding: 0;
          }

          /* استایل برای هایلایت دسته‌بندی */
          .highlight-category {
            animation: highlight-pulse 2s ease-in-out;
          }

          @keyframes highlight-pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(24, 209, 190, 0.4);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(24, 209, 190, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(24, 209, 190, 0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
