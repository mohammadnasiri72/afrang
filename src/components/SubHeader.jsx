"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

export default function SubHeader() {
  const { settings } = useSelector((state) => state.settings);

  return (
    <>
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
    </>
  );
}
