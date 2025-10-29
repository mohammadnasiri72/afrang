"use client";

import { SlBasket } from "react-icons/sl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaRecycle } from "react-icons/fa";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { Grid, Navigation, Pagination } from "swiper/modules";
import Loading from "../Loading";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import CountdownTimer from "../home/CountdownTimer";

function RelatedProductsMobile({ products }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <Swiper
        loop={true}
        grabCursor={true}
        modules={[Pagination, Navigation, Grid]}
        className="mySwiperProduct"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
        }}
        speed={1000}
        grid={{
          rows: 2,
          fill: "row",
        }}
        slidesPerView={2}
        slidesPerGroup={4}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            grid: { rows: 1 },
            spaceBetween: 10,
          },
          850: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: { rows: 1 },
            spaceBetween: 8,
          },
          100: {
            slidesPerView: 2,
            slidesPerGroup: 4,
            grid: { rows: 2 },
            spaceBetween: 5,
          },
        }}
      >
        {products &&
          products.map((product, index) => (
            <SwiperSlide
              key={`${product.id || product.productId || index}-${index}`}
            >
              <div className="relative group w-full overflow-hidden rounded-lg bg-white">
                <div className="">
                  {product.discount !== 0 && product.showOffPercent && (
                    <div className="absolute top-3 left-3 z-50 duration-300">
                      <span className="bg-[#d1182b] !text-white rounded-md px-3 py-1 ">
                        {product.discount}%
                      </span>
                    </div>
                  )}
                  <Link
                    href={product.url}
                    onClick={(ev) => {
                      ev.preventDefault();
                      startTransition(() => {
                        router.push(product.url);
                      });
                    }}
                  >
                    <img
                      className="group-hover:scale-110 scale-100 duration-1000 w-full h-56 object-contain flex items-center justify-center"
                      // style={{ filter: " brightness(0.95)" }}
                      src={getImageUrl(product.image)}
                      alt={product.title}
                    />
                  </Link>
                  <div className="p-4">
                    {product.salePlanTimer && (
                      <CountdownTimer targetDate={product.salePlanTimer} />
                    )}
                    <Link
                      href={product.url}
                      onClick={(ev) => {
                        ev.preventDefault();
                        startTransition(() => {
                          router.push(product.url);
                        });
                      }}
                      className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer "
                    >
                      <p className="text-justify">{product.title}</p>
                    </Link>
                    {product.conditionId === 20 && (
                      <div className="flex items-center text-sm text-[#d1182b] py-2 px-1">
                        <FaRecycle className="ml-1.5" />
                        <span className="font-semibold whitespace-nowrap">
                          کالای کارکرده
                        </span>
                      </div>
                    )}
                    {!product.callPriceButton && product.finalPrice !== 0 && (
                      <div>
                        <div className="sm:flex flex-wrap hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through">
                              {product.price1.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden flex flex-wrap justify-between items-center p-2 mt-3 duration-300  bottom-10 left-0 right-0 absolute">
                          <span className="font-bold text-lg text-[#333] whitespace-nowrap">
                            {product.finalPrice.toLocaleString()} تومان
                          </span>
                          {product.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through whitespace-nowrap">
                              {product.price1.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {!product.callPriceButton && product.finalPrice === 0 && (
                      <div>
                        <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            بدون قیمت
                          </span>
                        </div>
                        <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            بدون قیمت
                          </span>
                        </div>
                      </div>
                    )}
                    {product.callPriceButton && (
                      <div>
                        <div className="sm:flex hidden justify-between items-center p-2 mt-3 opacity-100 group-hover:opacity-0 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            تماس بگیرید
                          </span>
                        </div>
                        <div className="sm:hidden flex  justify-between items-center p-2 mt-3 duration-300 absolute bottom-2 left-0 right-0">
                          <span className="font-bold text-lg text-[#333]">
                            تماس بگیرید
                          </span>
                        </div>
                      </div>
                    )}

                    {product.canAddCart && (
                      <div>
                        <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center !text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-[#40768c] font-bold">
                          <AddToCartButtonCard productId={product.productId} />
                        </div>
                        <div className="bg-[#d1182b] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center !text-white rounded-b-lg  duration-300 cursor-pointer hover:bg-[#40768c] font-bold absolute">
                          <AddToCartButtonCard productId={product.productId} />
                        </div>
                      </div>
                    )}

                    {!product.canAddCart && (
                      <div>
                        <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 !text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute font-bold">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#666]">
                            {product.statusDesc}
                          </span>
                        </div>
                        <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex  justify-center items-center py-2 !text-white rounded-b-lg  duration-300 font-bold absolute">
                          <SlBasket className="text-xl text-[#333]" />
                          <span className="px-1 text-[#666]">
                            {product.statusDesc}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
          <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretRight className="text-2xl cursor-pointer " />
          </div>
          <div className=" custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
            <FaCaretLeft className="text-2xl cursor-pointer" />
          </div>
        </div>
      </Swiper>
      {isPending && <Loading />}
    </>
  );
}

export default RelatedProductsMobile;
