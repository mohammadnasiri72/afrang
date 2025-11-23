"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaCaretLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Loading";

export default function BoxImgBranding({ brands }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <div className="relative mt-5 sm:px-3 px-2">
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
        <div className="max-w-[1600px] mx-auto overflow-hidden">
        <div className="flex justify-between items-center  z-50 relative -mb-5 border-b border-[#0002]">
          <div className="flex items-center title-newProduct relative ">
            <h2 className="font-semibold text-xl ">
              برندهای <span className="text-[#d1182b]">افرنگ</span>
            </h2>
          </div>

          <div
            onClick={() => {
              startTransition(() => {
                router.push(`/brands`);
              });
            }}
            className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
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
                    onClick={(ev) => {
                      ev.preventDefault();
                      startTransition(() => {
                        router.push(`/products?brandid=${brand.id}`);
                      });
                    }}
                    href={`/products?brandid=${brand.id}`}
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
      {isPending && <Loading />}
    </>
  );
}
