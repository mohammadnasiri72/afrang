import React from "react";

export default function BoxImgHome() {
  return (
    <>
      <div className="max-w-[1250px] py-0 px-[10px] my-0 mx-auto text-right">
        <div className="mt-[-160px] mb-[50px]">
          <div className="flex flex-wrap">
            <div className="md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-1.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 hidden md:block p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-2.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-3.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-full md:hidden block">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-2.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-4.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-5.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-6.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full mb-[15px]">
                <a href="#">
                  <img
                    className="w-full h-full"
                    src="/images/gallery/cat-banner-7.png"
                    alt="#"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
