import React from "react";
import { PuffLoader } from "react-spinners";

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

 

  return (
    // <div className="w-full h-full min-h-[200px] flex flex-col gap-2 justify-center items-center">
    //   {loaderElement}
    //   <div className="text-sm text-gray-400">لطفا صبر کنید...</div>
    // </div>
     <div className="fixed inset-0 bg-[#fff] flex items-center justify-center !z-[10000000000000] transition-opacity duration-300">
          {loaderElement}
        </div>
  );
}

export default Loading;
