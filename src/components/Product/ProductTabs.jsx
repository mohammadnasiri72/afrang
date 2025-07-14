"use client";

import { Divider, Segmented } from "antd";
import { useState, useEffect } from "react";
import ProductMain from "../home/ProductMain";
import AccessoriesProduct from "./AccessoriesProduct";
import CommentProduct from "./CommentProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";
import BundleProducts from "./BundleProducts";
import { useRef } from "react";
import RelatedProductsMobile from "./RelatedProductsMobile";

function ProductTabs({ product, parentRef }) {
  const [tabProDetails, setTabProDetails] = useState(
    product.product.typeId === 3 ? 1 : 2
  );
  const [topPosition, setTopPosition] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef(null);

  const [parentLeft, setParentLeft] = useState(0);
  const [parentRight, setParentRight] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [scrollSpyDisabled, setScrollSpyDisabled] = useState(false);

  // refs for each section
  const bundleRef = useRef(null);
  const detailsRef = useRef(null);
  const specsRef = useRef(null);
  const commentsRef = useRef(null);
  const accessoriesRef = useRef(null);
  const qaRef = useRef(null);
  const segmentedBoxRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const segmentedRef = useRef(null);

  // Scroll spy logic for main page scroll
  useEffect(() => {
    const sectionRefs = [
      product.product.typeId === 3 ? bundleRef : null,
      detailsRef,
      specsRef,
      commentsRef,
      accessoriesRef,
      qaRef,
    ].filter(Boolean);
    const tabValues = [
      ...(product.product.typeId === 3 ? [1] : []),
      2,
      3,
      4,
      5,
      6,
    ];

    let ticking = false;
    function onScroll() {
      if (!ticking && !scrollSpyDisabled) {
        window.requestAnimationFrame(() => {
          let found = false;
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

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

          for (let i = 0; i < sectionRefs.length; i++) {
            const ref = sectionRefs[i];
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();
              const elementTop = rect.top + scrollY;
              const elementBottom = elementTop + rect.height;
              
              // اگر بخش در viewport باشد
              if (
                elementTop <= scrollY + 300 &&
                elementBottom >= scrollY + 300
              ) {
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
            // وگرنه تب فعال را تغییر نده
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
  }, [product.product.typeId, scrollSpyDisabled]);

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
      ? [{ label: "محصولات دسته ای", value: 1 }]
      : []),
    { label: "توضیحات محصول", value: 2 },
    { label: "مشخصات فنی", value: 3 },
    { label: "نظرات", value: 4 },
    { label: "محصولات مرتبط", value: 5 },
    { label: "پرسش و پاسخ", value: 6 },
  ];

  // Scroll to section on tab click (scrolls to main page)
  const handleTabChange = (val) => {
    setTabProDetails(val);
    setScrollSpyDisabled(true);

    let ref = null;
    if (val === 1 && product.product.typeId === 3) ref = bundleRef;
    if (val === 2) ref = detailsRef;
    if (val === 3) ref = specsRef;
    if (val === 4) ref = commentsRef;
    if (val === 5) ref = accessoriesRef;
    if (val === 6) ref = qaRef;
    if (ref && ref.current && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const stickyTop = 100;
      const extraOffset = 150;
      const offset = ref.current.getBoundingClientRect().top + window.scrollY - stickyTop - extraOffset;
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

        setTopPosition(absoluteTop);

        // اگر اسکرول به باکس تب‌ها رسید و هنوز از آن عبور نکرده، آن را فیکس کن
        if (scrollY >= absoluteTop - 100 && scrollY < elementBottom - 500) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }

        console.log(
          "Element offsetTop:",
          absoluteTop,
          "Element bottom:",
          elementBottom,
          "Window scrollY:",
          scrollY,
          "Is sticky:",
          scrollY >= absoluteTop - 100 && scrollY < elementBottom - 200
        );
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
    if (parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setParentLeft(rect.left + window.scrollX);
      setParentRight(window.innerWidth - (rect.right + window.scrollX));
    }
  }, [parentRef]);

  useEffect(() => {
    function updateBoxPosition() {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setBoxLeft(rect.left + window.scrollX);
        setBoxWidth(rect.width);
      }
    }
    updateBoxPosition();
    window.addEventListener('resize', updateBoxPosition);
    return () => {
      window.removeEventListener('resize', updateBoxPosition);
    };
  }, []);

  return (
    <>
      <div
        ref={elementRef}
        className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative"
      >
        <div
          ref={segmentedBoxRef}
          className={`SegmentedProduct overflow-hidden flex justify-center p-5 bg-white z-50 transition-all duration-300 ${
            isSticky ? "fixed top-0 shadow-lg" : "relative w-full"
          }`}
          style={{
            zIndex: isSticky ? 5000 : 50,
            background: "white",
            position: isSticky ? "fixed" : "relative",
            top: isSticky ? 100 : "auto",
            left: isSticky ? boxLeft : "auto",
            width: isSticky ? boxWidth : "100%",
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
        <div className="w-full">
          {product.product.typeId === 3 && (
            <div ref={bundleRef} className="tab-section-scroll-anchor">
              <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
                محصولات دسته ای
              </h4>
              <BundleProducts product={product} />
            </div>
          )}
          <Divider />

          <div ref={detailsRef} className="tab-section-scroll-anchor">
            <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
              توضیحات محصول
            </h4>
            <DetailsProduct product={product} />
          </div>
          <Divider />

          <div ref={specsRef} className="tab-section-scroll-anchor">
            <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
              مشخصات فنی
            </h4>
            <SpecificationsProduct product={product} />
          </div>
          <Divider />
          <div ref={commentsRef} className="tab-section-scroll-anchor">
            <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
              نظرات کاربران
            </h4>
            <CommentProduct id={product.product.productId} type={0} />
          </div>
          <Divider />
          <div>
            <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
              محصولات مرتبط
            </h4>
            <div ref={accessoriesRef} className="tab-section-scroll-anchor">
              <AccessoriesProduct product={product} />
            </div>
          </div>
          <Divider />
          <div ref={qaRef} className="tab-section-scroll-anchor">
            <h4 className="px-7 text-2xl font-bold text-[#d1182b]">
              پرسش و پاسخ
            </h4>
            <CommentProduct id={product.product.productId} type={1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductTabs;
