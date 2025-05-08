"use client";

import { SlBasket } from "react-icons/sl";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaCircleUser, FaStar } from "react-icons/fa6";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

export default function ArticleSlider() {
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
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full p-2">
              <div className="relative rounded-lg group overflow-hidden">
                <div className="absolute top-0 left-0 z-50  duration-300">
                  <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                    2.4 <FaStar className="px-1 text-xl" />
                  </span>
                </div>
                <div className="overflow-hidden relative cursor-pointer">
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-full"
                    // style={{ filter: " brightness(0.95)" }}
                    src="/images/gallery/news-thumb-1.jpg"
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </div>

                <div className="p-3 bg-white">
                  <h3 className="">
                    <a
                      className="font-bold  hover:text-[#d1182b] duration-300"
                      href="#"
                    >
                      دوربین Canon EOS R50
                    </a>
                  </h3>
                  <div className="">
                    <p className="text-[#000a] text-[13px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان ...
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        علیرضا ریاحی
                      </span>
                    </div>
                    <div className="text-xs font-semibold">12 اردیبهشت</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

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
