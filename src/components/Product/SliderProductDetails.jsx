"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { mainDomainImg } from "@/utils/mainDomain";

Fancybox.defaults.Keyboard = {
  Escape: "close", // کلید ESC گالری را ببندد
  ArrowRight: "next", // کلید پیکان راست به تصویر بعدی برود
  ArrowLeft: "prev", // کلید پیکان چپ به تصویر قبلی برود
};

Fancybox.bind("[data-fancybox='gallery']", {
  Animation: {
    duration: 500, // مدت زمان انیمیشن
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", // انیمیشن نرم
  },

  Toolbar: true,
  Buttons: true,
  Thumbs: {
    autoStart: true, // شروع خودکار نمایش تصاویر کوچک
  },
  dragToClose: true, // امکان کشیدن تصویر برای بستن
});

export default function SliderProductDetails({ attachments }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {attachments.length > 0 && (
        <div className="slider-productDetails">
          <Swiper
            style={{
              cursor: "pointer",
            }}
            loop={true}
            spaceBetween={10}
            speed={1700}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
          >
            {/* <SwiperSlide>
            <a className="w-full" href="/images/gallery/image11.jpg" data-fancybox="gallery" data-caption="Caption Images 1">
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-full" href="/images/gallery/image11.jpg" data-fancybox="gallery" data-caption="Caption Images 2">
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-full" href="/images/gallery/image11.jpg" data-fancybox="gallery" data-caption="Caption Images 3">
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-full" href="/images/gallery/image11.jpg" data-fancybox="gallery" data-caption="Caption Images 4">
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a className="w-full" href="/images/gallery/image11.jpg" data-fancybox="gallery" data-caption="Caption Images 5">
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </a>
          </SwiperSlide> */}
            {attachments.map((attachment) => (
              <SwiperSlide key={attachment.id}>
                <a
                  className="w-full"
                  href={mainDomainImg + attachment.fileUrl}
                  data-fancybox="gallery"
                  data-caption="Caption Images 4"
                >
                  <img
                    className="w-full border rounded-sm border-[#3331]"
                    src={mainDomainImg + attachment.fileUrl}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {attachments.map((attachment) => (
              <SwiperSlide key={attachment.id}>
                <img
                  className="w-full border rounded-sm border-[#3331]"
                  src={mainDomainImg + attachment.fileUrl}
                />
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full border rounded-sm border-[#3331]"
                src="/images/gallery/image11.jpg"
              />
            </SwiperSlide> */}
          </Swiper>
        </div>
      )}
    </>
  );
}
