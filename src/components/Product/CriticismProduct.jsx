"use client";

import { Divider } from "antd";
import { useRef, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";

function CriticismProduct() {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  return (
    <>
      <div
        ref={contentRef}
        style={{
          maxHeight: showMore
            ? `${contentRef.current?.scrollHeight}px`
            : "230px",
        }}
        className="pr-20 mt-10 overflow-hidden duration-500"
      >
        <div className="flex items-center">
          <img
            className="w-10"
            src="/images/icons/user-image-sample.png"
            alt=""
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>12 اسفند 1400</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3">
          من بیشتر برای فیلم برداری دوربین نیاز دارم،آیا این دوربین مناسب هست؟
        </p>
        <div className="flex items-center pr-20 my-5">
          <img className="w-10" src="/images/icons/user-image.png" alt="" />
          <div className="flex flex-col px-3">
            <span className="font-bold">امیر در پاسخ به علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>02-8-15</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3 pr-20">
          نه پیشنهاد نمیشه 250.800.850کنون و سری 6000 سونی بهترن برای فیلم{" "}
        </p>
        <Divider />
        <div className="flex items-center my-5">
          <img
            className="w-10"
            src="/images/icons/user-image-sample.png"
            alt=""
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>12 اسفند 1400</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3">
          من بیشتر برای فیلم برداری دوربین نیاز دارم،آیا این دوربین مناسب هست؟
        </p>
        <Divider />
        <div className="flex items-center my-5">
          <img
            className="w-10"
            src="/images/icons/user-image-sample.png"
            alt=""
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>12 اسفند 1400</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3">
          من بیشتر برای فیلم برداری دوربین نیاز دارم،آیا این دوربین مناسب هست؟
        </p>
        <Divider />
        <div className="flex items-center my-5">
          <img
            className="w-10"
            src="/images/icons/user-image-sample.png"
            alt=""
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>12 اسفند 1400</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3">
          من بیشتر برای فیلم برداری دوربین نیاز دارم،آیا این دوربین مناسب هست؟
        </p>
        <Divider />
        <div className="flex items-center my-5">
          <img
            className="w-10"
            src="/images/icons/user-image-sample.png"
            alt=""
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">علیرضا</span>
            <div className="flex items-center font-semibold gap-3 text-[#666]">
              <span>12 اسفند 1400</span>
              <span>11:22</span>
            </div>
          </div>
        </div>
        <p className="mt-3">
          من بیشتر برای فیلم برداری دوربین نیاز دارم،آیا این دوربین مناسب هست؟
        </p>
      </div>

      <div
        onClick={() => {
          setShowMore((e) => !e);
        }}
        className="flex items-center cursor-pointer group mt-3 pr-20"
      >
        <span className="group-hover:text-[#18d1be] text-[#40768c] duration-300 font-semibold">
          {showMore ? "نمایش کمتر" : "نمایش بیشتر"}
        </span>
        <img
          style={{ rotate: showMore ? "90deg" : "0deg" }}
          className="-translate-x-1 group-hover:translate-x-0 duration-300"
          src="/images/icons/Arrow-Left.png"
          alt=""
        />
      </div>

      <div className="mt-10 bg-[#f6f6f6] py-3"></div>
      <div className=" bg-white rounded-lg mt-3 px-8 py-3">
        <h5 className="font-bold text-[#173a4e] text-[16px]">ثبت دیدگاه</h5>
        <p className="font-bold text-[#173a4e] text-[14px] mt-5">نام</p>
        <div className="w-full mt-3">
          <input
            className="w-full outline-none bg-[#f7f7f7] px-5 h-12 rounded-sm focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
            type="text"
            placeholder="لطفا نام خود را وارد کنید"
          />
        </div>
        <p className="font-bold text-[#173a4e] text-[14px] mt-5">دیدگاه</p>
        <div className="mt-3">
          <textarea
            className="w-full outline-none bg-[#f7f7f7] px-5 py-2 h-36 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg"
            placeholder="لطفا دیدگاه خود را وارد کنید"
            name=""
            id=""
          ></textarea>
        </div>
        <div className="mt-5 flex mb-20">
          <button className="bg-[#18d1be] !text-white cursor-pointer relative group rounded-lg px-5 py-2.5 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 rounded-lg left-full group-hover:left-0 bg-[#d1182b] duration-300"></div>
            <div className="flex items-center">
              <BiMessageSquareDetail className="text-lg !text-white relative" />
              <span className="relative px-1 font-semibold">ثبت کردن</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default CriticismProduct;
