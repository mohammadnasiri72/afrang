"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { getCategory } from "@/services/Category/categoryService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// اسکلتون لودینگ
const CameraAccessoriesSkeleton = () => {
  return (
    <div className="box-slider-CameraAccessories pt-16 pb-48 mt-3">
      <div className="sm:px-16 px-2">
        <div className="mySwiperCamera">
          <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-between">
            {/* اسکلتون آیتم‌های اسلایدر */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
                {/* اسکلتون آیکون */}
                <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
                {/* اسکلتون عنوان */}
                <div className="mt-3 w-16 h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          {/* اسکلتون پگینیشن */}
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-2 h-2 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CameraAccessories() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  // import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategory({
          TypeId: 4,
          LangCode: "fa",
          IsHome: 1,
        });
        if (category.type === 'error') {
          Toast.fire({
            icon: "error",
            text: category.message,
          });
          return;
        } else {
          setCategory(category);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
      }
      finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (loading) {
    return <CameraAccessoriesSkeleton />;
  }

  return (
    <>
      <div className="box-slider-CameraAccessories pt-5 pb-48">
        <div className="sm:px-16 px-2">
          <Swiper
            // loop={true}
            grabCursor={true}
            modules={[Pagination]}
            className="mySwiperCamera"
            pagination={{
              clickable: true,
            }}
            speed={1000}
            breakpoints={{
              1724: {
                slidesPerView: 7,
                slidesPerGroup: 7,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 8,
              },
              100: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 5,
              },
            }}
          >
            {
              category.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={item.url} className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                      <div className="w-[50px] h-[50px] flex items-center justify-center">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px]"
                        />
                      </div>
                      <span className="text-white sm:text-xl mt-3 font-medium text-center">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </>
  );
}
