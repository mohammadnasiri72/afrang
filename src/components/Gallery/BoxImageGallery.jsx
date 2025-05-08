"use client";
import { Divider } from "antd";
import React, { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

// import required modules
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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

function BoxImageGallery() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <div className="lg:w-1/4 sm:w-1/2 w-full p-2 ">
        <div className="bg-white p-2 rounded-sm box-circl">
          <div className="cursor-pointer relative overflow-hidden ">
            <img
              data-fancybox="gallery2"
              data-caption="5456"
              className="w-full "
              src="/images/gallery/pic-1.jpg"
              alt=""
            />
            <div className="bg-[#fff3] duration-1000 absolute left-1/2 top-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 circl"></div>
          </div>

          <div className="my-3 flex items-center text-xs p-2">
            <span>فرستنده : </span>
            <span className="font-semibold px-1">علیرضا ریاحی</span>
          </div>
          <Divider
            style={{ margin: 0, padding: 0, borderColor: "#d1182b55" }}
          />
          <div className="flex justify-between items-center px-1 py-2 mt-2">
            <div className="flex items-center text-xs">
              <span className="font-bold">134</span>
              <span className="px-1">بازدید</span>
            </div>
            <div
              onClick={() => {
                setLiked((e) => !e);
              }}
              className="flex items-center text-xs cursor-pointer"
            >
              {liked ? (
                <IoMdHeart className="text-lg text-[#d1182b]" />
              ) : (
                <IoMdHeartEmpty className="text-lg" />
              )}
              <span className="px-1 font-bold">{liked ? "127" : "126"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxImageGallery;
