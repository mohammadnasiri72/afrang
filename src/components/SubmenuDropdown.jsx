"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { useMemo } from "react";

const ITEM_HEIGHT_PARENT = 34; // ارتفاع آیتم والد
const ITEM_HEIGHT_CHILD = 32; // ارتفاع آیتم فرزند
const COLUMN_GAP = 32;
const CONTAINER_HEIGHT = 420; // ارتفاع ثابت کل منو
const COLUMN_WIDTH = '25%'; // تغییر به درصد برای ریسپانسیو بودن
const MAX_COLUMNS = 4;
const COLUMN_PIXEL_WIDTH = 300;

const SubmenuDropdown = ({ activeMenu, onNavigation }) => {
  const dropdownContent = useMemo(() => {
    if (!activeMenu) return null;

    const flatList = [];
    activeMenu.Children?.forEach((parent) => {
      flatList.push({ ...parent, isParent: true });
      parent.Children?.forEach((child) => {
        flatList.push({ ...child, isParent: false });
      });
    });

    const MENU_HEIGHT = typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.7) : 500;
    const ITEM_HEIGHT = 34;
    const maxRows = Math.floor(MENU_HEIGHT / ITEM_HEIGHT);

    let columnCount = Math.ceil(flatList.length / maxRows);
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
    const filledColumns = columns.filter(col => col.length > 0).length;
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
        imageColWidth = '50%';
      } else if (filledColumns === 3) {
        showImage = true;
        imageColIdx = 3;
        imageColWidth = '25%';
      }
    }
    // اگر اسکرول افقی فعال است، عرض کل را بر اساس تعداد ستون‌ها حساب کن
    const containerWidth = needsHorizontalScroll ? `${columns.length * COLUMN_PIXEL_WIDTH}px` : '100%';
    return (
      <div 
        className="rounded-b-xl relative"
        style={{
          height: MENU_HEIGHT,
          overflowX: needsHorizontalScroll ? "auto" : "hidden",
          overflowY: "hidden",
          padding: "0 10px",
        }}
      >
        <div 
          className="flex flex-row gap-0 rtl"
          style={{
            width: containerWidth,
            minWidth: '100%',
          }}
        >
          {columns.map((col, colIdx) => {
            // منطق عرض ستون و عکس
            let columnWidth = needsHorizontalScroll ? `${COLUMN_PIXEL_WIDTH}px` : '25%';
            let shouldShowImageHere = false;
            if (showImage && colIdx === imageColIdx) {
              shouldShowImageHere = true;
              columnWidth = needsHorizontalScroll ? `${COLUMN_PIXEL_WIDTH}px` : (imageColWidth || '25%');
            }
            // اگر ستون خالی است و عکس هم اینجا نیست، نمایش نده
            if (!col.length && !shouldShowImageHere) {
              return null;
            }
            return (
              <div
                key={colIdx}
                className="relative flex flex-col h-[68vh]"
                style={{
                  width: columnWidth,
                  flex: `0 0 ${columnWidth}`,
                }}
              >
                {col.map((item, idx) => (
                  <div
                    key={`${item.isParent ? "parent" : "child"}-${item.id}-${idx}`}
                    className={`line-clamp-1 pb-2 ${
                      item.isParent
                        ? 'text-[#d1182b] font-bold text-[16px] pt-2'
                        : 'text-[#222] font-medium text-xs'
                    } whitespace-nowrap font-inherit cursor-pointer transition-all duration-200`}
                    style={{
                      height: `${ITEM_HEIGHT}px`,
                      lineHeight: `${ITEM_HEIGHT}px`,
                      textAlign: item.isParent ? undefined : "right",
                    }}
                    onClick={() => onNavigation(item.url || item.pageUrl || "#")}
                    onMouseOver={e => {
                      if (item.isParent) {
                        e.currentTarget.style.fontSize = "18px";
                      } else {
                        e.currentTarget.style.color = "#d1182b";
                        e.currentTarget.style.fontSize = "13px";
                      }
                    }}
                    onMouseOut={e => {
                      if (item.isParent) {
                        e.currentTarget.style.fontSize = "16px";
                      } else {
                        e.currentTarget.style.color = "#222";
                        e.currentTarget.style.fontSize = "12px";
                      }
                    }}
                  >
                    {item.title}
                  </div>
                ))}
                {shouldShowImageHere && (
                  <div className="w-full h-[68vh] flex items-end justify-center flex-col">
                    <img
                      src={
                        activeMenu?.image
                          ? getImageUrl(activeMenu.image)
                          : "/images/gallery/best-video-cameras.png"
                      }
                      alt=""
                      className="w-full object-contain"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [activeMenu, onNavigation]);

  return dropdownContent;
};

export default SubmenuDropdown;
