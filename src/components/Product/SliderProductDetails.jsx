"use client";

import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { getImageUrl2 } from "@/utils/mainDomain";
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

export default function SliderProductDetails({ attachments, product }) {
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

  // شناسایی تصویر LCP (اولین تصویر محصول)
  const lcpImage = attachments.length > 0 ? attachments[0] : null;

  return (
    <>
      <div className="flex justify-between relative h-full ">
        <div className="w-full mx-auto h-full">
          {/* تخفیف */}
          {product?.discount !== 0 && (
            <div className="absolute top-3 left-3 z-50 duration-300">
              <span className="bg-[#d1182b] text-white rounded-md px-3 py-1 ">
                {product.discount}%
              </span>
            </div>
          )}
          {/* کالای کارکرده */}
          {product?.conditionId === 20 && (
            <div className="absolute top-2 right-2 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
              کالای کارکرده
            </div>
          )}
          {/* فروخته شد*/}
          {product?.statusId !== 1 && product?.conditionId === 20 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full select-none z-10">
              <img
                draggable="false"
                className="w-36"
                src="/public/images/soldout.png"
                alt="فروخته شد"
              />
            </div>
          )}

          {/* تصویر LCP - بدون lazy loading و با اولویت بالا */}
          {lcpImage && (
            <img
              src={getImageUrl2(lcpImage.fileUrl)}
              alt={product.title}
              className="absolute opacity-0 w-0 h-0"
              fetchPriority="high"
              loading="eager"
            />
          )}

          {attachments.length > 0 && (
            <div className="slider-productDetails h-full">
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
                {attachments.map((attachment, index) => (
                  <SwiperSlide key={attachment.id}>
                    <a
                      className=" h-full"
                      href={getImageUrl2(attachment.fileUrl)}
                      data-fancybox="gallery"
                      data-caption="Caption Images 4"
                      aria-label="لینک کروسل"
                    >
                      <img
                        className={`w-full h-full border rounded-sm border-[#3331]  ${
                          product?.statusId !== 1 && product?.conditionId === 20
                            ? "blur-xs"
                            : ""
                        }`}
                        src={getImageUrl2(attachment.fileUrl)}
                        alt={product.title}
                        // برای اولین تصویر از eager loading استفاده می‌کنیم
                        loading={index === 0 ? "eager" : "lazy"}
                        // برای اولین تصویر اولویت بالاتری قرار می‌دهیم
                        fetchPriority={index === 0 ? "high" : "auto"}
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
                      src={getImageUrl2(attachment.fileUrl)}
                      alt={product.title}
                      loading="lazy"
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
