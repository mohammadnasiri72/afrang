"use client";
import { getListItemByIds } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// ScriptInjector: اجرا و تزریق اسکریپت داینامیک برای ویدئوهای embed
function ScriptInjector({ scriptHtml }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!scriptHtml || !ref.current) return;
    ref.current.innerHTML = "";
    const temp = document.createElement("div");
    temp.innerHTML = scriptHtml;
    const script = temp.querySelector("script");
    if (script) {
      const newScript = document.createElement("script");
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.innerHTML = script.innerHTML;
      }
      for (const attr of script.attributes) {
        newScript.setAttribute(attr.name, attr.value);
      }
      ref.current.appendChild(newScript);
    }
  }, [scriptHtml]);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 500, minHeight: 280 }} />
  );
}

// تابع استخراج src از iframe
const extractIframeSrc = (html) => {
  const match = html.match(/<iframe[^>]*src=["']([^"']+)["']/);
  return match ? match[1] : null;
};

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
    return (
      <div key={video.id} className="w-full h-full flex flex-col items-center justify-start p-2">
        <div style={{ fontWeight: "bold", marginBottom: 8, width: '100%' }}>
          {video.title}
        </div>
        {videoFile && !videoScript && (
          <video
            src={getImageUrl(videoFile.propertyValue)}
            controls
            style={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 8,
              background: "#000",
            }}
          />
        )}
        {videoScript && (
          extractIframeSrc(videoScript) ? (
            <iframe
              src={extractIframeSrc(videoScript)}
              allowFullScreen
              style={{ width: '100%', maxWidth: 500, border: 'none', borderRadius: 8 }}
            />
          ) : (
            <ScriptInjector scriptHtml={videoScript} />
          )
        )}
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
      <div style={{ color: "#d1182b", textAlign: 'center', margin: 32 }}>
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
