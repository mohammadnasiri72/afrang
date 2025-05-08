"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderOffers() {
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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <>
      <div
        className={`slider-container2 overflow-hidden ${
          isDragging ? "dragging" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Slider className="p-0 m-0 relative h-64" {...settings}>
          <div>
            <img
              className="h-64 w-full object-cover"
              src="/images/gallery/header-banner.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-64 w-full object-cover"
              src="/images/gallery/header-banner.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-64 w-full object-cover"
              src="/images/gallery/header-banner.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-64 w-full object-cover"
              src="/images/gallery/header-banner.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default SliderOffers;
