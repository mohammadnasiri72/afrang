"use client";

import React, { useMemo } from "react";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaCaretLeft, FaAngleLeft } from "react-icons/fa";

// Styled Components
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 16px",
  transition: "all 0.2s ease-in-out !important",
  fontFamily: "inherit",
  cursor: "pointer",
  minHeight: "40px",
  position: "relative",
  "&:hover": {
    backgroundColor: "rgba(209, 24, 43, 0.08)",
    transition: "all 0.2s ease-in-out",
    transform: "translateX(4px)",
    "& svg": {
      transform: "translateX(-2px)",
      transition: "all 0.2s ease-in-out",
    },
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: "inherit",
  textAlign: "right",
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    fontWeight: 500,
    color: "#333",
    fontFamily: "inherit",
    lineHeight: "1.4",
  },
}));

const ParentItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: "inherit",
  textAlign: "right",
  transition: "all 0.2s ease-in-out",
  display: "inline !important",
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    fontWeight: 600,
    color: "#333",
    fontFamily: "inherit",
    lineHeight: "1.4",
    transition: "all 0.2s ease-in-out",
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: "#d1182b",
  padding: "12px 16px 8px 16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  marginBottom: "4px",
  fontFamily: "inherit",
  textAlign: "right",
}));

// دو ستون مستقل با column-count
const ColumnsBox = styled(Box)(({ theme }) => ({
  columnCount: 2,
  columnGap: "0px",
  direction: "rtl",
  "@media (max-width: 768px)": {
    columnCount: 1,
  },
}));

const SubItem = styled(ListItem)(({ theme }) => ({
  padding: "4px 6px",
  minHeight: "28px",
  borderRadius: "4px",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  display: "block",
  breakInside: "avoid",
  "&:hover": {
    backgroundColor: "rgba(209, 24, 43, 0.1)",
    transform: "translateX(2px)",
  },
}));

const SubItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: "inherit",
  textAlign: "right",
  "& .MuiListItemText-primary": {
    fontSize: "12px",
    fontWeight: 700,
    color: "#000",
    fontFamily: "inherit",
    lineHeight: "1.3",
  },
}));

const LinkItemIcon = styled(FaCaretLeft)(({ theme }) => ({
  fontSize: "15px",
  color: "#d1182b",
  marginLeft: "8px",
  flexShrink: 0,
  fontWeight: "bold",
}));

const ParentArrowIcon = styled(FaAngleLeft)(({ theme }) => ({
  fontSize: "18px",
  color: "#14b8a6", // teal-500
  marginLeft: "8px",
  marginRight: 0,
  flexShrink: 0,
  fontWeight: "bold",
  transition: "color 0.2s, transform 0.2s",
}));

const SubItemGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  direction: "rtl",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
}));

const SubmenuDropdown = ({ activeMenu, onNavigation }) => {
  const dropdownContent = useMemo(() => {
    if (
      !activeMenu ||
      !activeMenu.Children ||
      activeMenu.Children.length === 0
    ) {
      return null;
    }

    return (
      <div className="pb-5">
        <CategoryTitle>{activeMenu.title}</CategoryTitle>
        <ColumnsBox>
          {activeMenu.Children.map((child) => (
            <div key={child.id} style={{ breakInside: "avoid" }}>
              {child.Children && child.Children.length > 0 ? (
                <StyledListItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigation(child.url || child.pageUrl || "#");
                  }}
                  sx={{
                    borderBottom: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    transition: "color 0.2s, background 0.2s",
                    "&:hover": {
                      backgroundColor: "#14b8a610",
                    },
                    "&:hover .parent-arrow-icon": {
                      color: "#14b8a6 !important",
                      transform: "rotate(-90deg)",
                    },
                  }}
                >
                  <ParentItemText
                    primary={child.title}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 600,
                        color: "#14b8a6 !important", // همیشه teal-500
                        fontFamily: "inherit",
                        fontSize: "14px",
                        transition: "0.5s",
                      },
                    }}
                  />
                  <ParentArrowIcon className="parent-arrow-icon" />
                </StyledListItem>
              ) : (
                <SubItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigation(child.url || child.pageUrl || "#");
                  }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LinkItemIcon />
                  <SubItemText
                    primary={child.title}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 700,
                        color: "#000",
                        fontFamily: "inherit",
                        fontSize: "14px",
                      },
                    }}
                  />
                </SubItem>
              )}
              {child.Children && child.Children.length > 0 && (
                <SubItemGrid>
                  {child.Children.map((subChild) => (
                    <SubItem
                      key={subChild.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigation(subChild.url || subChild.pageUrl || "#");
                      }}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <LinkItemIcon />
                      <SubItemText
                        primary={subChild.title}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: 700,
                            color: "#000",
                            fontFamily: "inherit",
                            fontSize: "14px",
                          },
                        }}
                      />
                    </SubItem>
                  ))}
                </SubItemGrid>
              )}
            </div>
          ))}
        </ColumnsBox>
      </div>
    );
  }, [activeMenu, onNavigation]);

  return dropdownContent;
};

export default SubmenuDropdown;
