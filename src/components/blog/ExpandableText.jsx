"use client";

import { useEffect, useRef, useState } from "react";

const ExpandableText = ({ text, linesToShow = 3, lineHeight = 1.5 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
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

  const cleanText = text ? stripHtmlTags(text) : "";

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

 

  return (
    <>
      {mounted && (
        <div className="relative w-full">
          <div
            ref={textRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out relative`}
            style={{
              lineHeight: `${lineHeight}`,
              maxHeight: maxHeight,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp:  linesToShow,
            }}
          >
            {cleanText}
            { showToggle && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white pointer-events-none" />
            )}
          </div>

         
        </div>
      )}
    </>
  );
};

export default ExpandableText;
