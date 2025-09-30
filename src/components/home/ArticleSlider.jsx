"use client";

import { Swiper, SwiperSlide } from "swiper/react";


import { getImageUrl } from "@/utils/mainDomain";
import moment from "moment-jalaali";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaCaretLeft, FaCaretRight, FaCircleUser } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ExpandableText from "../blog/ExpandableText";
import Loading from "../Loading";

export default function ArticleSlider({ blogs }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const formatPersianDate = (dateString) => {
    try {
      const persianMonths = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];

      const date = moment(dateString);
      const day = date.jDate();
      const month = persianMonths[date.jMonth()];
      const year = date.jYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <>
      <div className="sm:px-16 px-2 min-h-96">
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
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="w-full p-2 h-full select-none">
                <div className="relative rounded-lg group overflow-hidden h-full flex flex-col">
                  {/* <div className="absolute top-0 left-0 z-50  duration-300">
                      <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                        2.4 <FaStar className="px-1 text-xl" />
                      </span>
                    </div> */}
                  <Link
                    href={blog.url}
                    onClick={(e) => {
                      e.preventDefault();

                      startTransition(() => {
                        router.push(blog.url);
                      });
                    }}
                    className="overflow-hidden relative cursor-pointer bg-gray-100 border-none outline-none"
                  >
                    <img
                      className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] w-full h-48 object-cover border-none outline-none"
                      style={{ filter: " brightness(0.95)" }}
                      src={
                        blog.image && blog.image !== "NULL"
                          ? getImageUrl(blog.image)
                          : "/images/gallery/blog-img1.jpg"
                      }
                      alt={blog.title || ""}
                    />
                    <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                    <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                  </Link>

                  <div className="p-3 bg-white flex-grow flex flex-col">
                    <h3 className="mb-2">
                      <Link
                        className="font-bold hover:text-[#d1182b] duration-300 line-clamp-1 text-justify"
                        href={blog.url}
                        onClick={(e) => {
                          e.preventDefault();

                          startTransition(() => {
                            router.push(blog.url);
                          });
                        }}
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <div className="flex-grow">
                      <div className="text-[#000a] text-[13px] min-h-[80px] overflow-hidden !text-justify">
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
                      <div className="text-xs font-semibold">
                        {formatPersianDate(blog.created)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

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
      {isPending && <Loading />}
    </>
  );
}
