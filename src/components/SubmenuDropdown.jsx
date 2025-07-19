"use client";

import React, { useMemo } from "react";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaCaretLeft, FaAngleLeft } from "react-icons/fa";

const ITEM_HEIGHT_PARENT = 34; // ارتفاع آیتم والد
const ITEM_HEIGHT_CHILD = 32; // ارتفاع آیتم فرزند
const COLUMN_GAP = 32;
const CONTAINER_HEIGHT = 420; // ارتفاع ثابت کل منو
const COLUMN_WIDTH = 230;

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

    // محاسبه تعداد ستون مورد نیاز (بدون اسکرول عمودی)
    const itemsPerColumn = Math.floor(CONTAINER_HEIGHT / ITEM_HEIGHT_PARENT);
    const columnCount = Math.ceil(flatList.length / itemsPerColumn);

    const columns = Array.from({ length: columnCount }, (_, i) =>
      flatList.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );

    // یک عکس انتهایی (فقط اگر ستون خالی داریم)
    const maxColumns = 4;
    const emptyColumns = Math.max(0, maxColumns - columnCount);
    const showImage = emptyColumns > 0;
    const imageWidth = Math.max(COLUMN_WIDTH, emptyColumns * COLUMN_WIDTH);

    return (
      <div
        style={{
          height: CONTAINER_HEIGHT,
          overflowY: "hidden", // جلوگیری از اسکرول عمودی
          padding: "0 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: `${COLUMN_GAP}px`,
            height: "100%",
            direction: "rtl",
            alignItems: "stretch",
            overflowX: "auto", // اگر ستون زیاد شد اسکرول افقی بخورد
          }}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: COLUMN_WIDTH,
                maxWidth: COLUMN_WIDTH,
                flex: `0 0 ${COLUMN_WIDTH}px`,
              }}
            >
              <div>
                {col.map((item, idx) =>
                  item.isParent ? (
                    <div
                      key={`parent-${item.id}-${idx}`}
                      className="line-clamp-1"
                      style={{
                        color: "#d1182b",
                        fontWeight: 700,
                        fontSize: 16,
                        paddingTop: 10,
                        whiteSpace: "nowrap",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        transition: "font-size 0.2s",
                        height: `${ITEM_HEIGHT_PARENT}px`,
                        lineHeight: `${ITEM_HEIGHT_PARENT}px`,
                      }}
                      onClick={() =>
                        item.url &&
                        onNavigation(item.url || item.pageUrl || "#")
                      }
                      onMouseOver={(e) =>
                        (e.currentTarget.style.fontSize = "18px")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.fontSize = "16px")
                      }
                    >
                      {item.title}
                    </div>
                  ) : (
                    <div
                      key={`child-${item.id}-${idx}`}
                      className="line-clamp-1"
                      style={{
                        color: "#222",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer",
                        textAlign: "right",
                        padding: "2px 0",
                        transition: "color 0.2s, font-size 0.2s",
                        fontFamily: "inherit",
                        height: `${ITEM_HEIGHT_CHILD}px`,
                        lineHeight: `${ITEM_HEIGHT_CHILD}px`,
                      }}
                      onClick={() =>
                        onNavigation(item.url || item.pageUrl || "#")
                      }
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = "#d1182b";
                        e.currentTarget.style.fontSize = "17px";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = "#222";
                        e.currentTarget.style.fontSize = "15px";
                      }}
                    >
                      {item.title}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
          {/* فقط یک عکس و سایز متناسب با ستون‌های خالی */}
          {showImage && (
            <div
              style={{
                minWidth: imageWidth,
                flex: `0 0 ${imageWidth}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginRight: "auto",
                paddingLeft: 0,
                marginLeft: 100,
                paddingRight: 0,
              }}
            >
              {/* <EmptyColumnSVG width={imageWidth} /> */}
              <img
                src="/images/gallery/best-video-cameras.png"
                alt=""
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }, [activeMenu, onNavigation]);
  return dropdownContent;
};

export default SubmenuDropdown;
