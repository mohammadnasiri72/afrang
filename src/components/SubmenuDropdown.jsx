"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { useMemo } from "react";

const ITEM_HEIGHT_PARENT = 34; // ارتفاع آیتم والد
const ITEM_HEIGHT_CHILD = 32; // ارتفاع آیتم فرزند
const COLUMN_GAP = 32;
const CONTAINER_HEIGHT = 420; // ارتفاع ثابت کل منو
const COLUMN_WIDTH = 300;
const MAX_COLUMNS = 4;

const SubmenuDropdown = ({ activeMenu, onNavigation }) => {
  const dropdownContent = useMemo(() => {
    if (
      !activeMenu ||
      !activeMenu.Children ||
      activeMenu.Children.length === 0
    ) {
      return null;
    }
    // آرایه خطی از والد و فرزند
    const flatList = [];
    activeMenu.Children.forEach((parent) => {
      flatList.push({ ...parent, isParent: true });
      (parent.Children || []).forEach((child) => {
        flatList.push({ ...child, isParent: false });
      });
    });

    // ارتفاع منو و آیتم
    const MENU_HEIGHT =
      typeof window !== "undefined"
        ? Math.round(window.innerHeight * 0.7)
        : 500;
    const ITEM_HEIGHT = 34; // می‌توانید این مقدار را داینامیک‌تر کنید
    const maxRows = Math.floor(MENU_HEIGHT / ITEM_HEIGHT);

    // محاسبه تعداد ستون مورد نیاز (ممکن است بیشتر از ۴ شود)
    let columnCount = Math.ceil(flatList.length / maxRows);
    let rows = maxRows;

    // تقسیم آیتم‌ها به صورت column-major
    const columns = Array.from({ length: columnCount }, (_, colIdx) => {
      return flatList.slice(colIdx * rows, (colIdx + 1) * rows);
    });
    // اگر ستون کمتر از ۴ تا بود، ستون‌های خالی اضافه کن تا همیشه ۴ ستون اول داشته باشیم
    while (columns.length < 4) {
      columns.push([]);
    }
    // اگر ستون بیشتر از ۴ تا بود، بقیه ستون‌ها را هم اضافه کن (برای اسکرول افقی)
    if (columnCount > 4) {
      for (let i = 4; i < columnCount; i++) {
        columns[i] = columns[i] || [];
      }
    }

    // تعداد ستون‌های پر شده و خالی (فقط برای ۴ ستون اول)
    const filledColumns = columns
      .slice(0, 4)
      .filter((col) => col.length > 0).length;
    const emptyColumns = 4 - filledColumns;

    // اگر ستون‌ها بیشتر از ۴ شد، اسکرول افقی فعال شود و عکس نمایش داده نشود
    const needsHorizontalScroll = columnCount > 4;

    // عکس فقط زمانی نمایش داده شود که اسکرول افقی فعال نیست و حداقل یک ستون خالی داریم
    let showImage = false;
    let imageColStart = filledColumns;
    let imageColSpan = emptyColumns;
    if (!needsHorizontalScroll && emptyColumns > 0) {
      showImage = true;
    }

    return (
      <div className="rounded-b-xl"
        style={{
          height: MENU_HEIGHT,
          overflowY: "hidden",
          overflowX: needsHorizontalScroll ? "auto" : "hidden",
          padding: "0 10px",
        }}
      >
        <div className="flex flex-row gap-8 rtl items-start min-w-full w-full">
          {columns.map((col, colIdx) => {
            // منطق نمایش عکس و حذف ستون چهارم در حالت دو ستونه
            let shouldShowImageHere = false;
            let imageClass = "";
            let hideThisColumn = false;

            if (showImage) {
              if ((filledColumns === 1 || filledColumns === 2) && colIdx === 2) {
                shouldShowImageHere = true;
                imageClass = "w-1/2 h-full flex items-end justify-center flex-col ml-0";
              } else if (filledColumns === 3 && colIdx === 3) {
                shouldShowImageHere = true;
                imageClass = "w-1/4 h-full flex items-end justify-center flex-col ml-0";
              }
              // اگر فقط یک یا دو ستون دیتا داریم، ستون چهارم را نساز
              if ((filledColumns === 1 || filledColumns === 2) && colIdx === 3) {
                hideThisColumn = true;
              }
            }
            if (hideThisColumn) return null;

            return (
              <div
                className={`h-[68vh] relative flex flex-col min-w-0 ${shouldShowImageHere ? imageClass : 'w-1/4'}`}
                key={colIdx}
              >
                {col.map((item, idx) => (
                  <div
                    key={`${item.isParent ? "parent" : "child"}-${item.id}-${idx}`}
                    className={`line-clamp-1 pb-2 ${item.isParent ? 'text-[#d1182b] font-bold text-[16px] pt-2' : 'text-[#222] font-medium text-[15px]'} whitespace-nowrap font-inherit cursor-pointer transition-all duration-200`}
                    style={{height: `${ITEM_HEIGHT}px`, lineHeight: `${ITEM_HEIGHT}px`, textAlign: item.isParent ? undefined : "right"}}
                    onClick={() => onNavigation(item.url || item.pageUrl || "#")}
                    onMouseOver={e => {
                      if (item.isParent) {
                        e.currentTarget.style.fontSize = "18px";
                      } else {
                        e.currentTarget.style.color = "#d1182b";
                        e.currentTarget.style.fontSize = "17px";
                      }
                    }}
                    onMouseOut={e => {
                      if (item.isParent) {
                        e.currentTarget.style.fontSize = "16px";
                      } else {
                        e.currentTarget.style.color = "#222";
                        e.currentTarget.style.fontSize = "15px";
                      }
                    }}
                  >
                    {item.title}
                  </div>
                ))}
                {/* عکس فقط در ستون مناسب و با کلاس مناسب */}
                {shouldShowImageHere && (
                  <div className="w-full h-[68vh] flex  items-end justify-center flex-col ml-0">
                    <img
                      src={
                        activeMenu?.image
                          ? getImageUrl(activeMenu.image)
                          : "/images/gallery/best-video-cameras.png"
                      }
                      alt=""
                      className="w-full object-contain "
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
