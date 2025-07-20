"use client";

import { getListItemByIds } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FaPlay } from "react-icons/fa";

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

// ScriptInjector: اجرا و تزریق اسکریپت داینامیک برای ویدئوهای embed
function ScriptInjector({ scriptHtml }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && scriptHtml) {
      // ایجاد یک div موقت برای اجرای اسکریپت
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = scriptHtml;

      // پاک کردن محتوای قبلی
      containerRef.current.innerHTML = "";

      // اضافه کردن اسکریپت جدید
      const scriptElement = tempDiv.querySelector("script");
      if (scriptElement) {
        const newScript = document.createElement("script");
        newScript.src = scriptElement.src;
        newScript.async = true;
        containerRef.current.appendChild(newScript);
      } else {
        // اگر اسکریپت inline باشد
        containerRef.current.innerHTML = scriptHtml;
      }
    }
  }, [scriptHtml]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", maxWidth: 500, minHeight: 280 }}
    />
  );
}

function BoxVideoProduct({ ids }) {
  const [listVideo, setListVideo] = useState([]);

  useEffect(() => {
    if (!ids) return;
    const fetchData = async () => {
      try {
        const response = await getListItemByIds(ids);
        setListVideo(response);
      } catch (error) {
        console.error("Error fetching video items:", error);
      }
    };
    fetchData();
  }, [ids]);

  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // تابع استخراج src از iframe
  const extractIframeSrc = (html) => {
    const match = html.match(/<iframe[^>]*src=["']([^"']+)["']/);
    return match ? match[1] : null;
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
      videoContent = getImageUrl(videoFile.propertyValue);
    } else if (videoScript) {
      const iframeSrc = extractIframeSrc(videoScript);
      if (iframeSrc) {
        videoContent = videoScript;
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
          <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {coverImage ? (
              <img
                src={getImageUrl(coverImage)}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-sm">بدون کاور</span>
              </div>
            )}

            {/* دکمه پخش */}
            {videoContent && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-4 cursor-pointer hover:bg-opacity-70 transition-all duration-300">
                  <FaPlay className="text-white text-2xl" />
                </div>
              </div>
            )}

            {/* لینک Fancybox */}
            {videoContent && (
              <a
                href={videoContent}
                data-fancybox="video-gallery"
                data-caption={video.title}
                className="absolute inset-0 block"
                style={{ zIndex: 10 }}
              />
            )}
             
          </div>
        </div>
        {!videoFile && !videoScript && (
          <div style={{ color: "#d1182b" }}>
            ویدئویی برای این آیتم ثبت نشده است.
          </div>
        )}
        <div> {videoContent}</div>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sortedVideos.map((video) => renderVideo(video))}
    </div>
  );
}

export default BoxVideoProduct;
