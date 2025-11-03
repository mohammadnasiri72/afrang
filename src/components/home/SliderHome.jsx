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
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "../Loading";

const SliderHome = ({ sliderItems }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="relative w-full h-64 slider-homePage">
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
                <div className="block w-full h-full">
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

                    {/* دکمه روی عکس */}
                    {item.sourceLink && item.sourceLink !== "/" && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                        <Link
                          href={item.sourceLink}
                          onClick={(ev) => {
                            ev.preventDefault();
                            startTransition(() => {
                              router.push(item.sourceLink);
                            });
                          }}
                        >
                          <button
                            tabIndex={-1}
                            className="bg-[#18d1be] rounded-2xl py-1.5 px-3 duration-300 hover:!bg-white hover:!text-[#d1182b] font-bold !text-[#444] cursor-pointer"
                          >
                            نمایش بیشتر
                          </button>
                        </Link>
                      </div>
                    )}

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
      {isPending && <Loading />}
    </>
  );
};

export default SliderHome;
