import { getImageUrl2 } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import { useState } from "react";

function SliderProductSecPhoto({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Image
        className={`w-full object-contain ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={getImageUrl2(product.image)}
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
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 ${
          isLoaded ? "!hidden" : ""
        }`}
      >
        <Skeleton.Image active className={`!w-full !h-full `} />
      </div>
    </>
  );
}

export default SliderProductSecPhoto;
