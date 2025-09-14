"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SliderHome = ({ sliderItems }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div
      className={`slider-container h-64 overflow-hidden ${
        isDragging ? "dragging" : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      tabIndex={0}
    >
      <Slider {...settings}>
        {sliderItems.map((item) => (
          <div className="relative " key={item.id}>
            {/* <div className="w-full">
              <img
                className="h-64 w-full object-cover"
                src={`${mainDomainImg}${item.image}`}
                alt={item.title}
              />
            </div> */}
            <div className="w-full">
              <Image
                src={`${mainDomainImg}${item.image}`}
                alt={item.title}
                width={800} // عرض واقعی تصویر
                height={256} // ارتفاع واقعی تصویر (متناسب با h-64)
                className="w-full object-cover"
                style={{ height: "256px" }} // یا می‌توانید از min-h برای ارتفاع استفاده کنید
                priority={true} // اگر این تصویر جزو اولین تصاویر صفحه است
                loading="eager" // بارگذاری فوری بدون lazy loading
                quality={75} // کیفیت تصویر (75% تعادل خوبی دارد)
                placeholder="blur" // برای effect loading بهتر
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9kfa+ODhJpWlvYWA==" // یک placeholder ساده
              />
            </div>
            {item.sourceLink && item.sourceLink !== "/" ? (
              <div className="flex justify-center absolute top-4/5 left-1/2 transform -translate-x-1/2">
                <Link href={item.sourceLink}>
                  <button
                    tabIndex={-1}
                    className="bg-[#18d1be] rounded-2xl py-1.5 duration-300 hover:bg-white hover:text-[#d1182b] cursor-pointer text-[#444] font-bold px-3"
                  >
                    نمایش بیشتر
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderHome;
