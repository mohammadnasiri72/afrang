"use client";

import { useEffect } from "react";

/**
 * کامپوننت برای لاگ کردن زمان لود منابع استاتیک (فونت‌ها، عکس‌ها، script‌ها)
 * فقط در محیط development فعال است
 */
export default function ResourceLoadLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const logResourceTiming = () => {
      if (typeof performance === "undefined" || !performance.getEntriesByType) {
        return;
      }

      const resources = performance.getEntriesByType("resource");
      const slowResources = [];

      resources.forEach((resource) => {
        const duration = resource.responseEnd - resource.startTime;
        const name = resource.name;

        // منابع کند (بیشتر از 500ms)
        if (duration > 500) {
          slowResources.push({
            name,
            duration: duration.toFixed(2),
            type: resource.initiatorType || "unknown",
            size: resource.transferSize || 0,
            cached: resource.transferSize === 0,
          });
        }
      });

      if (slowResources.length > 0) {
        slowResources.forEach((resource) => {
          const cachedLabel = resource.cached ? " (کش شده)" : "";
          const sizeKB = (resource.size / 1024).toFixed(2);
        
        });
      }

      // لاگ فونت‌ها
      const fonts = resources.filter((r) => r.name.includes("/font/"));
      if (fonts.length > 0) {
        fonts.forEach((font) => {
          const duration = (font.responseEnd - font.startTime).toFixed(2);
          const fontName = font.name.split("/").pop() || font.name;
        });
      }

      // لاگ عکس‌ها
      const images = resources.filter(
        (r) =>
          r.initiatorType === "img" ||
          r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      );
      if (images.length > 0) {
        const slowImages = images.filter(
          (img) => img.responseEnd - img.startTime > 1000
        );
        if (slowImages.length > 0) {
          slowImages.forEach((img) => {
            const duration = (img.responseEnd - img.startTime).toFixed(2);
            const imgName = img.name.split("/").pop() || img.name;
            const sizeKB = ((img.transferSize || 0) / 1024).toFixed(2);
          
          });
        }
      }

      // لاگ script‌ها
      const scripts = resources.filter((r) => r.initiatorType === "script");
      if (scripts.length > 0) {
        const slowScripts = scripts.filter(
          (script) => script.responseEnd - script.startTime > 500
        );
        if (slowScripts.length > 0) {
          slowScripts.forEach((script) => {
            const duration = (script.responseEnd - script.startTime).toFixed(2);
            const scriptName = script.name.split("/").pop() || script.name;
            const sizeKB = ((script.transferSize || 0) / 1024).toFixed(2);
           
          });
        }
      }

      // لاگ CSS
      const stylesheets = resources.filter(
        (r) => r.initiatorType === "link" && r.name.includes(".css")
      );
      if (stylesheets.length > 0) {
        const slowCSS = stylesheets.filter(
          (css) => css.responseEnd - css.startTime > 500
        );
        if (slowCSS.length > 0) {
          slowCSS.forEach((css) => {
            const duration = (css.responseEnd - css.startTime).toFixed(2);
            const cssName = css.name.split("/").pop() || css.name;
            const sizeKB = ((css.transferSize || 0) / 1024).toFixed(2);
           
          });
        }
      }
    };

    // اجرای لاگ بعد از لود کامل صفحه
    if (document.readyState === "complete") {
      setTimeout(logResourceTiming, 1000);
    } else {
      window.addEventListener("load", () => {
        setTimeout(logResourceTiming, 1000);
      });
    }

    // همچنین بعد از 3 ثانیه هم چک می‌کنیم
    const timeout = setTimeout(logResourceTiming, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}



