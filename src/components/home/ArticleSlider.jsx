"use client";


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getItem } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import moment from "moment-jalaali";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ExpandableText from "../blog/ExpandableText";

// اسکلتون لودینگ
const ArticleSliderSkeleton = () => {
  return (
    <div className="animate-pulse sm:px-16 px-2">
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="w-full p-2 h-full">
              <div className="relative rounded-lg group overflow-hidden h-full flex flex-col bg-white">
                {/* اسکلتون تصویر */}
                <div className="overflow-hidden relative bg-gray-200">
                  <div className="w-full h-48 bg-gray-200"></div>
                </div>

                {/* اسکلتون محتوا */}
                <div className="p-3 bg-white flex-grow flex flex-col">
                  {/* اسکلتون عنوان */}
                  <div className="mb-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* اسکلتون متن */}
                  <div className="flex-grow">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>

                  {/* اسکلتون فوتر */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded mr-2"></div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* اسکلتون دکمه‌های ناوبری */}
        <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default function ArticleSlider() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const getBlogsArticle = async () => {
      try {
        const items = await getItem({
          TypeId: 5,
          LangCode: "fa",
          PageSize: 12,
          PageIndex: 1,
          OrderBy: 1,
        });
        if (items.type === 'error') {
          Toast.fire({
            icon: "error",
            text: items.message,
          });
          return;
        }
        else {
          setBlogs(items);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
      } finally {
        setLoading(false);
      }
    };

    getBlogsArticle();
  }, []);


  const formatPersianDate = (dateString) => {
    try {
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];

      const date = moment(dateString);
      const day = date.jDate();
      const month = persianMonths[date.jMonth()];
      const year = date.jYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  if (loading) {
    return <ArticleSliderSkeleton />;
  }

  return (
    <>
      <div className="sm:px-16 px-2">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          grabCursor={true}
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={2000}
          className="mySwiperProduct"
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
          }}
        >
          {
            blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="w-full p-2 h-full select-none">
                  <div className="relative rounded-lg group overflow-hidden h-full flex flex-col">
                    {/* <div className="absolute top-0 left-0 z-50  duration-300">
                      <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                        2.4 <FaStar className="px-1 text-xl" />
                      </span>
                    </div> */}
                    <Link href={blog.url} className="overflow-hidden relative cursor-pointer bg-gray-100 border-none outline-none">
                      <img
                        className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] w-full h-48 object-cover border-none outline-none"
                        style={{ filter: " brightness(0.95)" }}
                        src={(blog.image && blog.image !== "NULL") ? getImageUrl(blog.image) : "/images/gallery/blog-img1.jpg"}
                        alt={blog.title || ""}
                      />
                      <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                      <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                    </Link>

                    <div className="p-3 bg-white flex-grow flex flex-col">
                      <h3 className="mb-2">
                        <Link
                          className="font-bold hover:text-[#d1182b] duration-300 line-clamp-1"
                          href={blog.url}
                        >
                          {blog.title}
                        </Link>
                      </h3>
                      <div className="flex-grow">
                        <div className="text-[#000a] text-[13px] min-h-[80px] overflow-hidden">
                          <ExpandableText text={blog.summary} maxLength={120} />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <FaCircleUser className="text-xs text-[#d1182b]" />
                          <span className="text-xs font-semibold px-1">
                            خانه عکاسان افرنگ
                          </span>
                        </div>
                        <div className="text-xs font-semibold">{formatPersianDate(blog.created)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }

          <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretRight className="text-2xl cursor-pointer" />
            </div>
            <div className=" custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretLeft className="text-2xl cursor-pointer" />
            </div>
          </div>
        </Swiper>
      </div>
    </>
  );
}
