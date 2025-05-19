"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import Loading from "../Loading";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const getImageUrl = (image) => {
    if (!image) return defaultImage;
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return defaultImage;
    }
  };

const SupportBox = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRequested = useRef(false);

  useEffect(() => {
    const fetchSupportBoxItems = async () => {
      if (isRequested.current) return;
      isRequested.current = true;

      try {
        const response = await axios.get(`${mainDomain}/api/Item`, {
          params: {
            TypeId: 1015,
            LangCode: "fa",
            CategoryIdArray: 3227,
          },
        });

        if (response.data) {
          const sortedItems = response.data.sort(
            (a, b) => b.priority - a.priority
          );
          setItems(sortedItems);
        }
      } catch (error) {
        // Only log errors that are not aborted requests
        if (error.code !== 'ECONNABORTED') {
          console.error("Error fetching support box items:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSupportBoxItems();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="sm:px-16 px-2 bg-[#f6f6f6]">
      <div className="bg-[#18d1be] p-3 rounded-lg">
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={4}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            980: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
          }}
          spaceBetween={10}
          loop={true}
          grabCursor={true}
          modules={[Pagination, Autoplay]}
          className="mySwiperSupport"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-lg bg-white p-5 flex sm:flex-row flex-col justify-center gap-2 items-center">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.id}
                />
                <span>{item.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SupportBox;
