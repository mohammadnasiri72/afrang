"use client";

export default function SliderProductSecSkeleton() {
  return (
    <div className="flex items-center flex-wrap px-4 sm:px-16 py-8 animate-pulse">
      {/* Left: old products slider skeleton */}
      <div className="sm:w-1/2 w-full sm:pl-10">
        <div className="flex justify-between items-center pb-5">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>
        <div className="relative w-full">
          <div className="w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[85%] h-40 bg-gray-200 rounded" />
            </div>
            <div className="p-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 !mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
          <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Right: users second-hand slider skeleton */}
      <div className="sm:w-1/2 w-full sm:pr-10 sm:border-r-2 border-[#0002] sm:mt-0 mt-5">
        <div className="flex justify-between items-center pb-5">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>
        <div className="relative w-full">
          <div className="w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[85%] h-40 bg-gray-200 rounded" />
            </div>
            <div className="p-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 !mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
          <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}





