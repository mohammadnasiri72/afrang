"use client";

import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { getImageUrl, mainDomainImg } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

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
                    src={getImageUrl(attachment.fileUrl)}
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
                  src={getImageUrl(attachment.fileUrl)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
