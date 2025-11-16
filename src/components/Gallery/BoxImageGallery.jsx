"use client";
import { Divider, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Image from "next/image";

// import required modules
import { Fancybox } from "@fancyapps/ui";
import { getImageUrl } from "@/utils/mainDomain";
import { getUserCookie } from "@/utils/cookieUtils";
import { postLike } from "@/services/UserActivity/UserActivityService";

Fancybox.defaults.Keyboard = {
  Escape: "close", // کلید ESC گالری را ببندد
  ArrowRight: "next", // کلید پیکان راست به تصویر بعدی برود
  ArrowLeft: "prev", // کلید پیکان چپ به تصویر قبلی برود
};

Fancybox.bind("[data-fancybox='gallery2']", {
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

function BoxImageGallery({ imageData }) {
  const [liked, setLiked] = useState(false);
  const [likedNumber, setLikedNumber] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   // افزایش z-index fancybox
   useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  useEffect(() => {
    if (imageData) {
      setLiked(imageData.isLiked)
      setLikedNumber(imageData.like)
    }
  }, [imageData])


  useEffect(() => {
    const userData = getUserCookie();
    setToken(userData?.token || null);
  }, []);

  const handleLike = async () => {
    if (!token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      await postLike(imageData.id, token);
      setLiked((e) => !e);
      setLikedNumber((e) => liked ? e - 1 : e + 1)
      message.success({
        content: liked ? "تصویر از علاقه‌مندی‌ها حذف شد" : "تصویر به علاقه‌مندی‌ها اضافه شد",
        duration: 3,
        className: 'custom-success-message'
      });
    } catch (error) {
      message.error({
        content: error.response?.data || "خطای شبکه",
        duration: 3,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="lg:w-1/4 sm:w-1/2 w-full p-2">
        <div className="bg-white p-2 rounded-sm box-circl z-50 relative">
          <div className="cursor-pointer relative overflow-hidden">
            <a
              data-fancybox="gallery2"
              data-caption={imageData.senderTitle}
              href={getImageUrl(imageData.image)}
              className="block relative w-full h-[200px]"
            >
              <Image
                src={getImageUrl(imageData.image)}
                alt={imageData.senderTitle}
                fill
                className="object-cover"
                unoptimized
              />
              {/* <div className="absolute inset-0 bg-white/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div> */}
            </a>
          </div>

          <div className="my-3 flex items-center text-xs p-2">
            <span>فرستنده : </span>
            <span className="font-semibold px-1">{imageData.senderTitle || 'نامشخص'}</span>
          </div>
          <Divider
            style={{ margin: 0, padding: 0, borderColor: "#d1182b55" }}
          />
          <div className="flex justify-between items-center px-1 py-2 mt-2">
            <div className="flex items-center text-xs">
              <span className="font-bold">{imageData.visit || 0}</span>
              <span className="px-1">بازدید</span>
            </div>
            {
              isLoading ? <Spin size="small" /> :
                <div
                  onClick={() => {
                    handleLike()
                  }}
                  className="flex items-center text-xs cursor-pointer"
                >
                  {liked ? (
                    <IoMdHeart className="text-lg text-[#d1182b]" />
                  ) : (
                    <IoMdHeartEmpty className="text-lg" />
                  )}
                  <span className="px-1 font-bold">{likedNumber}</span>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxImageGallery;
