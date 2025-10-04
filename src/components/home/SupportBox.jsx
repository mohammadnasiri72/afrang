"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import SupportBoxPhoto from "./SupportBoxPhoto";

const SupportBox = ({ items }) => {
  return (
    <div className="sm:px-16 px-2 bg-[#f6f6f6]">
      <div className="bg-[#18d1be] p-3 rounded-lg">
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={4}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            980: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
          }}
          spaceBetween={10}
          loop={true}
          grabCursor={true}
          modules={[Pagination]}
          className="mySwiperSupport"
          // autoplay={{
          //   delay: 0,
          //   disableOnInteraction: false,
          // }}
          // speed={5000}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-lg bg-white p-5 flex sm:flex-row flex-col justify-center gap-2 items-center">
                <SupportBoxPhoto item={item} />
                <span>{item.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SupportBox;
