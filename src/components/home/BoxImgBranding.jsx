"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import Image from "next/image";
import { useTransition } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Loading";

export default function BoxImgBranding({ brands }) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="relative">
        <div className="absolute left-0 -top-52">
          <Image
            src="/images/gallery/bg-shadow-1.png"
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
            src="/images/gallery/bg-shadow-2.png"
            alt=""
            width={400}
            height={400}
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
            unoptimized
          />
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
              <div className="relative overflow-hidden sm:w-32 w-20 sm:h-32 h-20 aspect-square">
                <Image
                  onClick={() => {
                    startTransition(() => {
                      router.push(`/products?brandid=${brand.id}`);
                    });
                  }}
                  className={`group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] object-contain border-none outline-none`}
                  src={`${mainDomainImg}${brand.image}`}
                  alt={brand.title || "تصویر برند"}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
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
