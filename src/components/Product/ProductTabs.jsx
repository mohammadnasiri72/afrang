"use client";

import { Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import AccessoriesProduct from "./AccessoriesProduct";
import BoxVideoProduct from "./BoxVideoProduct";
import BundleProducts from "./BundleProducts";
import CommentProduct from "./CommentProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";

function ProductTabs({
  product,
  parentRef,
  relatedProducts,
  listVideo,
  comments,
  commentsQuestion,
}) {
  const [tabProDetails, setTabProDetails] = useState(
    product.product.typeId === 3 ? 1 : 2
  );
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef(null);

  const [boxLeft, setBoxLeft] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [scrollSpyDisabled, setScrollSpyDisabled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // refs for each section
  const bundleRef = useRef(null);
  const detailsRef = useRef(null);
  const specsRef = useRef(null);
  const accessoriesRef = useRef(null);
  const relatedVideosRef = useRef(null);
  const commentsRef = useRef(null);
  const qaRef = useRef(null);
  const segmentedBoxRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const segmentedRef = useRef(null);

  // شرط وجود ویدئوهای مرتبط
  const hasRelatedVideos =
    Array.isArray(product?.properties) &&
    product.properties.some((p) => p.propertyKey === "related_videos");

  // Scroll spy logic for main page scroll
  useEffect(() => {
    // ترتیب جدید: محصولات مرتبط (4)، نظرات (5)
    const sectionRefs = [
      product.product.typeId === 3 ? bundleRef : null,
      detailsRef,
      specsRef,
      accessoriesRef,
      hasRelatedVideos ? relatedVideosRef : null, // اضافه شد
      commentsRef,
      qaRef,
    ].filter(Boolean);
    const tabValues = [
      ...(product.product.typeId === 3 ? [1] : []),
      2,
      3,
      4,
      hasRelatedVideos ? 7 : null, // مقدار جدید برای تب ویدئوها
      5,
      6,
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
  }, [product.product.typeId, scrollSpyDisabled, hasRelatedVideos]);

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
      ? [
          {
            label: "لیست محصولات",
            value: 1,
          },
        ]
      : []),
    { label: "توضیحات محصول", value: 2 },
    { label: "مشخصات فنی", value: 3 },
    { label: "محصولات مرتبط", value: 4 },
    ...(hasRelatedVideos
      ? [
          {
            label: "ویدئوهای مرتبط",
            value: 7,
          },
        ]
      : []),
    ...(product.product.conditionId !== 20
      ? [{ label: "نظرات", value: 5 }]
      : []),
    ...(product.product.conditionId !== 20
      ? [
          {
            label: "پرسش و پاسخ",
            value: 6,
          },
        ]
      : []),
  ];

  // Scroll to section on tab click (scrolls to main page)
  const handleTabChange = (val) => {
    setTabProDetails(val);
    setScrollSpyDisabled(true);

    let ref = null;
    if (val === 1 && product.product.typeId === 3) ref = bundleRef;
    if (val === 2) ref = detailsRef;
    if (val === 3) ref = specsRef;
    if (val === 4) ref = accessoriesRef;
    if (val === 5) ref = commentsRef;
    if (val === 6) ref = qaRef;
    if (val === 7 && hasRelatedVideos) ref = relatedVideosRef;
    if (ref && ref.current && elementRef.current) {
      const stickyTop = 100;
      const extraOffset = 150;
      const offset =
        ref.current.getBoundingClientRect().top +
        window.scrollY -
        stickyTop -
        extraOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }

    // بعد از اسکرول، scroll spy را دوباره فعال کن
    setTimeout(() => {
      setScrollSpyDisabled(false);
    }, 0);
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
          setIsHidden(false);
        } else if (
          scrollY >= absoluteTop - 100 &&
          scrollY >= elementBottom - 500
        ) {
          setIsHidden(true);
        } else {
          setIsSticky(false);
          setIsHidden(false);
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
    if (parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
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
    window.addEventListener("resize", updateBoxPosition);
    return () => {
      window.removeEventListener("resize", updateBoxPosition);
    };
  }, []);

  // تابع برای اصلاح ARIA attributes بعد از render
  useEffect(() => {
    const fixAriaAttributes = () => {
      const segmentedItems = document.querySelectorAll(".ant-segmented-item");
      segmentedItems.forEach((item) => {
        // تغییر role از radio به button
        if (item.getAttribute("role") === "radio") {
          item.setAttribute("role", "button");
        }

        // حذف aria-checked و جایگزینی با aria-selected
        if (item.hasAttribute("aria-checked")) {
          item.removeAttribute("aria-checked");
        }

        // اضافه کردن aria-selected بر اساس کلاس selected
        const isSelected = item.classList.contains(
          "ant-segmented-item-selected"
        );
        item.setAttribute("aria-selected", isSelected.toString());

        // اضافه کردن tabindex برای accessibility
        item.setAttribute("tabindex", isSelected ? "0" : "-1");
      });

      // اصلاح container اصلی
      const segmentedGroup = document.querySelector(".ant-segmented");
      if (
        segmentedGroup &&
        segmentedGroup.getAttribute("role") === "radiogroup"
      ) {
        segmentedGroup.setAttribute("role", "tablist");
        segmentedGroup.setAttribute("aria-label", "تب های محصول");
      }
    };

    // اجرای فیکس بعد از render و بعد از هر تغییر
    fixAriaAttributes();

    // همچنین بعد از هر تغییر تب
    const timer = setTimeout(fixAriaAttributes, 100);

    return () => clearTimeout(timer);
  }, [tabProDetails]);

  // اضافه کردن keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const currentIndex = options.findIndex(
        (opt) => opt.value === tabProDetails
      );
      const targetIndex = e.currentTarget.getAttribute("data-index");
      if (targetIndex !== null) {
        handleTabChange(options[targetIndex].value);
      }
    }
  };

  // ساخت Segmented سفارشی با ARIA درست
  const renderCustomSegmented = () => {
    return (
      <div
        role="tablist"
        aria-label="تب های محصول"
        className={`ant-segmented flex overflow-auto bg-[#ebebeb] p-2 rounded-lg !w-full ${
          isHidden ? "!hidden" : ""
        }`}
        style={{ fontFamily: "yekan" }}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            role="tab"
            aria-selected={tabProDetails === option.value}
            tabIndex={tabProDetails === option.value ? 0 : -1}
            data-index={index}
            onClick={() => handleTabChange(option.value)}
            onKeyDown={handleKeyDown}
            className={`
              px-4 py-2 mx-2 font-semibold text-sm transition-all duration-300 cursor-pointer
              ${
                tabProDetails === option.value
                  ? "bg-white !text-[#d1182b] rounded-md font-bold text-base"
                  : "!text-gray-700"
              }
              ${isSticky ? "text-xs py-1 mx-1" : "text-sm py-2 mx-2"}
               
            `}
            style={{
              minWidth: "max-content",
              whiteSpace: "nowrap",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .SegmentedProduct .ant-segmented {
          background-color: #ebebeb;
        }
        .SegmentedProduct .ant-segmented-item {
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 8px;
          padding-bottom: 8px;
          margin-right: 10px !important;
          margin-left: 10px !important;
          width: 100%;
          font-weight: 600 !important;
          font-size: 14px;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected {
          background-color: #fff !important;
          color: #d1182b !important;
          border-radius: 6px;
          font-weight: 900 !important;
          font-size: 16px !important;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected:hover {
          color: #d1182b !important;
        }
        .SegmentedProduct .ant-segmented-thumb {
          background-color: #fff !important;
          font-weight: 900 !important;
        }
        /* حالت جمع و جورتر در sticky */
        .SegmentedProduct.sticky .ant-segmented-item {
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 12px;
          margin-right: 4px !important;
          margin-left: 4px !important;
        }
        .SegmentedProduct.sticky .ant-segmented-item-selected {
          font-size: 13px !important;
          border-radius: 4px;
        }
      `}</style>
      <div
        ref={elementRef}
        className={`flex flex-wrap bg-white rounded-lg mt-3 z-50 relative`}
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
            top: isSticky ? 95 : "auto",
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
          {/* <Segmented
            ref={segmentedRef}
            className={`font-semibold text-3xl w-full overflow-auto ${
              isHidden ? "!hidden" : ""
            }`}
            dir="rtl"
            style={{
              padding: "8px",
              fontFamily: "yekan",
              width: "100%",
            }}
            value={tabProDetails}
            onChange={handleTabChange}
            options={options}
          /> */}
          {renderCustomSegmented()}
        </div>
        <div className="w-full">
          {product.product.typeId === 3 && (
            <div ref={bundleRef} className="tab-section-scroll-anchor">
              <span className="px-7 text-2xl font-bold text-[#d1182b]">
                لیست محصولات
              </span>
              <BundleProducts product={product} />
            </div>
          )}
          <Divider style={{ margin: 0, padding: 0 }} />

          <div ref={detailsRef} className="tab-section-scroll-anchor pt-2">
            <span className="px-7 text-2xl font-bold text-[#d1182b]">
              توضیحات محصول
            </span>
            <DetailsProduct product={product} />
          </div>
          <Divider />

          <div ref={specsRef} className="tab-section-scroll-anchor">
            <span className="px-7 text-2xl font-bold text-[#d1182b]">
              مشخصات فنی
            </span>
            <SpecificationsProduct product={product} />
          </div>
          <Divider />
          <div>
            <span className="px-7 text-2xl font-bold text-[#d1182b]">
              محصولات مرتبط
            </span>
            <div ref={accessoriesRef} className="tab-section-scroll-anchor">
              <AccessoriesProduct
                product={product}
                relatedProducts={relatedProducts}
              />
            </div>
          </div>
          <Divider />
          {hasRelatedVideos && (
            <div>
              <span className="px-7 text-2xl font-bold text-[#d1182b]">
                ویدئوهای مرتبط
              </span>
              <div ref={relatedVideosRef} className="tab-section-scroll-anchor">
                <BoxVideoProduct listVideo={listVideo} />
              </div>
            </div>
          )}
          {hasRelatedVideos && <Divider />}
          {product.product.conditionId !== 20 && (
            <div>
              <div ref={commentsRef} className="tab-section-scroll-anchor">
                <span className="px-7 text-2xl font-bold text-[#d1182b]">
                  نظرات کاربران
                </span>
                <CommentProduct comments={comments} type={0}  id={product.product.productId}/>
              </div>
              <Divider />
              <div ref={qaRef} className="tab-section-scroll-anchor">
                <span className="px-7 text-2xl font-bold text-[#d1182b]">
                  پرسش و پاسخ
                </span>
                <CommentProduct comments={commentsQuestion} type={1}  id={product.product.productId}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductTabs;
