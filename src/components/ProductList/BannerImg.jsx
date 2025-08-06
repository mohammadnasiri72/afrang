"use client";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "@/utils/mainDomain";
import { useRouter, useSearchParams } from "next/navigation";

function BannerImg({ item, id }) {
  const [isShowImg, setIsShowImg] = useState(false);

  useEffect(() => {
    if (item?.productCats?.length > 0) {
      if (item?.productCats.filter((ev) => ev === id).length > 0) {
        setIsShowImg(true);
      } else {
        setIsShowImg(false);
      }
    } else {
      setIsShowImg(true);
    }
  }, [item]);


  return (
    <>
      {isShowImg && (
        <div key={item.id} className="mt-5 rounded-lg">
          <img
            className="rounded-lg w-full"
            src={getImageUrl(item.image)}
            alt=""
          />
        </div>
      )}
    </>
  );
}

export default BannerImg;
