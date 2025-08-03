"use client";

import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { getImageUrl } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { useEffect } from "react";
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

export default function SliderProductSecImg({ attachments }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    import("@fancyapps/ui/dist/fancybox/fancybox.css");
  }, []);

  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between relative">
        <div className="w-full mx-auto">
          {attachments.length > 0 && (
            <div className="slider-productDetails">
              <Swiper
                style={{
                  cursor: "pointer",
                  height: "300px",
                  border: "1px solid #3331",
                  borderRadius: "10px",
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
                  <SwiperSlide key={attachment}>
                    <a
                      className=" h-full relative"
                      href={getImageUrl(attachment)}
                      data-fancybox="gallery"
                      //   data-caption="Caption Images 4"
                    >
                      <img className="" src={getImageUrl(attachment)} />
                    </a>
                  </SwiperSlide>
                ))}
                {/* کالای کارکرده */}
                <div className="absolute top-2 right-2 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                  کالای کارکرده
                </div>
              </Swiper>
              <Swiper
                style={{
                  height: "100px",
                  width:'100%'
                }}
                onSwiper={setThumbsSwiper}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {attachments.map((attachment) => (
                  <SwiperSlide
                    style={{
                     cursor:'pointer'
                    }}
                    key={attachment}
                  >
                    <img
                      className="h-full border rounded-sm border-[#3331]"
                      src={getImageUrl(attachment)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
