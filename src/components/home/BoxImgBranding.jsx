"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { FaCaretLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BoxImgBranding({ brands }) {
  return (
    <>
      <div className="relative mt-5  ">
        <div className="absolute left-0 -top-52">
          <Image
            src="/images/bg-shadow-1.png"
            alt=""
            width={400}
            height={400}
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
            unoptimized
          />
        </div>
        <div className="absolute right-0 top-0">
          <Image
            src="/images/bg-shadow-2.png"
            alt=""
            width={400}
            height={400}
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
            unoptimized
          />
        </div>
        <div className="max-w-[1600px] overflow-hidden md:px-16 mx-auto px-4 ">
          <div className="flex justify-between items-center z-10 relative -mb-5 border-b border-[#0002]">
            <div className="flex items-center title-newProduct relative ">
              <h4 className="font-semibold text-xl ">
                برندهای <span className="text-[#d1182b]">افرنگ</span>
              </h4>
            </div>

            <Link
              href={`/brands`}
              className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
            >
              <span>نمایش همه</span>
              <FaCaretLeft />
            </Link>
          </div>
          <Swiper
            spaceBetween={10}
            loop={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper bg-transparent"
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
                <div className="relative overflow-hidden sm:w-32 w-20 sm:h-32 h-20 aspect-square">
                  <Link
                    href={`/products?brandid=${brand.id}`}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <Image
                      className={`group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] object-contain border-none outline-none cursor-pointer`}
                      src={`${mainDomainImg}${brand.image}`}
                      alt={brand.title || "تصویر برند"}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
