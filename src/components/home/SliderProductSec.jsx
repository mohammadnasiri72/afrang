"use client";

import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl, getImageUrl2 } from "@/utils/mainDomain";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaCaretLeft,
    FaSearch,
} from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import Loading from "../Loading";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";

export default function SliderProductSec({ oldProducts, productsData }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center flex-wrap px-4 sm:px-16 py-8 ">
      <div className="sm:w-1/2 w-full sm:pl-10 ">
        <div className="flex justify-between items-center pb-5">
          <div className="flex-wrap gap-4 items-center">
            <h2 className="title-newProduct relative text-[#222] duration-300 text-lg font-semibold">
              دست دوم های افــــرنـــــگ
            </h2>
          </div>
          <div
            onClick={() => {
              router.push(`/products?conditionId=20&orderby=2`);
            }}
            className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
        </div>
        <div className="relative w-full ">
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 450,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: ".creative-next",
              prevEl: ".creative-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 1 },
              1280: { slidesPerView: 2 },
            }}
            className="relative"
          >
            {oldProducts.map((product) => (
              <SwiperSlide key={product.id} className="group cursor-pointer">
                <div className="relative group w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
                  {/* تصویر */}
                  <Link
                    onClick={(e) => {
                      e.preventDefault();

                      startTransition(() => {
                        router.push(product.url);
                      });
                    }}
                    href={product.url}
                    className="w-full min-h-40 sm:min-h-56 flex items-center justify-center bg-[#fff] overflow-hidden relative"
                  >
                    <Image
                      className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain ${
                        product?.statusId !== 1 && product?.conditionId === 20
                          ? "blur-xs"
                          : ""
                      }`}
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />
                    {/* لیبل کالای کارکرده */}
                    {product.conditionId === 20 && (
                      <div className="absolute top-2 right-2 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                        {/* <FaRecycle className="ml-1 text-base" /> */}
                        کالای کارکرده
                      </div>
                    )}
                    {/* فروخته شد*/}
                    {product?.statusId !== 1 && product?.conditionId === 20 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full select-none z-10">
                        <img
                          draggable="false"
                          className="w-36"
                          src="/public/images/soldout.png"
                          alt=""
                        />
                      </div>
                    )}
                    {/* تایمر */}
                    {product.salePlanTimer && (
                      <div className="absolute bottom-0 ">
                        <CountdownTimer targetDate={product.salePlanTimer} />
                      </div>
                    )}
                  </Link>
                  {/* محتوا */}
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    {/* عنوان */}
                    <Link
                      onClick={(e) => {
                        e.preventDefault();

                        startTransition(() => {
                          router.push(product.url);
                        });
                      }}
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer min-h-[70px] flex items-start"
                    >
                      <h3 className="text-justify line-clamp-3 w-full">
                        {product.title}
                      </h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    {/* قیمت */}
                    <div className="h-[4.5rem] px-2 duration-300">
                      {!product.callPriceButton && product.finalPrice !== 0 && (
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300 group-hover:text-lg ">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333] font-semibold text-sm line-through">
                              {product.price1.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                      {!product.callPriceButton && product.finalPrice === 0 && (
                        <span className="font-bold text-base text-[#333]">
                          بدون قیمت
                        </span>
                      )}
                      {product.callPriceButton && (
                        <span className="font-bold text-base text-[#333]">
                          تماس بگیرید
                        </span>
                      )}
                    </div>
                    {/* دکمه افزودن به سبد یا وضعیت */}
                    <div className=" ">
                      {product.canAddCart ? (
                        <div className="bg-[#d1182b] w-full flex justify-center items-center text-white cursor-pointer hover:bg-[#40768c] font-bold duration-300 sm:absolute relative bottom-0 sm:translate-y-[90%] group-hover:translate-y-[0%]">
                          <AddToCartButtonCard productId={product.productId} />
                        </div>
                      ) : (
                        <div className="bg-[#e1e1e1] w-full flex justify-center items-center py-2 font-bold duration-300 sm:absolute relative bottom-0 sm:translate-y-full group-hover:translate-y-[0%] cursor-not-allowed">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#333]">
                            {product.statusDesc}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* تخفیف */}
                  {product.discount !== 0 && (
                    <div className="absolute top-3 left-3 z-50 duration-300">
                      <span className="bg-[#d1182b] text-white rounded-md px-3 py-1 ">
                        {product.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}

            <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-[#d1182b] hover:text-white">
              <FaAngleLeft size={24} className="pointer-events-none" />
            </div>
            <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-[#d1182b] hover:text-white">
              <FaAngleRight size={24} className="pointer-events-none" />
            </div>
          </Swiper>

          {isPending && <Loading />}
        </div>
      </div>

      <div className="sm:w-1/2 w-full sm:pr-10 sm:border-r-2 border-[#0002] sm:mt-0 mt-5">
        <div className="flex justify-between items-center pb-5">
          <div className="flex-wrap gap-4 items-center">
            <h2 className="title-SecondHand relative text-[#222] duration-300 text-lg font-semibold">
              دست دوم های کاربران
            </h2>
          </div>
          <div
            onClick={() => {
              router.push(`/useds/-1`);
            }}
            className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
        </div>
        <div className="relative w-full ">
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 450,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: ".creative-next",
              prevEl: ".creative-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 1 },
              1280: { slidesPerView: 2 },
            }}
            className="relative"
          >
            {productsData.map((product) => (
              <SwiperSlide key={product.id} className="group cursor-pointer">
                {/* <div className="relative sm:min-h-[22rem] min-h-[23rem] group w-full pb-2 overflow-hidden rounded-xl bg-white shadow-md">
                  <Link
                    href={product.url ? product.url : "#"}
                    onClick={(e) => {
                      e.preventDefault();

                      startTransition(() => {
                        router.push(product.url);
                      });
                    }}
                    className="w-full min-h-40 flex items-center justify-center bg-[#fff] overflow-hidden relative"
                  >
                    <Image
                      className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain`}
                      src={getImageUrl2(product.image)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />

                    <div className="absolute top-2 right-2 bg-[#fff] border border-[#40768c] text-[#40768c] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                      دست دوم کاربران
                    </div>
                  </Link>
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    <Link
                      href={product.url ? product.url : "#"}
                      onClick={(e) => {
                        e.preventDefault();

                        startTransition(() => {
                          router.push(product.url);
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer flex items-start"
                    >
                      <h3 className="text-justify line-clamp-1 w-full font-bold text-[16px]">
                        {product.title}
                      </h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    <div className="px-2 duration-300">
                      {product.price !== 0 && (
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300">
                            {product.price.toLocaleString()} تومان
                          </span>
                        </div>
                      )}
                      {product.price === 0 && (
                        <span className="font-bold text-base text-[#333]">
                          توافقی (تماس بگیرید)
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="relative group w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
                  {/* تصویر */}
                  <Link
                    onClick={(e) => {
                      e.preventDefault();

                      startTransition(() => {
                        router.push(product.url);
                      });
                    }}
                    href={product.url}
                    className="w-full min-h-40 sm:min-h-56 flex items-center justify-center bg-[#fff] overflow-hidden relative"
                  >
                    <Image
                      className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain ${
                        product?.statusId !== 1 && product?.conditionId === 20
                          ? "blur-xs"
                          : ""
                      }`}
                      src={getImageUrl2(product.image)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />
                    {/* لیبل دست دوم کاربران */}
                    <div className="absolute top-2 right-2 bg-[#fff] border border-[#40768c] text-[#40768c] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                      دست دوم کاربران
                    </div>
                  </Link>

                  {/* محتوا */}
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    {/* عنوان */}
                    <Link
                      onClick={(e) => {
                        e.preventDefault();

                        startTransition(() => {
                          router.push(product.url);
                        });
                      }}
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer min-h-[70px] flex items-start"
                    >
                      <h3 className="text-justify line-clamp-3 w-full">
                        {product.title}
                      </h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    {/* قیمت */}
                    <div className="h-[4.5rem] px-2 duration-300">
                      <div className="px-2 duration-300">
                        {product.price !== 0 && (
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300">
                              {product.price.toLocaleString()} تومان
                            </span>
                          </div>
                        )}
                        {product.price === 0 && (
                          <span className="font-bold text-base text-[#333]">
                            توافقی (تماس بگیرید)
                          </span>
                        )}
                      </div>
                    </div>
                    {/* دکمه افزودن به سبد یا وضعیت */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        startTransition(() => {
                          router.push(product.url);
                        });
                      }}
                      className="bg-[#e1e1e1] w-full flex justify-center items-center py-2 font-bold duration-300 sm:absolute relative bottom-0 sm:translate-y-full group-hover:translate-y-[0%]"
                    >
                      <FaSearch className="text-xl text-[#333]" />
                      <span className="px-1 text-[#333]">جزئیات</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-[#d1182b] hover:text-white">
              <FaAngleLeft size={24} className="pointer-events-none" />
            </div>
            <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/30 backdrop-blur-md rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-[#d1182b] hover:text-white">
              <FaAngleRight size={24} className="pointer-events-none" />
            </div>
          </Swiper>

          {isPending && <Loading />}
        </div>
      </div>
    </div>
  );
}
