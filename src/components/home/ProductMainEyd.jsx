"use client";

import { SlBasket } from "react-icons/sl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/utils/mainDomain";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import CountdownTimer from "./CountdownTimer";

export default function ProductMainEyd({ products, isMobile, setIsMobile }) {
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 639); // 768px = md breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <>
      <div className="">
        <Swiper
          grabCursor={true}
          modules={[Pagination, Navigation]}
          className={`${isMobile ? "slider-special-sale" : ""}`}
          navigation={false}
          pagination={
            !isMobile
              ? false
              : {
                  clickable: true,
                  el: ".custom-pagination", // اشاره به المنت جداگانه
                }
          }
          speed={1000}
          breakpoints={{
            1300: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 15,
            },
            1000: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10,
            },
            450: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 5,
            },
          }}
        >
          {products &&
            products.map((product, index) => (
              <SwiperSlide
                key={`${product.id || product.productId || index}-${index}`}
              >
                <div className="relative group w-full min-h-[16rem]  overflow-hidden rounded-xl bg-white shadow-md">
                  {/* تصویر */}
                  <Link
                    href={product.url}
                    className="w-full min-h-32 flex items-center justify-center bg-[#fff] overflow-hidden relative"
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
                      priority={true}
                      loading={"eager"}
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
                          src="/images/soldout.png"
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
                  <div className="flex flex-col flex-1 justify-between mt-2 ">
                    {/* عنوان */}
                    <Link
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer flex items-start h-12"
                    >
                      <h3 className=" line-clamp-2 w-full font-[YekanEn,sans-serif]! line-height-font-yekanEn">{product.title}</h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    {/* قیمت */}
                    <div className="px-2 duration-300">
                      {!product.callPriceButton && product.finalPrice !== 0 && (
                        <div className="flex flex-col pb-10 sm:pb-0">
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
                    <div className="">
                      {product.canAddCart ? (
                        <div className="bg-[#d1182b] w-full flex justify-center items-center !text-white cursor-pointer hover:bg-[#40768c] font-bold duration-300 absolute bottom-0 sm:translate-y-[90%] group-hover:translate-y-[0%]">
                          <AddToCartButtonCard productId={product.productId} />
                        </div>
                      ) : (
                        <div className="bg-[#e1e1e1] w-full flex justify-center items-center py-2 font-bold duration-300 absolute bottom-0 sm:translate-y-full group-hover:translate-y-[0%] cursor-not-allowed">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#333]">
                            {product.statusTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* تخفیف */}
                  {product.discount !== 0 && product.showOffPercent && (
                    <div className="absolute top-3 left-3 z-50 duration-300">
                      <span className="bg-[#d1182b] !text-white rounded-md px-3 py-1 ">
                        {product.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
