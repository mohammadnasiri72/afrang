"use client";

import Loading from "@/components/Loading";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";

function CustomRouteLoaderContent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathname = useRef(pathname);
  const lastSearchParams = useRef(searchParams.toString());
  const navigationStartTime = useRef(0);
  const renderTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // تابع برای مقایسه URL (بدون hash)
  const normalizeUrl = (url) => {
    if (!url) return "";
    // حذف hash و query string برای مقایسه pathname
    const [path] = url.split("#");
    const [pathnameOnly] = path.split("?");
    return pathnameOnly;
  };

  // تابع برای چک کردن اینکه آیا URL تغییر کرده یا نه
 // تابع برای چک کردن اینکه آیا URL تغییر کرده یا نه - نسخه نهایی
const hasUrlChanged = (href, currentPathname, currentSearchParams) => {
  try {
    // 1. ساخت URL کامل از href
    let hrefUrl;
    try {
      hrefUrl = new URL(href, window.location.origin);
    } catch (error) {
      // اگر href مسیر نسبی بدون / است
      if (href && !href.startsWith('/') && !href.startsWith('http')) {
        hrefUrl = new URL('/' + href, window.location.origin);
      } else {
        throw error;
      }
    }

    // 2. استخراج بخش‌های مختلف
    const hrefPathname = hrefUrl.pathname;
    
    // تبدیل search params به شیء URLSearchParams
    const hrefSearchParams = new URLSearchParams(hrefUrl.search);
    const currentSearchParamsObj = new URLSearchParams(currentSearchParams.toString());

    // 3. مقایسه pathname
    if (hrefPathname !== currentPathname) {
      return true;
    }

    // 4. مقایسه search params
    // الف: مقایسه تعداد پارامترها
    if (hrefSearchParams.toString().split('&').filter(p => p).length !== 
        currentSearchParamsObj.toString().split('&').filter(p => p).length) {
      return true;
    }

    // ب: مقایسه تک‌تک پارامترها
    for (const [key, value] of currentSearchParamsObj.entries()) {
      if (hrefSearchParams.get(key) !== value) {
        return true;
      }
    }

    // ج: بررسی پارامترهایی که در href هستند اما در current نیستند
    for (const [key, value] of hrefSearchParams.entries()) {
      if (currentSearchParamsObj.get(key) !== value) {
        return true;
      }
    }

    return false;
    
  } catch (error) {
    console.error('Error in hasUrlChanged:', error, 'href:', href);
    return false; // در صورت خطا، فرض کن تغییر نکرده
  }
};

  // تشخیص رندر کامل صفحه
  useEffect(() => {
    if (!loading) return;

    // پاک کردن timeout قبلی
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    let mutationCount = 0;
    let lastMutationTime = Date.now();

    // استفاده از MutationObserver برای تشخیص تغییرات DOM
    const observer = new MutationObserver(() => {
      mutationCount++;
      lastMutationTime = Date.now();

      // بعد از تغییرات DOM، کمی صبر می‌کنیم تا مطمئن شویم رندر کامل شده
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }

      renderTimeoutRef.current = setTimeout(() => {
        // اگر بعد از 200ms تغییرات DOM متوقف شد، احتمالاً رندر کامل شده
        const timeSinceLastMutation = Date.now() - lastMutationTime;
        if (timeSinceLastMutation >= 200 && isNavigatingRef.current) {
          // چک می‌کنیم که آیا pathname یا searchParams تغییر کرده
          const currentSearchParamsStr = searchParams.toString();
          if (
            pathname !== lastPathname.current ||
            currentSearchParamsStr !== lastSearchParams.current
          ) {
            setLoading(false);
            isNavigatingRef.current = false;
            lastPathname.current = pathname;
            lastSearchParams.current = currentSearchParamsStr;
          }
        }
      }, 200); // 200ms delay برای اطمینان از رندر کامل
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Fallback: اگر بعد از 5 ثانیه هنوز لودینگ بود، آن را خاموش کن
    const fallbackTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        isNavigatingRef.current = false;
      }
    }, 50000);

    return () => {
      observer.disconnect();
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
      clearTimeout(fallbackTimeout);
    };
  }, [loading, pathname, searchParams]);

  // رهگیری تغییرات pathname و searchParams
  useEffect(() => {
    const currentSearchParamsStr = searchParams.toString();
    const pathnameChanged = pathname !== lastPathname.current;
    const searchParamsChanged =
      currentSearchParamsStr !== lastSearchParams.current;

    if (pathnameChanged || searchParamsChanged) {
      // اگر navigation در حال انجام است، لودینگ را خاموش کن
      if (isNavigatingRef.current) {
        // کمی delay برای اطمینان از رندر کامل
        setTimeout(() => {
          setLoading(false);
          isNavigatingRef.current = false;
        }, 200);
      }

      lastPathname.current = pathname;
      lastSearchParams.current = currentSearchParamsStr;
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // 1. رهگیری کلیک روی لینک‌ها
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // ignore موارد خاص
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.hasAttribute("data-fancybox") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        (!href.startsWith("/") &&
          typeof window !== "undefined" &&
          !href.startsWith(window.location.origin))
      ) {
        return;
      }

      // استخراج pathname و search params از href
      let hrefPathname = href;
      if (
        typeof window !== "undefined" &&
        href.startsWith(window.location.origin)
      ) {
        hrefPathname = href.replace(window.location.origin, "");
      }

      // چک کردن اینکه آیا URL واقعاً تغییر کرده یا نه
      if (!hasUrlChanged(hrefPathname, pathname, searchParams)) {
        return;
      }

      navigationStartTime.current = Date.now();
      isNavigatingRef.current = true;
      setLoading(true);
    };

    // 2. Monkey patch router.push
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args) => {
      const url =
        typeof args[0] === "string"
          ? args[0]
          : args[0].pathname + (args[0].search || "");

      // چک کردن اینکه آیا URL واقعاً تغییر کرده یا نه
      if (!hasUrlChanged(url, pathname, searchParams)) {
        return originalPush.apply(router, args);
      }

      navigationStartTime.current = Date.now();
      isNavigatingRef.current = true;
      setLoading(true);

      try {
        const result = await originalPush.apply(router, args);
        return result;
      } catch (error) {
        setLoading(false);
        isNavigatingRef.current = false;
        throw error;
      }
    };

    router.replace = async (...args) => {
      const url =
        typeof args[0] === "string"
          ? args[0]
          : args[0].pathname + (args[0].search || "");

      // چک کردن اینکه آیا URL واقعاً تغییر کرده یا نه
      if (!hasUrlChanged(url, pathname, searchParams)) {
        return originalReplace.apply(router, args);
      }

      navigationStartTime.current = Date.now();
      isNavigatingRef.current = true;
      setLoading(true);

      try {
        const result = await originalReplace.apply(router, args);
        return result;
      } catch (error) {
        setLoading(false);
        isNavigatingRef.current = false;
        throw error;
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, pathname, searchParams]);

  if (!loading) return null;
  return <Loading />;
}

export default function CustomRouteLoader() {
  return (
    <Suspense fallback={null}>
      <CustomRouteLoaderContent />
    </Suspense>
  );
}
