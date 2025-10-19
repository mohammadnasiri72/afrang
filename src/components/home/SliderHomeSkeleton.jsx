"use client";

export default function SliderHomeSkeleton() {
  return (
    <div className="relative w-full h-64 slider-homePage animate-pulse">
      <div className="inner-curve w-full h-full overflow-hidden">
        <div className="w-full h-full bg-gray-200" />
      </div>

      <div className="custom-swiper-pagination absolute right-5 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-2">
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}



