"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function BoxImgHome({ mainBanner }) {
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [isLoaded3, setIsLoaded3] = useState(false);
  const [isLoaded4, setIsLoaded4] = useState(false);
  const [isLoaded5, setIsLoaded5] = useState(false);
  const [isLoaded6, setIsLoaded6] = useState(false);
  const [isLoaded7, setIsLoaded7] = useState(false);

  return (
    <>
      {mainBanner.length > 6 && (
        <div className="max-w-[1250px] py-0 px-[10px] my-0 mx-auto text-right">
          <div className="mt-[-160px] mb-[10px]">
            <div className="flex flex-wrap">
              <div className="md:w-1/4 w-1/2 p-2">
                <div className="w-full border-2 border-gray-200 rounded-lg relative overflow-hidden h-[400px]">
                  <Image
                    className={`object-cover ${
                      isLoaded1 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[0]?.image)}
                    alt={mainBanner[0]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded1(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded1 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/2 hidden md:block p-2">
                <div className="w-full bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[400px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded2 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[1]?.image)}
                    alt={mainBanner[1]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded2(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded2 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="md:w-1/4 w-1/2 p-2">
                <div className="w-full bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[400px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded3 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[2]?.image)}
                    alt={mainBanner[2]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded3(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded3 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="w-full md:hidden block">
                <div className="bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[400px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded2 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[1]?.image)}
                    alt={mainBanner[1]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded2(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded2 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[200px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded4 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[3]?.image)}
                    alt={mainBanner[3]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded4(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded4 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[200px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded5 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[4]?.image)}
                    alt={mainBanner[4]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded5(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded5 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[200px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded6 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[5]?.image)}
                    alt={mainBanner[5]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded6(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded6 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden h-[200px]">
                  <Image
                    className={`w-full object-cover ${
                      isLoaded7 ? "opacity-100" : "opacity-0"
                    }`}
                    src={getImageUrl(mainBanner[6]?.image)}
                    alt={mainBanner[6]?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    unoptimized
                    priority={false}
                    onLoad={() => {
                      setIsLoaded7(true);
                    }}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R" // اختیاری
                  />
                  <div
                    className={`absolute left-0 right-0 top-0 bottom-0 ${
                      isLoaded7 ? "!hidden" : ""
                    }`}
                  >
                    <Skeleton.Image active className={`!w-full !h-full `} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
