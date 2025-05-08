"use client";

import { Pagination, Rate } from "antd";
import { useState } from "react";
import { FaEye, FaRegUser, FaTelegram } from "react-icons/fa6";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import Container from "../container";
import BoxImageGallery from "./BoxImageGallery";

// import required modules
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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

function BodyGallery() {
  const [liked, setLiked] = useState(false);
  const [imgSelected, setImgSelected] = useState({
    id: 1,
    title: "img1",
    src: "/images/gallery/gallery-1.jpg",
  });

  const galleryArr = [
    { id: 1, title: "img1", src: "/images/gallery/gallery-1.jpg" },
    { id: 2, title: "img2", src: "/images/gallery/nature11.webp" },
    { id: 3, title: "img3", src: "/images/gallery/nature22.webp" },
    { id: 4, title: "img4", src: "/images/gallery/nature33.webp" },
    { id: 5, title: "img5", src: "/images/gallery/gallery-1.jpg" },
    { id: 6, title: "img6", src: "/images/gallery/gallery-1.jpg" },
    { id: 7, title: "img7", src: "/images/gallery/gallery-1.jpg" },
    { id: 8, title: "img8", src: "/images/gallery/gallery-1.jpg" },
    { id: 9, title: "img9", src: "/images/gallery/gallery-1.jpg" },
    { id: 10, title: "img10", src: "/images/gallery/gallery-1.jpg" },
    { id: 11, title: "img11", src: "/images/gallery/gallery-1.jpg" },
    { id: 12, title: "img12", src: "/images/gallery/gallery-1.jpg" },
    { id: 13, title: "img13", src: "/images/gallery/gallery-1.jpg" },
    { id: 14, title: "img14", src: "/images/gallery/gallery-1.jpg" },
    { id: 15, title: "img15", src: "/images/gallery/gallery-1.jpg" },
    { id: 16, title: "img16", src: "/images/gallery/gallery-1.jpg" },
  ];

  const handleNext = () => {
    const currentIndex = galleryArr.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const nextIndex = (currentIndex + 1) % galleryArr.length; // برای بازگشت به اولین آبجکت در صورت رسیدن به انتها
    setImgSelected(galleryArr[nextIndex]);
  };
  const handlePrev = () => {
    const currentIndex = galleryArr.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const prevIndex =
      (currentIndex - 1 + galleryArr.length) % galleryArr.length;
    setImgSelected(galleryArr[prevIndex]);
  };

  return (
    <>
      <Container>
        <div className="flex lg:flex-nowrap flex-wrap gap-3">
          <div className="rounded-sm bg-white p-4 flex items-center lg:w-5/12 w-full">
            
            {galleryArr
              
              .map((item) => (
                <a key={item.id}
                className={item.id === imgSelected.id ? 'w-full' : 'hidden'}
                href={item.src}
                data-fancybox="gallery"
                data-caption={item.id}
              >
                <img className="w-full" src={item.src} />
              </a>
              ))}
          </div>
          <div className="rounded-sm bg-white p-4  lg:w-7/12 w-full relative">
            <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center sm:mt-3 mt-0 sm:flex-row flex-col-reverse">
              <h3 className="flex font-semibold text-[20px] sm:w-auto w-full sm:justify-start justify-center text-center sm:mt-0 mt-3">
                عکس های برتر بر اساس لایک کاربران
              </h3>
              <div
                onClick={() => {
                  setLiked((e) => !e);
                }}
                className="bg-[#d1182b] rounded-sm px-3 py-1 flex items-center text-white cursor-pointer mr-auto sm:mr-0"
              >
                {liked ? (
                  <IoMdHeart className="text-lg" />
                ) : (
                  <IoMdHeartEmpty className="text-lg" />
                )}
                <span className="text-xl font-semibold pr-1">23</span>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-center sm:justify-start sm:gap-3 gap-0 items-center sm:flex-nowrap flex-wrap mt-5">
              <img className="w-10" src="/images/logo.png" alt="" />
              <span className="font-semibold text-lg sm:py-0 py-4">
                امتیاز تیم افرنگ به این عکس :
              </span>
              <Rate
                style={{ direction: "ltr", color: "#18d1be" }}
                defaultValue={2}
                // character={({ index = 0 }) => customIcons[index + 1]}
              />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center mt-5 gap-7">
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <FaEye className="text-[#444]" />
                <span className="text-[#444]">بازدیدکنندگان :</span>
                <span className="font-semibold text-[16px]"> ۱۳۴ نفر </span>
              </div>
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <FaRegUser className="text-[#444]" />
                <span className="text-[#444]">فرستنده :</span>
                <span className="font-semibold text-[16px]"> علیرضا ریاحی</span>
              </div>
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <LuCalendarRange className="text-[#444]" />
                <span className="text-[#444]">زمان عکاسی :</span>
                <span className="font-semibold text-[16px]">۲۳ اسفند ۱۴۰۰</span>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[#312e42] text-[14px]">نام دوربین :</span>
              <span className="font-bold">Nikon D70</span>
              <img
                className="w-16"
                src="/images/gallery/camera-thumb-5.png"
                alt=""
              />
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[#312e42] text-[14px]">نوع لنز :</span>
              <span className="font-bold">
                Nikon AF-S DX 18-105mm f/3.5-5.6 G ED VR
              </span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center mt-10">
              <div className="flex items-center gap-3 sm:w-auto w-full sm:justify-start justify-between">
                <div
                  onClick={() => {
                    setLiked((e) => !e);
                  }}
                  className="flex items-center rounded-sm bg-[#f9e3e5] text-[#d1182b] px-3 py-3 cursor-pointer duration-300 hover:bg-[#d1182b] hover:text-[#fff]"
                >
                  {liked ? (
                    <IoMdHeart className="text-lg" />
                  ) : (
                    <IoMdHeartEmpty className="text-lg" />
                  )}
                  <span className="whitespace-nowrap pr-1 font-bold text-sm">
                    لایک
                  </span>
                </div>
                <div className="flex items-center rounded-sm bg-[#18d1be] text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
                  <FaTelegram className="text-lg" />
                  <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                    ارسال تصویر
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center sm:w-auto w-full sm:mt-0 mt-5 sm:justify-start justify-between">
                <div
                  onClick={handlePrev}
                  className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer -rotate-90 hover:bg-[#b6ede8] duration-300"
                >
                  <img src="/images/icons/Arrow-Down.png" alt="" />
                </div>
                <div
                  onClick={handleNext}
                  className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer rotate-90 hover:bg-[#b6ede8] duration-300"
                >
                  <img src="/images/icons/Arrow-Down.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {galleryArr.map((item) => (
            <div
              key={item.id}
              className="lg:w-[12.5%] md:w-1/6 sm:w-1/3 w-1/2 p-2"
            >
              <div
                onClick={() => {
                  setImgSelected(item);
                }}
                className={`bg-white rounded-sm border-4 shadow-lg cursor-pointer ${
                  imgSelected.id === item.id
                    ? "border-[#d1182b]"
                    : "border-white"
                }`}
              >
                <img src={item.src} alt="" />
              </div>
            </div>
          ))}
        </div>

        <div className="sm:px-4 mt-20">
          <div className="sm:hidden flex justify-center items-center pb-10">
            <div className="sm:hidden flex  items-center title-newProduct relative">
              <h2 className="font-semibold text-xl ">
                تصاویری که بیشترین لایک را داشته اند
              </h2>
            </div>
          </div>
          <div className=" flex justify-between items-center ">
            <div className="sm:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl ">
                تصاویری که بیشترین لایک را داشته اند
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-10">
          {new Array(16).fill(null).map((item, index) => (
            <BoxImageGallery key={index} />
          ))}
        </div>
        <div className="my-10">
          <Pagination
            style={{ direction: "ltr" }}
            align="center"
            defaultCurrent={1}
            total={76}
            defaultPageSize={20}
            showSizeChanger={false}
          />
        </div>
      </Container>
    </>
  );
}

export default BodyGallery;
