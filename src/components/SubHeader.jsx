"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

export default function SubHeader() {
  const popupsList = useSelector((state) => state.popups.popupsList);
  const [dataSubHeader, setDataSubHeader] = useState({});
  const pathname = usePathname();
  
  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  useEffect(() => {
    if (popupsList.length > 0) {
      setDataSubHeader(popupsList.find((e) => e.category === "popup_header"));
    }
  }, [popupsList]);

  return (
    <>
      {(dataSubHeader.showInPage === "all" ||
        (dataSubHeader.showInPage === "main" && pathname === "/")) && (
        <div className="z-[1200] relative">
          {dataSubHeader.id && (
            <div
              className={`marquee flex items-center py-3 w-full text-white text-sm`}
              style={{
                direction: "ltr",
                backgroundColor: dataSubHeader.backgroundColor,
              }}
            >
              <Marquee speed={50} gradient={false} direction="right">
                <div style={{
                  color:dataSubHeader.color
                }}
                  className="sm:block hidden"
                  dangerouslySetInnerHTML={renderHTML(
                    dataSubHeader.desktopBody
                  )}
                />
                <div style={{
                  color:dataSubHeader.color
                }}
                  className="sm:hidden block"
                  dangerouslySetInnerHTML={renderHTML(dataSubHeader.mobileBody)}
                />
              </Marquee>
            </div>
          )}
        </div>
      )}
     
    </>
  );
}
