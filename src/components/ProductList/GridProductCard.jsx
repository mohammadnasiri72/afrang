"use client";
import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCartShopping, FaTruck, FaTruckFast } from "react-icons/fa6";
import AddToCartButton from "./AddToCartButton";
import CompareButtonBtn from "./CompareButtonBtn";
import ShowImgProduct from "./ShowImgProduct";

function GridProductCard({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative z-50">
        <div className="flex flex-col items-center flex-grow">
          <div className="relative w-full flex justify-center items-center group overflow-hidden">
            <Link
              href={product.url}
              prefetch={false}
              onClick={(e) => {
                e.preventDefault();
                router.push(product.url);
              }}
            >
              {product.image && (
                <Image
                  className={`w-40 h-40 object-contain rounded-lg !mb-4 ${
                    product?.statusId !== 1 && product?.conditionId === 20
                      ? "blur-xs"
                      : ""
                  } ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  width={160}
                  height={160}
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
            <div
              className={`absolute left-0 right-0 top-0 bottom-0 ${
                isLoaded ? "!hidden" : ""
              }`}
            >
              <Skeleton.Image active className={`!w-full !h-full `} />
            </div>
            {/* کالای کارکرده سمت راست */}
            {product.conditionId === 20 && (
              <span className="absolute top-0 right-0 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-2 py-0.5 rounded-full shadow-md text-xs font-bold z-10 animate-fade-in">
                کارکرده
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
            {/* تخفیف سمت چپ */}
            {product.discount !== 0 && product.showOffPercent && (
              <span className="absolute top-0 left-0 bg-[#d1182b] px-2 py-0.5 rounded-sm !text-white text-xs font-bold z-10">
                {product.discount}%
              </span>
            )}
            {/* دکمه های عملیاتی */}
            <div className="absolute right-0 bottom-0 -translate-y-1/2 overflow-hidden sm:translate-x-full -translate-x-2 duration-300 group-hover:-translate-x-2 flex flex-col items-center justify-center w-10 bg-white  rounded-xl shadow-lg ">
              <div className="w-full border-b border-[#0003]">
                <ShowImgProduct product={product} />
              </div>
              <div className="w-full">
                <CompareButtonBtn id={product?.productId} />
              </div>
            </div>
          </div>
          <Link
            href={product.url}
            prefetch={false}
            onClick={(e) => {
              e.preventDefault();
              router.push(product.url);
            }}
            className="font-semibold text-lg text-center !mb-2 line-clamp-3 hover:text-[#d1182b] duration-300"
          >
            <h2 data-id={product.productId} className="text-justify">
              {product.title}
            </h2>
          </Link>
          <div className="flex items-center justify-center gap-3 !mb-2">
            {product.fastShipping && (
              <Tooltip title="ارسال سریع" placement="top">
                <FaTruckFast className="text-2xl text-[#d1182b] cursor-pointer" />
              </Tooltip>
            )}
            {product.freeShipping && (
              <Tooltip title="ارسال رایگان" placement="top">
                <FaTruck className="text-2xl text-[#40768c] cursor-pointer" />
              </Tooltip>
            )}
          </div>
          {product.statusId === 1 && product.discount > 0 && (
            <div className="flex flex-col items-center !mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xl text-[#d1182b]">
                  {product?.finalPrice?.toLocaleString()}
                </span>
                <span className="text-[#555]">تومان</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-[#222]">
                  {product?.price1?.toLocaleString()}
                </span>
                {product.showOffPercent && (
                  <span className="text-white bg-[#d1182b] px-2 py-0.5 rounded-sm text-sm">
                    {product.discount}%
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="mt-auto w-full space-y-2 flex flex-col justify-center items-center">
            {product.statusId === 1 && product.discount === 0 && (
              <div className="flex items-center gap-2 !mb-4">
                {product?.price1 !== 0 && (
                  <div>
                    <span className="font-semibold text-xl">
                      {product?.price1?.toLocaleString()}
                    </span>
                    <span className="text-[#555] px-1">تومان</span>
                  </div>
                )}
                {product?.price1 === 0 && (
                  <div>
                    <span className="text-[#555]">بدون قیمت</span>
                  </div>
                )}
              </div>
            )}
            {product.statusDesc && (
              <div className="bg-blue-100 text-blue-700 flex justify-center rounded-sm py-1 my-2 font-bold w-full">
                {product.statusDesc}
              </div>
            )}
            {product.canAddCart ? (
              <>
                <AddToCartButton productId={product.productId} />
                {/* <CompareButton id={product?.productId} /> */}
              </>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 bg-[#e1e1e1] !text-[#000] py-2 rounded-sm">
                <FaCartShopping />
                <span>{product.statusTitle}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GridProductCard;
