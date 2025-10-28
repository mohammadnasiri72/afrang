"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { useRouter } from "next/navigation";

function ProductMainPhotoNoLazy({ product , startTransition}) {
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
          }`}
          src={getImageUrl(product.image)}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          unoptimized
          priority={ true}
          loading={ 'eager' } 
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
    </>
  );
}

export default ProductMainPhotoNoLazy;
