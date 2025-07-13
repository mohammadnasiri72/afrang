"use client";

import React, { useMemo } from "react";
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaChevronLeft, FaFile, FaFolder, FaAngleLeft, FaArrowLeft, FaCaretLeft } from "react-icons/fa";

// Styled Components
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  transition: 'all 0.2s ease-in-out',
  fontFamily: 'inherit',
  cursor: 'pointer',
  minHeight: '40px',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(209, 24, 43, 0.08)',
    transform: 'translateX(4px)', // برای راست‌چین
    '& svg': {
      transform: 'translateX(-2px)',
    },
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'inherit',
  textAlign: 'right', // راست‌چین کردن متن
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    fontFamily: 'inherit',
    lineHeight: '1.4',
  },
}));

// استایل برای آیتم‌های پدر (که فرزند دارند)
const ParentItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'inherit',
  textAlign: 'right',
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 600,
    color: '#333', // رنگ پیشفرض برای آیتم‌های پدر
    fontFamily: 'inherit',
    lineHeight: '1.4',
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#d1182b',
  padding: '12px 16px 8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '4px',
  fontFamily: 'inherit',
  textAlign: 'right', // راست‌چین کردن
}));

// استایل برای آیتم‌های سطح دوم (فرزندان)
const SubItemContainer = styled(Box)(({ theme }) => ({
  padding: '6px 12px 8px 12px',
  backgroundColor: 'rgba(209, 24, 43, 0.02)',
  borderTop: '1px solid rgba(209, 24, 43, 0.1)',
  margin: '2px 0',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  display: 'none',
  opacity: 0,
  transform: 'translateY(-5px)',
  maxHeight: 0,
  '&.visible': {
    display: 'block',
    opacity: 1,
    transform: 'translateY(0)',
    maxHeight: '500px',
  },
}));

const SubItemGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // سه ستون ثابت
  gap: '8px',
  direction: 'rtl',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)', // دو ستون در موبایل
  },
}));

const SubItem = styled(ListItem)(({ theme }) => ({
  padding: '4px 6px',
  minHeight: '28px',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(209, 24, 43, 0.1)',
    transform: 'translateX(2px)',
  },
}));

const SubItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: 'inherit',
  textAlign: 'right',
  '& .MuiListItemText-primary': {
    fontSize: '12px',
    fontWeight: 700, // بولد برای فرزندان
    color: '#000', // رنگ مشکی برای فرزندان
    fontFamily: 'inherit',
    lineHeight: '1.3',
  },
}));

// استایل برای آیکون فرزندان
const ChildrenIcon = styled(FaAngleLeft)(({ theme }) => ({
  fontSize: '18px',
  color: '#d1182b', // رنگ پیشفرض برای آیکون آیتم‌های پدر
  marginLeft: '8px',
  transition: 'transform 0.2s ease-in-out',
  fontWeight: 'bold',
}));

// استایل برای آیکون آیتم‌های سطح دوم
const SubItemIcon = styled(FaCaretLeft)(({ theme }) => ({
  fontSize: '15px',
  color: '#d1182b',
  marginLeft: '6px',
  flexShrink: 0,
  fontWeight: 'bold',
}));

// استایل برای آیکون آیتم‌های لینک (بدون فرزند)
const LinkItemIcon = styled(FaCaretLeft)(({ theme }) => ({
  fontSize: '15px',
  color: '#d1182b',
  marginRight: '8px', // پشت متن قرار می‌گیرد
  flexShrink: 0,
  fontWeight: 'bold',
}));

// استایل برای آیکون آیتم‌های سطح اول که فرزند دارند
const ParentItemIcon = styled(FaFolder)(({ theme }) => ({
  fontSize: '12px',
  color: '#d1182b',
  marginLeft: '8px',
  transition: 'transform 0.2s ease-in-out',
}));

const SubmenuDropdown = ({ 
  activeMenu, 
  expandedChildren, 
  onChildToggle, 
  onNavigation 
}) => {
  const dropdownContent = useMemo(() => {
    if (!activeMenu || !activeMenu.Children || activeMenu.Children.length === 0) {
      return null;
    }

    return (
      <div className="pb-5">
        <CategoryTitle>
          {activeMenu.title}
        </CategoryTitle>
        <Box sx={{ 
          py: 0, 
          direction: 'rtl',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // دو ستون برای آیتم‌های اصلی
          gap: '0',
          alignItems: 'stretch', // همه ستون‌ها ارتفاع یکسان داشته باشند
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr', // یک ستون در موبایل
          },
        }}>
          {activeMenu.Children.map((child, index) => (
            <Box key={child.id} sx={{ 
              borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
              height: '100%', // ارتفاع کامل
              display: 'flex',
              flexDirection: 'column',
              '&:nth-child(even)': {
                borderRight: '1px solid rgba(0, 0, 0, 0.04)',
              },
            }}>
              {child.Children && child.Children.length > 0 ? (
                <div key={child.id}>
                  <StyledListItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (child.Children && child.Children.length > 0) {
                        onChildToggle(child.id, e);
                      } else {
                        onNavigation(child.url || child.pageUrl || "#");
                      }
                    }}
                    sx={{ 
                      borderBottom: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <ParentItemText
                      primary={child.title}
                    />
                    <ChildrenIcon 
                      sx={{ 
                        transform: expandedChildren.has(child.id) ? 'rotate(-90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out',
                      }} 
                    />
                  </StyledListItem>
                  <SubItemContainer 
                    className={`sub-item-container ${expandedChildren.has(child.id) ? 'visible' : ''}`}
                  >
                    <SubItemGrid>
                      {child.Children.map((subChild) => (
                        <SubItem
                          key={subChild.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onNavigation(subChild.url || subChild.pageUrl || "#");
                          }}
                        >
                          <SubItemIcon />
                          <SubItemText
                            primary={subChild.title}
                          />
                        </SubItem>
                      ))}
                    </SubItemGrid>
                  </SubItemContainer>
                </div>
              ) : (
                <StyledListItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigation(child.url || child.pageUrl || "#");
                  }}
                  sx={{ 
                    borderBottom: 'none',
                    flexDirection: 'row-reverse', // آیکون پشت متن قرار می‌گیرد
                    '&:hover': {
                      backgroundColor: 'rgba(209, 24, 43, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  
                  <StyledListItemText 
                    primary={child.title}
                    primaryTypographyProps={{
                      sx: { 
                        fontWeight: 700, // بولد
                        color: '#000', // رنگ مشکی
                        fontFamily: 'inherit',
                        fontSize: '14px',
                      }
                    }}
                  />
                  <LinkItemIcon />
                </StyledListItem>
              )}
            </Box>
          ))}
        </Box>
      </div>
    );
  }, [activeMenu, expandedChildren, onChildToggle, onNavigation]);

  return dropdownContent;
};

export default SubmenuDropdown; 