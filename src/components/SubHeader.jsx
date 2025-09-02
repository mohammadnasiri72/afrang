"use client";

import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";

export default function SubHeader({ popupsList }) {
  const pathname = usePathname();

  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <div className="hidden">
        <h4>{popupsList.find((e) => e.category === "popup_header").title}</h4>
        <div
          style={{
            color: popupsList.find((e) => e.category === "popup_header").color,
          }}
          className="sm:block hidden"
          dangerouslySetInnerHTML={renderHTML(
            popupsList.find((e) => e.category === "popup_header").desktopBody
          )}
        />
        <div
          style={{
            color: popupsList.find((e) => e.category === "popup_header").color,
          }}
          className="sm:hidden block"
          dangerouslySetInnerHTML={renderHTML(
            popupsList.find((e) => e.category === "popup_header").mobileBody
          )}
        />
      </div>
      {(popupsList.find((e) => e.category === "popup_header").showInPage ===
        "all" ||
        (popupsList.find((e) => e.category === "popup_header").showInPage ===
          "main" &&
          pathname === "/")) && (
        <div className="z-[1200] relative">
          {popupsList.find((e) => e.category === "popup_header").id && (
            <div
              className={`marquee flex items-center py-3 w-full text-white text-sm`}
              style={{
                direction: "ltr",
                backgroundColor: popupsList.find(
                  (e) => e.category === "popup_header"
                ).backgroundColor,
              }}
            >
              <Marquee speed={50} gradient={false} direction="right">
                <div
                  style={{
                    color: popupsList.find((e) => e.category === "popup_header")
                      .color,
                  }}
                  className="sm:block hidden"
                  dangerouslySetInnerHTML={renderHTML(
                    popupsList.find((e) => e.category === "popup_header")
                      .desktopBody
                  )}
                />
                <div
                  style={{
                    color: popupsList.find((e) => e.category === "popup_header")
                      .color,
                  }}
                  className="sm:hidden block"
                  dangerouslySetInnerHTML={renderHTML(
                    popupsList.find((e) => e.category === "popup_header")
                      .mobileBody
                  )}
                />
              </Marquee>
            </div>
          )}
        </div>
      )}
    </>
  );
}
