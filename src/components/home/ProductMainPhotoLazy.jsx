"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";

function ProductMainPhotoLazy({ product, startTransition }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  return (
    <>
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
          } ${isLoaded ? "opacity-100" : "opacity-0"}`}
          src={getImageUrl(product.image)}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          unoptimized
          priority={false}
          onLoad={() => {
            setIsLoaded(true);
          }}
          loading={"lazy"}
          placeholder={"blur"}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
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
        <div
          className={`absolute left-0 right-0 top-0 bottom-0 ${
            isLoaded ? "!hidden" : ""
          }`}
        >
          <Skeleton.Image active className={`!w-full !h-full `} />
        </div>
      </Link>
    </>
  );
}

export default ProductMainPhotoLazy;
