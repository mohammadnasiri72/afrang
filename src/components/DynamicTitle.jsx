"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettingsData } from "@/redux/slices/settingsSlice";
import { mainDomainImg } from "@/utils/mainDomain";

const DynamicTitle = () => {
  const { settings } = useSelector((state) => state.settings);

 

  useEffect(() => {
    if (settings && settings.length > 0) {
      // Update title
      const siteTitle = settings.find(
        (item) => item.propertyKey === "site_title"
      )?.value;
      if (siteTitle) {
        document.title = siteTitle;
      } else {
        document.title = "خانه عکاسان افرنگ";
      }

      // Update favicon
      const favicon = settings.find(
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
  }, [settings]);

  return null;
};

export default DynamicTitle;
