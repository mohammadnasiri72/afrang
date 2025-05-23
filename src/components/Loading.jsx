import React from "react";
import { PuffLoader, ClipLoader } from "react-spinners";

function Loading({ fullScreen = false, navbar = false, slider = false }) {
  const loaderElement = (
    <div className="relative">
      <PuffLoader
        color="#d1182b"
        size={60}
        speedMultiplier={1}
        cssOverride={{
          display: "block",
        }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PuffLoader
          color="#18d1be"
          size={45}
          speedMultiplier={1.2}
          cssOverride={{
            display: "block",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );

  if (navbar) {
    return (
      <div className="w-full h-[48px] bg-[#d1182b] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  if (slider) {
    return (
      <div className="w-full h-[400px] bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        
        {/* Content skeleton */}
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="w-3/4 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
          
          {/* Navigation dots skeleton */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (fullScreen) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white backdrop-blur-sm flex flex-col gap-4 justify-center items-center z-[9999999]">
        {loaderElement}
        <div className="mt-4 text-gray-500 font-semibold animate-pulse">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] flex flex-col gap-2 justify-center items-center">
      {loaderElement}
      <div className="text-sm text-gray-400">لطفا صبر کنید...</div>
    </div>
  );
}

export default Loading;
