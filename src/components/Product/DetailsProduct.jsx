"use client";

import { useRef, useState } from "react";

function DetailsProduct({product}) {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);


  return (
    <>
      <div className="py-9 px-7">
        <h5 className="font-semibold text-[13px]">
          دوربـــین دیجـــیتال کانن مدل EOS 4000D به همراه لنز 18-55 میلی متر DC
          III
        </h5>
        <p className="text-[#444] mt-3">
          کیت فیلمبرداری شولدر مت باکس مدل Rl-03 به همراه فولو فوکوس، مناسب برای
          فیلم برداری در هنگام حرکت می باشد. این کیت فیلم برداری با وزن بسیار
          سبک، دارای تنظیم کننده ی فوکوس می باشد که با تکیه به شانه تصاویری بدون
          ارزش ارائه می دهد.
        </p>
        <img className="w-full mt-2" src="/images/gallery/pic11.jpg" alt="" />
        <div
          ref={contentRef}
          style={{
            maxHeight: showMore
              ? `${contentRef.current?.scrollHeight}px`
              : '0px',
          }}
  
          className={`mt-3 text-[#444] overflow-hidden duration-500 `}
        >
          <p>
            کیت فیلمبرداری شولدر مت باکس مدلیت فیلمبرداری شولدر مت باکس مدل
            Rl-03 به همراه فولو فوکوس، مناسب برای فیلم برداری در هنگام حرکت می
            باشد. این کیت فیلم برداری با وزن بسیار سبک، دارای تنظیم کننده ی
            فوکوس می باشد که با تکیه به شانه تصاویری بدون ارزش ارائه می دهد.
            Rl-03 به همراه فولو فوکوس، مناسب برای فیلم برداری در هنگام حرکت می
            باشد. این کیت فیلم برداری با وزن بسیار سبک، دارای تنظیم کننده ی
            فوکوس می باشد که با تکیه به شانه تصاویری بدون ارزش ارائه می دهد.
          </p>
          <p>
            کیت فیلمبرداری شولدر مت باکس مدل Rl-03 به همراه فولو فوکوس، مناسب
            برای فیلم برداری در هنگام حرکت می باشد. این کیت فیلم برداری با وزن
            بسیار سبک، دارای تنظیم کننده ی فوکوس می باشد که با تکیه به شانه
            تصاویری بدون ارزش ارائه می دهد.
          </p>
         
        </div>
        <div
          onClick={() => {
            setShowMore((e) => !e);
          }}
          className="flex items-center cursor-pointer group mt-3 px-2"
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
      </div>
    </>
  );
}

export default DetailsProduct;
