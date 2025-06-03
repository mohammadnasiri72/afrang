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
    <div className="relative w-full">
      <div
        ref={textRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out relative`}
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

      {showToggle && (
        <div className="flex justify-center">
          {/* <button
            onClick={toggleExpand}
            className="bg-none border-none text-blue-600 cursor-pointer text-sm inline-block mt-1 hover:underline"
          >
            {isExpanded ? "کمتر" : "بیشتر"}
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
