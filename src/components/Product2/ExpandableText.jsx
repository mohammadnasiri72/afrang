"use client";

import React, { useState, useRef, useEffect } from "react";

const ExpandableText = ({ text, linesToShow = 3, lineHeight = 1.5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [maxHeight, setMaxHeight] = useState("");
  const textRef = useRef(null);

  // تابع برای حذف تگ‌های HTML
  const stripHtmlTags = (html) => {
    if (typeof document !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
    return html.replace(/<[^>]*>/g, "");
  };

  const cleanText = stripHtmlTags(text);

  useEffect(() => {
    if (textRef.current) {
      const style = window.getComputedStyle(textRef.current);
      const lineHeightPx = parseFloat(style.lineHeight);
      const calculatedHeight = lineHeightPx * linesToShow;

      const textHeight = textRef.current.scrollHeight;
      setShowToggle(textHeight > calculatedHeight);

      setMaxHeight(`${calculatedHeight}px`);
    }
  }, [cleanText, linesToShow]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (textRef.current) {
      if (isExpanded) {
        const lineHeightPx = parseFloat(
          window.getComputedStyle(textRef.current).lineHeight
        );
        setMaxHeight(`${lineHeightPx * linesToShow}px`);
      } else {
        setMaxHeight(`${textRef.current.scrollHeight}px`);
      }
    }
  };

  return (
    <div className="relative w-full text-xs sm:text-sm">
      <div
        ref={textRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out relative text-justify`}
        style={{
          lineHeight: `${lineHeight}`,
          maxHeight: isExpanded
            ? `${textRef.current?.scrollHeight}px`
            : maxHeight,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "unset" : linesToShow,
        }}
      >
        {cleanText}
        {!isExpanded && showToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        )}
      </div>

      
      {/* {
        showToggle &&
       <div
            onClick={toggleExpand}
            className="flex items-center cursor-pointer group mt-3 px-2"
          >
            <span className="group-hover:text-[#18d1be] text-[#40768c] duration-300 font-semibold">
              {isExpanded ? "بستن ویژگی ها" : " همه ویژگی ها"}
            </span>
            <img
              style={{ rotate: isExpanded ? "90deg" : "0deg" }}
              className="-translate-x-1 group-hover:translate-x-0 duration-300"
              src="/images/icons/Arrow-Left.png"
              alt=""
            />
          </div>
      } */}
    </div>
  );
};

export default ExpandableText;
