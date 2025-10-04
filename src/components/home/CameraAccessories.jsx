"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pagination } from "swiper/modules";
import Loading from "../Loading";

export default function CameraAccessories({ category }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  return (
    <>
      <div className="box-slider-CameraAccessories bg-no-repeat bg-cover h-80 pt-3">
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
                  }}
                  href={item.url}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                    <div className="w-[50px] h-[50px] flex items-center justify-center relative">
                     
                      {item.image && (
                        <Image
                          className={`sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] ${
                            isLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          src={getImageUrl(item.image)}
                          alt={"دسته بندی محصولات"}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          unoptimized
                          priority={false}
                          onLoad={() => {
                            setIsLoaded(true);
                          }}
                          loading={"lazy"}
                          placeholder={"blur"}
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                        />
                      )}
                      <div
                        className={`absolute left-0 right-0 top-0 bottom-0 ${
                          isLoaded ? "!hidden" : ""
                        }`}
                      >
                        <Skeleton.Image active className={`!w-full !h-full `} />
                      </div>
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
      {isPending && <Loading />}
    </>
  );
}
