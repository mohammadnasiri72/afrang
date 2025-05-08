"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function CameraAccessories() {
  return (
    <>
      <div className="box-slider-CameraAccessories pt-16 pb-48 mt-3">
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
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              100: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
            }}
            
            
            
            
            
            
          >
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className=" flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/lens.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    لنز
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/camera.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    دوربین عکاسی
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/video-camera.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    دوربین فیـلمبرداری
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/lens.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    کیف دوربیـن
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className=" flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/camera-guard.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    گـارد دوربـیـن
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className=" flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/battery.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    باتری و شارژر
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center">
                <div className=" flex flex-col items-center justify-center select-none cursor-pointer">
                  <img src="/images/icons/camera-bag.png" alt="" />
                  <span className="text-white text-xl mt-3 font-medium">
                    کیف دوربیـن
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
