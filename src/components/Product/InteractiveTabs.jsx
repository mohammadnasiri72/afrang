"use client";

import { Segmented } from "antd";
import { useState, useEffect, useRef } from "react";

export default function InteractiveTabs({ product, hasRelatedVideos }) {
  const [tabProDetails, setTabProDetails] = useState(
    product.product.typeId === 3 ? 1 : 2
  );
  const [isSticky, setIsSticky] = useState(false);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [scrollSpyDisabled, setScrollSpyDisabled] = useState(false);

  const elementRef = useRef(null);
  const segmentedBoxRef = useRef(null);
  const segmentedRef = useRef(null);

  // Scroll spy logic for main page scroll
  useEffect(() => {
    // ترتیب جدید: محصولات مرتبط (4)، نظرات (5)
    const tabValues = [
      ...(product.product.typeId === 3 ? [1] : []),
      2,
      3,
      4,
      hasRelatedVideos ? 7 : null,
      ...(product.product.conditionId !== 20 ? [5] : []),
      ...(product.product.conditionId !== 20 ? [6] : []),
    ].filter(Boolean);

    let ticking = false;
    function onScroll() {
      if (!ticking && !scrollSpyDisabled) {
        window.requestAnimationFrame(() => {
          let found = false;
          const scrollY = window.scrollY;

          // ابتدا چک کنیم که آیا در محدوده باکس تب‌ها هستیم یا نه
          if (elementRef.current) {
            const element = elementRef.current;
            const absoluteTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = absoluteTop + elementHeight;

            // اگر از محدوده باکس تب‌ها خارج شده‌ایم، تب را تغییر ندهیم
            if (scrollY >= elementBottom - 200) {
              ticking = false;
              return;
            }
          }

          // پیدا کردن section های موجود در صفحه
          const sections = document.querySelectorAll('.tab-section-scroll-anchor');
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = elementTop + rect.height;

            // اگر بخش در viewport باشد
            if (
              elementTop <= scrollY + 300 &&
              elementBottom >= scrollY + 300
            ) {
              if (i < tabValues.length) {
                setTabProDetails(tabValues[i]);
                found = true;
                break;
              }
            }
          }
          if (!found) {
            // فقط اگر واقعاً بالای صفحه بودیم تب اول را فعال کن
            if (window.scrollY < 200) {
              setTabProDetails(tabValues[0]);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [product.product.typeId, scrollSpyDisabled, hasRelatedVideos, product.product.conditionId]);

  useEffect(() => {
    // Scroll Segmented horizontally to show active tab on mobile
    if (
      typeof window !== "undefined" &&
      window.innerWidth < 768 &&
      segmentedRef.current
    ) {
      const activeTab = segmentedRef.current.querySelector(
        ".ant-segmented-item-selected"
      );
      if (activeTab) {
        activeTab.scrollIntoView({
          inline: "center",
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [tabProDetails]);

  const options = [
    ...(product.product.typeId === 3
      ? [{ label: "لیست محصولات", value: 1 }]
      : []),
    { label: "توضیحات محصول", value: 2 },
    { label: "مشخصات فنی", value: 3 },
    { label: "محصولات مرتبط", value: 4 },
    ...(hasRelatedVideos ? [{ label: "ویدئوهای مرتبط", value: 7 }] : []),
    ...(product.product.conditionId !== 20
      ? [{ label: "نظرات", value: 5 }]
      : []),
    ...(product.product.conditionId !== 20
      ? [{ label: "پرسش و پاسخ", value: 6 }]
      : []),
  ];

  // Scroll to section on tab click (scrolls to main page)
  const handleTabChange = (val) => {
    setTabProDetails(val);
    setScrollSpyDisabled(true);

    // پیدا کردن section مربوطه
    const sections = document.querySelectorAll('.tab-section-scroll-anchor');
    let targetSection = null;
    
    if (val === 1 && product.product.typeId === 3) {
      targetSection = sections[0]; // لیست محصولات
    } else if (val === 2) {
      targetSection = sections[product.product.typeId === 3 ? 1 : 0]; // توضیحات محصول
    } else if (val === 3) {
      targetSection = sections[product.product.typeId === 3 ? 2 : 1]; // مشخصات فنی
    } else if (val === 4) {
      targetSection = sections[product.product.typeId === 3 ? 3 : 2]; // محصولات مرتبط
    } else if (val === 5) {
      const startIndex = (product.product.typeId === 3 ? 4 : 3) + (hasRelatedVideos ? 1 : 0);
      targetSection = sections[startIndex]; // نظرات
    } else if (val === 6) {
      const startIndex = (product.product.typeId === 3 ? 4 : 3) + (hasRelatedVideos ? 1 : 0) + 1;
      targetSection = sections[startIndex]; // پرسش و پاسخ
    } else if (val === 7 && hasRelatedVideos) {
      targetSection = sections[product.product.typeId === 3 ? 4 : 3]; // ویدئوهای مرتبط
    }

    if (targetSection && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const stickyTop = 100;
      const extraOffset = 150;
      const offset =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        stickyTop -
        extraOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }

    // بعد از اسکرول، scroll spy را دوباره فعال کن
    setTimeout(() => {
      setScrollSpyDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        // محاسبه موقعیت مطلق نسبت به بالای صفحه
        const element = elementRef.current;
        const absoluteTop = element.offsetTop;
        const scrollY = window.scrollY;
        const elementHeight = element.offsetHeight;
        const elementBottom = absoluteTop + elementHeight;

        // اگر اسکرول به باکس تب‌ها رسید و هنوز از آن عبور نکرده، آن را فیکس کن
        if (scrollY >= absoluteTop - 100 && scrollY < elementBottom - 500) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    // اضافه کردن event listener برای scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // محاسبه مقدار اولیه
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function updateBoxPosition() {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setBoxLeft(rect.left + window.scrollX);
        setBoxWidth(rect.width);
      }
    }
    updateBoxPosition();
    window.addEventListener("resize", updateBoxPosition);
    return () => {
      window.removeEventListener("resize", updateBoxPosition);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className="w-full"
    >
      <div
        ref={segmentedBoxRef}
        className={`SegmentedProduct${
          isSticky ? " sticky" : ""
        } overflow-hidden flex justify-center ${
          isSticky ? "p-0" : "p-5"
        } bg-white z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative w-full"
        }`}
        style={{
          zIndex: isSticky ? 5000 : 50,
          background: "white",
          position: isSticky ? "fixed" : "relative",
          top: isSticky ? 100 : "auto",
          left: isSticky ? boxLeft : "auto",
          width: isSticky ? boxWidth : "100%",
          paddingTop: isSticky ? 0 : 20,
          paddingBottom: isSticky ? 0 : 20,
          paddingLeft: isSticky ? 0 : 20,
          paddingRight: isSticky ? 0 : 20,
          marginTop: isSticky ? 8 : undefined,
          marginBottom: isSticky ? 0 : undefined,
        }}
      >
        <Segmented
          ref={segmentedRef}
          className="font-semibold text-3xl w-full overflow-auto"
          dir="rtl"
          style={{
            padding: "8px",
            fontFamily: "yekan",
            width: "100%",
          }}
          value={tabProDetails}
          onChange={handleTabChange}
          options={options}
        />
      </div>
    </div>
  );
}






