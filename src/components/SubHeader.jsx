"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const SubHeaderSkeleton = () => {
  return (
    <div className="marquee flex items-center py-3 w-full bg-teal-500 text-white text-sm">
      <div className="flex items-center gap-4 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="h-4 bg-white/30 rounded w-32" />
            <div className="h-4 bg-white/30 rounded w-48" />
            <div className="h-4 bg-white/30 rounded w-40" />
            <div className="h-4 bg-white/30 rounded w-36" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SubHeader() {
  const { settings, loading } = useSelector((state) => state.settings);

  if (loading) {
    return <SubHeaderSkeleton />;
  }

  return (
    <>
    <div className="z-[1200] relative">

      {
        settings?.find((item) => item.propertyKey === "site_marquee")
          ?.value &&
        <div
          className="marquee flex items-center py-3 w-full bg-teal-500 text-white text-sm"
          style={{ direction: "ltr" }}
        >
          <Marquee speed={50} gradient={false} direction="right">
            {settings.find((item) => item.propertyKey === "site_marquee")
              ?.value}
          </Marquee>
        </div>
      }
    </div>
    </>
  );
}
