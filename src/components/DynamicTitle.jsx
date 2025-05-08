"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettingsData } from "@/redux/slice/settings";
import { mainDomainImg } from "@/utils/mainDomain";

const DynamicTitle = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.settings);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchSettingsData());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length > 0) {
      // Update title
      const siteTitle = items.find(
        (item) => item.propertyKey === "site_title"
      )?.value;
      if (siteTitle) {
        document.title = siteTitle;
      } else {
        document.title = "خانه عکاسان افرنگ";
      }

      // Update favicon
      const favicon = items.find(
        (item) => item.propertyKey === "site_icon"
      )?.value;
      if (favicon) {
        const faviconUrl = `${mainDomainImg}${favicon}`;
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = faviconUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }, [items]);

  return null;
};

export default DynamicTitle;
