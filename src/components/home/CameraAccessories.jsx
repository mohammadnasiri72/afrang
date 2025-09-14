"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pagination } from "swiper/modules";
import Loading from "../Loading";

export default function CameraAccessories({ category }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log(category);

  return (
    <>
      <div className="box-slider-CameraAccessories pt-5 pb-48">
        <div className="sm:px-16 px-2">
          <Swiper
            // loop={true}
            grabCursor={true}
            modules={[Pagination]}
            className="mySwiperCamera"
            pagination={{
              clickable: true,
            }}
            speed={1000}
            breakpoints={{
              1724: {
                slidesPerView: 7,
                slidesPerGroup: 7,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 8,
              },
              100: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 5,
              },
            }}
          >
            {category.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();

                    startTransition(() => {
                      router.push(item.url);
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  href={item.url}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px]"
                      />
                    </div>
                    <span className="text-white sm:text-xl mt-3 font-medium text-center">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
