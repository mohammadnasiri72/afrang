"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";

const MAX_COLUMNS = 4;
const COLUMN_PIXEL_WIDTH = 100;

const SubmenuDropdown = ({ activeMenu, onClose, startTransition }) => {
  const boxRef = useRef(null);

  const handleWheel = (e) => {
    if (boxRef.current) {
      e.preventDefault(); // نذار صفحه عمودی اسکرول بخوره
      boxRef.current.scrollLeft += e.deltaY; // حرکت عمودی ماوس → افقی
    }
  };
  const router = useRouter();
  const dropdownContent = useMemo(() => {
    if (!activeMenu) return null;
    const flatList = [];
    activeMenu.Children?.forEach((parent) => {
      flatList.push({ ...parent, isParent: true });
      parent.Children?.forEach((child) => {
        flatList.push({ ...child, isParent: false });
      });
    });

    const MENU_HEIGHT =
      typeof window !== "undefined"
        ? Math.round(window.innerHeight * 0.7)
        : 500;
    const ITEM_HEIGHT = 35;
    const maxRows = Math.floor(MENU_HEIGHT / ITEM_HEIGHT);

    // تقسیم آیتم‌ها به ستون‌ها (همیشه حداقل ۴ ستون)
    const columns = [];
    let currentColumn = [];
    let currentRow = 0;
    flatList.forEach((item) => {
      if (currentRow >= maxRows) {
        columns.push(currentColumn);
        currentColumn = [];
        currentRow = 0;
      }
      currentColumn.push(item);
      currentRow++;
    });
    if (currentColumn.length > 0) {
      columns.push(currentColumn);
    }
    // همیشه ۴ ستون اول را داشته باش (برای جای عکس)
    while (columns.length < 4) {
      columns.push([]);
    }
    const filledColumns = columns.filter((col) => col.length > 0).length;
    // بعد از ساخت columns:
    const needsHorizontalScroll = columns.length > MAX_COLUMNS;
    // منطق نمایش عکس
    let showImage = false;
    let imageColIdx = null;
    let imageColWidth = null;
    if (!needsHorizontalScroll) {
      if (filledColumns === 1 || filledColumns === 2) {
        showImage = true;
        imageColIdx = 2;
        imageColWidth = "25%";
      } else if (filledColumns === 3) {
        showImage = true;
        imageColIdx = 3;
        imageColWidth = "25%";
      }
    }
    // اگر اسکرول افقی فعال است، عرض کل را بر اساس تعداد ستون‌ها حساب کن
    const containerWidth = needsHorizontalScroll
      ? `${columns.length * COLUMN_PIXEL_WIDTH}px`
      : "100%";
    return (
      <div
        ref={boxRef}
        onWheel={handleWheel}
        className="rounded-b-xl relative !pt-1"
        style={{
          height: MENU_HEIGHT,
          overflowX: needsHorizontalScroll ? "auto" : "hidden",
          overflowY: "hidden",
          padding: "0 10px",
        }}
      >
        <div
          className="flex flex-row gap-0 rtl "
          style={{
            width: containerWidth,
            minWidth: "100%",
          }}
        >
          {columns.map((col, colIdx) => {
            // منطق عرض ستون و عکس
            let columnWidth = needsHorizontalScroll
              ? `${COLUMN_PIXEL_WIDTH}px`
              : "25%";
            let shouldShowImageHere = false;
            if (showImage && colIdx === imageColIdx) {
              shouldShowImageHere = true;
              columnWidth = needsHorizontalScroll
                ? `${COLUMN_PIXEL_WIDTH}px`
                : imageColWidth || "25%";
            }
            // اگر ستون خالی است و عکس هم اینجا نیست، نمایش نده
            if (!col.length && !shouldShowImageHere) {
              return null;
            }
            return (
              <div
                key={colIdx}
                className={`relative flex flex-col h-[68vh]  w-full`}
                style={{
                  width: containerWidth,
                }}
              >
                {col.map((item, idx) => (
                  <Link
                    href={item.url || item.pageUrl || "#"}
                    key={`${item.isParent ? "parent" : "child"}-${
                      item.id
                    }-${idx}`}
                    className={`line-clamp-1 ${
                      item.isParent
                        ? "text-[#d1182b] font-bold text-[18px] 2xl:text-[25px] pt-0 2xl:hover:text-[26px] pl-3"
                        : "text-[#222] text-[15px] 2xl:text-[20px] 2xl:hover:text-[21px] hover:text-[#d1182b] font-semibold pl-3"
                    } whitespace-nowrap font-inherit cursor-pointer transition-all duration-200`}
                    style={{
                      height: `${ITEM_HEIGHT}px`,
                      lineHeight: `${ITEM_HEIGHT}px`,
                      textAlign: item.isParent ? undefined : "right",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.body.style.overflow = "";
                      onClose();
                      startTransition(() => {
                        router.push(item.url || item.pageUrl || "#");
                      });
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
                {shouldShowImageHere && (
                  <div className="w-full h-[68vh] flex items-center justify-center flex-col">
                    <img
                      src={
                        activeMenu?.image
                          ? getImageUrl(activeMenu.image)
                          : "/images/logo.png"
                      }
                      alt=""
                      className="w-full object-contain max-w-96"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [activeMenu]);

  return dropdownContent;
};

export default SubmenuDropdown;
