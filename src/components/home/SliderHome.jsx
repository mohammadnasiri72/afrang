"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";

const SliderHome = ({ sliderItems }) => {
  return (
    <>
      <div className="relative w-full h-72 slider-homePage">
        {/* بخش اسلایدها (ماسک فقط اینجا اعمال میشه) */}
        <div className="w-full h-full overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              el: ".custom-swiper-pagination", // اینجا وصل میشه
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop={true}
            className="w-full h-full"
          >
            {sliderItems.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={item.sourceLink ? item.sourceLink : "/"}
                  className="block w-full h-full"
                >
                  <div className="relative w-full h-full cursor-pointer group">
                    <div className="sm:hidden block">
                      <Image
                        src={getImageUrl(
                          item.imageMobile ? item.imageMobile : item.image
                        )}
                        alt={item.title || "تصویر"}
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        unoptimized
                      />
                    </div>
                    <div className="sm:block hidden">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.title || "تصویر"}
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        unoptimized
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* pagination جدا از ماسک */}
        <div className="custom-swiper-pagination absolute right-5 top-1/2 -translate-y-1/2 z-[9999]" />
      </div>
    </>
  );
};

export default SliderHome;
