"use client";

import BasketBox from "@/components/Product/BasketBox";
import React, { useRef, useEffect, useState } from "react";

function BasketFixed({ product }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [fixed, setFixed] = useState(false);
  const [stuckToBottom, setStuckToBottom] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current || !innerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const innerRect = innerRef.current.getBoundingClientRect();
      const stickyTop = 120; // px
      if (containerRect.bottom <= stickyTop) {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      }
      else if (containerRect.bottom <= innerRect.height + stickyTop) {
        setFixed(false);
        setStuckToBottom(true);
        setStyle({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        });
      }
      // حالت fixed معمولی
      else if (containerRect.top <= stickyTop) {
        setFixed(true);
        setStuckToBottom(false);
        setStyle({
          position: "fixed",
          top: stickyTop,
          left: containerRect.left,
          width: containerRect.width,
          zIndex: 100,
        });
      } else {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      }
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-1/4 lg:block hidden bg-white "
        style={{ position: "relative" }}
      >
        <div
          ref={innerRef}
          className=""
          style={
            fixed || stuckToBottom ? style : { position: "sticky", top: 0 }
          }
        >
          <BasketBox product={product} />
        </div>
      </div>
    </>
  );
}

export default BasketFixed;
