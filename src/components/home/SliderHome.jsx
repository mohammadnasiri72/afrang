"use client";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { mainDomainImg } from "@/utils/mainDomain";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";

const SliderHome = ({ sliderItems }) => {
  return (
    <div className="relative w-full h-64 slider-homePage">
      {/* بخش اسلایدها (ماسک فقط اینجا اعمال میشه) */}
      <div className="inner-curve w-full h-full overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
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
          loop={true}
          className="w-full h-full"
        >
          {sliderItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="block w-full h-full">
                <div className="relative w-full h-full cursor-pointer group">
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300"
                    style={{
                      backgroundImage: `url(${mainDomainImg}${item.image})`,
                    }}
                  >
                    {item.sourceLink && item.sourceLink !== "/" && (
                      <div className="flex justify-center absolute top-4/5 left-1/2 transform -translate-x-1/2 z-[100000000000000]">
                        <Link href={item.sourceLink}>
                          <button
                            tabIndex={-1}
                            className="bg-[#18d1be] rounded-2xl py-1.5 duration-300 hover:bg-white hover:text-[#d1182b] cursor-pointer text-[#444] font-bold px-3"
                          >
                            نمایش بیشتر
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-[#0002] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* pagination جدا از ماسک */}
      <div className="custom-swiper-pagination absolute right-5 top-1/2 -translate-y-1/2 z-[9999]" />
    </div>
  );
};

export default SliderHome;
