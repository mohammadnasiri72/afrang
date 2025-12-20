"use client";

import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(percent);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    const loadTime = performance.now() - startTime;
    if (loadTime > 100 && process.env.NODE_ENV === "development") {
      console.warn(`⚠️ ScrollToTopButton setup took ${loadTime.toFixed(2)}ms`);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 4,
        zIndex: 1000,
        width: 36,
        height: 36,
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 16px 2px rgba(0,0,0,0.22)",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onClick={handleClick}
      aria-label="scroll to top"
      className="group bottom-44 sm:bottom-[32px]"
    >
      <div style={{ position: "absolute", width: 36, height: 36 }}>
        <CircularProgressbar
          value={progress}
          strokeWidth={7}
          styles={buildStyles({
            pathColor: "#d1182b",
            trailColor: "#f3f3f3",
            backgroundColor: "#fff",
          })}
        />
      </div>
      <FaChevronUp
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: 15,
          height: 15,
          color: "#d1182b",
          zIndex: 2,
          transition: "color 0.2s",
        }}
        className="group-hover:text-[#b91626]"
      />
    </div>
  );
}

