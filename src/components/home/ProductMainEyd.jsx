"use client";

import { SlBasket } from "react-icons/sl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import Loading from "../Loading";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import ProductMainPhotoLazy from "./ProductMainPhotoLazy";
import ProductMainPhotoNoLazy from "./ProductMainPhotoNoLazy";
import Image from "next/image";
import CountdownTimer from "./CountdownTimer";
import { getImageUrl } from "@/utils/mainDomain";

export default function ProductMainEyd({ products, noLazy }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

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
          className={`${isMobile ? "mySwiperProduct" : ""}`}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={
            !isMobile
              ? false
              : {
                  clickable: true,
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
                    onClick={(e) => {
                      e.preventDefault();

                      startTransition(() => {
                        router.push(product.url);
                      });
                    }}
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
                      onClick={(e) => {
                        e.preventDefault();

                        startTransition(() => {
                          router.push(product.url);
                        });
                      }}
                      href={product.url}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer flex items-start h-12"
                    >
                      <h3 className=" line-clamp-2 w-full">{product.title}</h3>
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
                            {product.statusDesc}
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
          <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="custom-prev bg-[#ddd] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretRight className="text-2xl cursor-pointer " />
            </div>
            <div className=" custom-next bg-[#ddd] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretLeft className="text-2xl cursor-pointer" />
            </div>
          </div>
        </Swiper>
      </div>
      {isPending && <Loading />}
    </>
  );
}
