import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import { useState } from "react";

function SupportBoxPhoto({ item }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Image
        className={`group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] w-full h-48 object-cover border-none outline-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={getImageUrl(item.image)}
        alt={"آیکون پشتیبانی"}
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
        className={` ${
          isLoaded ? "!hidden" : ""
        }`}
      >
        <Skeleton.Image active className={`!w-8 !h-8 `} />
      </div>
    </>
  );
}

export default SupportBoxPhoto;
