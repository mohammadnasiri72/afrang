"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// تنظیمات Fancybox برای گالری ویدئو
Fancybox.bind("[data-fancybox='video-gallery']", {
  Animation: {
    duration: 500,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
  Toolbar: true,
  Buttons: true,
  dragToClose: true,
});

function BoxVideoProduct({ listVideo }) {
  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // تابع استخراج تگ iframe از HTML
  const extractIframeTag = (html) => {
    const match = html.match(/<iframe[\s\S]*?<\/iframe>/);
    if (match) {
      // iframe را داخل یک div با aspect-ratio قرار بده
      return `
        <div style="position:relative;height:100%;max-width:100%;aspect-ratio:16/9;overflow:hidden;">
          ${match[0].replace(
            "<iframe",
            '<iframe  title="ویدئو محصول با iframe" style="position:absolute;top:0;left:0;width:100%;height:100%;display:block;"'
          )}
        </div>
      `;
    }
    return null;
  };

  // ویدئوهایی که videoScript دارند اولویت دارند
  const sortedVideos = [...listVideo].sort((a, b) => {
    const aHasScript = a.properties?.some(
      (p) => p.propertyKey === "video_script" && p.propertyValue
    );
    const bHasScript = b.properties?.some(
      (p) => p.propertyKey === "video_script" && p.propertyValue
    );
    return bHasScript - aHasScript;
  });

  // گروه‌بندی ویدئوها به ردیف‌های ۳تایی
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const groupSize = 3;
  const groupedVideos = chunkArray(sortedVideos, groupSize);
  const useSlider = sortedVideos.length > 6;

  // رندر هر ویدئو
  const renderVideo = (video) => {
    const videoFile = video.properties?.find(
      (p) => p.propertyKey === "video_file" && p.propertyValue
    );
    const videoScript = video.properties?.find(
      (p) => p.propertyKey === "video_script" && p.propertyValue
    )?.propertyValue;
    const coverImage = video.image;

    // محتوای ویدئو برای Fancybox
    let videoContent = null;

    if (videoFile && !videoScript) {
      // ویدئوی غیر اسکریپتی: لینک فایل ویدئو
      // Fancybox به صورت پیش‌فرض ویدئو را با تگ <video> یا <img> باز می‌کند
      // ما به لینک ویدئو data-width و data-height می‌دهیم
      videoContent = getImageUrl(videoFile.propertyValue);
    } else if (videoScript) {
      // اگر اسکریپت HTML با iframe بود فقط iframe را استخراج کن
      const iframeTag = extractIframeTag(videoScript);

      if (iframeTag) {
        videoContent = iframeTag;
      } else {
        videoContent = videoScript;
      }
    }
    return (
      <div
        key={video.id}
        className="w-full h-full flex flex-col items-center justify-start p-2"
      >
        <div style={{ fontWeight: "bold", marginBottom: 8, width: "100%" }}>
          {video.title}
        </div>
        <div className="relative w-full max-w-[500px]">
          {/* کاور ویدئو */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              width: "100%",
              overflow: "hidden",
              borderRadius: "0.75rem",
              background: "#e5e7eb",
            }}
            className="group"
          >
            {coverImage ? (
              <img
                src={getImageUrl(coverImage)}
                alt={video.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className="bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
              >
                <span className="text-gray-600 text-sm">بدون کاور</span>
              </div>
            )}

            {/* دکمه پخش */}
            {videoContent && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="bg-black bg-opacity-50 rounded-full p-4 cursor-pointer group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <FaPlay className="text-white text-2xl" />
                </div>
              </div>
            )}

            {/* لینک Fancybox */}
            {videoContent && videoFile && !videoScript && (
              <a
                aria-label="لینک ویدئو محصول"
                href={videoContent}
                data-fancybox="video-gallery"
                data-caption={video.title}
                className="absolute top-0 bottom-0 right-0 left-0 block cursor-pointer"
                style={{ zIndex: 10 }}
                {...(videoScript
                  ? { "data-type": "html", "data-src": videoContent }
                  : {})}
              />
            )}
          </div>
        </div>
        {!videoFile && !videoScript && (
          <div style={{ color: "#d1182b" }}>
            ویدئویی برای این آیتم ثبت نشده است.
          </div>
        )}
      </div>
    );
  };

  if (sortedVideos.length === 0) {
    return (
      <div style={{ color: "#d1182b", textAlign: "center", margin: 32 }}>
        ویدئویی برای این آیتم ثبت نشده است.
      </div>
    );
  }

  // اگر بیشتر از ۶ ویدئو بود اسلایدر
  if (useSlider) {
    const sliderGroups = chunkArray(sortedVideos, 6); // هر اسلاید ۶ ویدئو (۲ ردیف ۳تایی)
    return (
      <>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          className="custom-swiper cursor-grab"
        >
          {sliderGroups.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.map((video) => renderVideo(video))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>{`
          .custom-swiper {
            cursor: grab;
          }
          .custom-swiper:active {
            cursor: grabbing;
          }
          .custom-swiper .swiper-wrapper {
            cursor: inherit;
          }
          .custom-swiper .swiper-pagination {
            position: static;
            margin-top: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
          }
          .custom-swiper-bullet {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: #000 !important;
            border-radius: 999px;
            transition: all 0.3s;
            margin: 0 4px;
            cursor: pointer;
          }
          .custom-swiper .swiper-pagination-bullet-active,
          .custom-swiper-bullet.swiper-pagination-bullet-active {
            background: #d1182b !important;
            width: 32px;
            height: 12px;
            border-radius: 999px;
          }
        `}</style>
      </>
    );
  }

  // اگر ۶ یا کمتر بود، گرید ساده
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedVideos.map((video) => renderVideo(video))}
      </div>
      <style jsx global>{`
        .fancybox__slide.has-html {
          padding: 0 !important;
        }
        .fancybox__content {
          padding: 0 !important;
          background: #000 !important;
        }
        .fancybox__content img,
        .fancybox__content video {
          object-fit: contain !important;
          background: #000 !important;
          margin: 0 auto;
          display: block;
        }
      `}</style>
    </>
  );
}

export default BoxVideoProduct;
