"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { fetchSliderItems } from "@/services/sliderService";
import Loading from "@/components/Loading";

const SliderHome = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderItems, setSliderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRequested = useRef(false);

  useEffect(() => {
    const getSliderItems = async () => {
      if (isRequested.current) return;
      isRequested.current = true;

      try {
        const items = await fetchSliderItems();
        if (items) {
          setSliderItems(items);
        }
      } catch (error) {
        console.error('Error fetching slider items:', error);
      } finally {
        setLoading(false);
      }
    };

    getSliderItems();
  }, []);

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

  if (loading) {
    return <Loading slider={true} />;
  }

  return (
    <div
      className={`slider-container ${isDragging ? "dragging" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Slider {...settings}>
        {sliderItems.map((item) => (
          <div key={item.id}>
            <img
              className="h-64 w-full object-cover"
              src={`https://afrangadmin.aitest2.ir${item.image}`}
              alt={item.title}
            />
            {item.sourceLink && item.sourceLink !== "/" ? (
              <div className="flex justify-center">
                <Link href={item.sourceLink}>
                  <button className="bg-[#18d1be] rounded-2xl py-1.5 duration-300 hover:bg-white hover:text-[#d1182b] cursor-pointer text-[#444] font-bold translate-y-[-150%] px-3">
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
