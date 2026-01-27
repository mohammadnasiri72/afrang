"use client";
import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaCartShopping,
  FaRecycle,
  FaTruck,
  FaTruckFast,
} from "react-icons/fa6";
import AddToCartButton from "./AddToCartButton";
import CompareButtonBtn from "./CompareButtonBtn";
import PriceProduct from "./PriceProduct";
import ShowImgProduct from "./ShowImgProduct";

function ProductCard({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="bg-white rounded-lg relative z-50">
        <div className="flex w-full flex-wrap items-start">
          {/* موبایل: چیدمان افقی */}
          <div className="lg:hidden w-full">
            <div className="flex gap-3 p-3">
              {/* تصویر محصول */}
              <div className="relative flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg group">
                  <Link
                    href={product.url}
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(product.url);
                    }}
                    className="relative"
                  >
                    {product.image && (
                      <Image
                        className={`object-contain rounded-lg w-24 h-24 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 ${
                          product?.statusId !== 1 && product?.conditionId === 20
                            ? "blur-xs"
                            : ""
                        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        width={96}
                        height={96}
                        priority={false}
                        unoptimized
                        onLoad={() => {
                          setIsLoaded(true);
                        }}
                        loading="lazy"
                        placeholder="blur" // اختیاری - برای افکت لود بهتر
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                      />
                    )}
                  </Link>
                  {/* تخفیف سمت چپ */}
                  {product.discount !== 0 && product.showOffPercent && (
                    <span className="absolute top-1 left-1 bg-[#d1182b] px-1.5 py-0.5 rounded-sm !text-white text-xs font-bold z-10">
                      {product.discount}%
                    </span>
                  )}
                  {/* کالای کارکرده سمت راست */}
                  {product.conditionId === 20 && (
                    <span className="absolute top-1 right-1 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-2 py-0.5 rounded-full shadow-md text-xs font-bold z-10 animate-fade-in">
                      کارکرده
                    </span>
                  )}
                </div>
                {/* دکمه های عملیاتی */}
                <div className="absolute right-2 bottom-0 overflow-hidden duration-300  flex items-center justify-center bg-white  rounded-xl shadow-lg ">
                  <div className="w-full border-l border-[#0003]">
                    <ShowImgProduct product={product} />
                  </div>
                  <div className="w-full">
                    <CompareButtonBtn id={product?.productId} />
                  </div>
                </div>
                <div
                  className={`absolute left-0 right-0 top-0 bottom-0 ${
                    isLoaded ? "!hidden" : ""
                  }`}
                >
                  <Skeleton.Image active className={`!w-full !h-full `} />
                </div>
              </div>

              {/* اطلاعات محصول */}
              <div className="flex-grow">
                <Link
                  href={product.url}
                  prefetch={false}
                  className="hover:text-[#d1182b] duration-300"
                >
                  <h2
                    data-id={product.productId}
                    className="font-semibold text-sm line-clamp-3 !mb-1 text-justify font-[YekanEn,sans-serif]! line-height-font-yekanEn"
                  >
                    {product.title}
                  </h2>
                </Link>
                <PriceProduct product={product} />
                <div className="flex items-center gap-2 mt-1">
                  {product.fastShipping && (
                    <div className="flex items-center text-xs">
                      <FaTruckFast className="text-[#898989] ml-1" />
                      <span className="text-[#666]">ارسال سریع</span>
                    </div>
                  )}
                  {product.freeShipping && (
                    <div className="flex items-center text-xs">
                      <FaTruck className="text-[#898989] ml-1" />
                      <span className="text-[#666]">ارسال رایگان</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-3">
              {product.statusDesc && (
                <div className="bg-blue-100 text-blue-700 flex justify-center rounded-sm py-1 my-2 font-bold">
                  {product.statusDesc}
                </div>
              )}
            </div>
            {/* دکمه‌های عملیات */}
            <div className="px-3 pb-3">
              {!product.canAddCart ? (
                <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm text-sm">
                  <FaCartShopping className="!text-[#000]" />
                  <span className="!text-[#000]">{product.statusTitle}</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <AddToCartButton productId={product.productId} />
                </div>
              )}
            </div>
          </div>

          {/* دسکتاپ: چیدمان اصلی */}
          <div className="hidden lg:flex w-full h-52 overflow-hidden">
            <div className=" min-w-52 max-w-52 relative flex items-start justify-center ">
              <div className="relative overflow-hidden rounded-lg group ">
                <Link href={product.url} prefetch={false} className="relative ">
                  {product.image && (
                    <Image
                      className={`object-contain! p-2! rounded-lg w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-110  ${
                        product?.statusId !== 1 && product?.conditionId === 20
                          ? "blur-xs"
                          : ""
                      } ${isLoaded ? "opacity-100" : "opacity-0"}`}
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      width={100}
                      height={100}
                      priority={false}
                      unoptimized
                      onLoad={() => {
                        setIsLoaded(true);
                      }}
                      loading="lazy"
                      placeholder="blur" // اختیاری - برای افکت لود بهتر
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                    />
                  )}
                </Link>
                {/* تخفیف سمت چپ */}
                {product.discount !== 0 && product.showOffPercent && (
                  <span className="absolute top-2 left-2 bg-[#d1182b] px-2 py-0.5 rounded-sm !text-white text-xs font-bold z-10">
                    {product.discount}%
                  </span>
                )}
                {/* کالای کارکرده سمت راست */}
                {product.conditionId === 20 && (
                  <span className="absolute top-2 right-2 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-3 py-1 rounded-full shadow-md text-xs font-bold z-10 animate-fade-in">
                    کالای کارکرده
                  </span>
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
                {/* دکمه های عملیاتی */}
                <div className="absolute right-0 bottom-0 -translate-y-1/2 overflow-hidden translate-x-full duration-300 group-hover:-translate-x-2 flex flex-col items-center justify-center w-10 bg-white  rounded-xl shadow-lg ">
                  <div className="w-full border-b border-[#0003]">
                    <ShowImgProduct product={product} />
                  </div>
                  <div className="w-full">
                    <CompareButtonBtn id={product?.productId} />
                  </div>
                </div>
              </div>
              <div
                className={`absolute left-0 right-0 top-0 bottom-0 ${
                  isLoaded ? "!hidden" : ""
                }`}
              >
                <Skeleton.Image active className={`!w-full !h-full `} />
              </div>
            </div>
            <div className="w-full flex ">
              <div className="sm:px-5 sm:py-5 px-5 w-7/12 relative flex flex-col h-full">
                <Link
                  href={product.url}
                  prefetch={false}
                  className="hover:text-[#d1182b] duration-300"
                >
                  <h2
                    data-id={product.productId}
                    className="font-semibold sm:text-lg text-sm text-justify font-[YekanEn,sans-serif]! line-height-font-yekanEn"
                  >
                    {product.title}
                  </h2>
                </Link>
                {/* {product.summary && <ExpandableText text={product.summary} />} */}
                {product.summary && (
                  <p className="text-justify line-clamp-4 text-ellipsis font-[YekanEn,sans-serif]! line-height-font-yekanEn">
                    {product.summary}
                  </p>
                )}
              </div>
              <div className=" w-5/12 bg-[#f9f9f9] lg:px-8 h-52 flex flex-col">
                <div className="flex flex-col w-full h-full flex-1">
                  <PriceProduct product={product} />
                  {product.statusDesc && (
                    <div className="bg-blue-100 text-blue-700 flex justify-center rounded-sm py-1 my-2 font-bold">
                      {product.statusDesc}
                    </div>
                  )}
                  {/* دکمه افزودن به سبد خرید یا وضعیت */}
                  <div className="w-full mb-2">
                    {!product.canAddCart && (
                      <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm">
                        <FaCartShopping className="!text-[#000]" />
                        <span className="!text-[#000]">
                          {product.statusTitle}
                        </span>
                      </button>
                    )}
                    {product.canAddCart && (
                      <div className="flex flex-col gap-2">
                        <AddToCartButton productId={product.productId} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.fastShipping && (
                      <div className="flex items-center ">
                        <FaTruckFast className="text-lg text-[#898989]" />
                        <span className="px-1 font-semibold"> ارسال سریع </span>
                      </div>
                    )}
                    {product.freeShipping && (
                      <div className="flex items-center ">
                        <FaTruck className="text-lg text-[#898989]" />
                        <span className="px-1 font-semibold">
                          {" "}
                          ارسال رایگان{" "}
                        </span>
                      </div>
                    )}
                    {product.conditionId === 20 && (
                      <div className="flex items-center text-sm text-[#d1182b] !mb-1 px-1">
                        <FaRecycle className="ml-1.5" />
                        <span className="font-semibold px-1">
                          کالای کارکرده
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
