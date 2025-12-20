"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";

export default function BoxImgHome({ mainBanner }) {
  return (
    <>
      {mainBanner.length > 6 && (
        <div className="max-w-[1250px] py-0 px-[10px] my-0 mx-auto text-right BoxImgHome">
          <div className="mt-[-160px] !mb-[10px]">
            <div className="flex flex-wrap">
              <div className="md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg w-full  relative overflow-hidden ">
                  <Link href={mainBanner[0]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[0]?.image)}
                      alt={mainBanner[0]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/2 hidden md:block p-2">
                <div className="rounded-lg w-full relative overflow-hidden">
                  <Link href={mainBanner[1]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[1]?.image)}
                      alt={mainBanner[1]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg w-full relative overflow-hidden">
                  <Link href={mainBanner[2]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[2]?.image)}
                      alt={mainBanner[2]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="w-full md:hidden block p-2">
                <div className="rounded-lg relative overflow-hidden">
                  <Link href={mainBanner[1]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[1]?.image)}
                      alt={mainBanner[1]?.title}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg relative overflow-hidden">
                  <Link href={mainBanner[3]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[3]?.image)}
                      alt={mainBanner[3]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg relative overflow-hidden">
                  <Link href={mainBanner[4]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[4]?.image)}
                      alt={mainBanner[4]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg relative overflow-hidden">
                  <Link href={mainBanner[5]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[5]?.image)}
                      alt={mainBanner[5]?.title}
                    />
                  </Link>
                </div>
              </div>

              <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
                <div className="rounded-lg relative overflow-hidden">
                  <Link href={mainBanner[6]?.link || "#"}>
                    <img
                      src={getImageUrl(mainBanner[6]?.image)}
                      alt={mainBanner[6]?.title}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
