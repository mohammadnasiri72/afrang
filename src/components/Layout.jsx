"use client";

import { fetchCartData } from "@/redux/slices/cartSlice";
import { setError } from "@/redux/slices/menuResSlice";
import { setUser } from "@/redux/slices/userSlice";
import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { makeStore } from "../redux/makeStore";
import Loading from "./Loading";
import ResourceLoadLogger from "./ResourceLoadLogger";

// Dynamic import برای ScrollToTopButton تا bundle size کمتر شود
const ScrollToTopButton = dynamic(() => import("./ScrollToTopButton"), {
  ssr: false,
  loading: () => null,
});

// تابع کمکی برای لاگ زمان (فقط در محیط توسعه)
const logTime = (message, startTime) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const endTime = performance.now();
    const duration = endTime - startTime;

    return endTime;
  }
  return startTime;
};

const generateRandomUserId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// کامپوننت برای مدیریت داده‌های اولیه
function InitialDataManager() {
  const dispatch = useDispatch();
  const { cartType, initialized } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const initializedRef = useRef(false);
  const lastUserId = useRef(null);
  const userCookie = Cookies.get("user");
  const [isMergingCart, setIsMergingCart] = useState(false);

  // لاگ زمان mount شدن
  useEffect(() => {
    const startTime = performance.now();
    setMounted(true);
    logTime("InitialDataManager mounted", startTime);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // ذخیره guest userId در localStorage اگر کاربر مهمان باشد
  useEffect(() => {
    if (mounted && userCookie) {
      const startTime = performance.now();
      const userData = JSON.parse(userCookie);
      if (!userData.token && userData.userId) {
        localStorage.setItem("guestUserId", userData.userId);
      }
      logTime("Guest userId storage check", startTime);
    }
  }, [mounted, userCookie]);

  useEffect(() => {
    const loadData = async () => {
      const loadStartTime = performance.now();

      if (!mounted) return;

      try {
        if (!initializedRef.current) {
          initializedRef.current = true;
        }

        if (userCookie && JSON.parse(userCookie)?.token) {
          const currentUserId = JSON.parse(userCookie)?.userId;

          if (lastUserId.current !== currentUserId || !initialized) {
            lastUserId.current = currentUserId;

            const storedGuestUserId = localStorage.getItem("guestUserId");
            if (storedGuestUserId && storedGuestUserId !== currentUserId) {
              setIsMergingCart(true);

              try {
                const userData = JSON.parse(userCookie);
                localStorage.setItem("user", JSON.stringify(userData));
              } catch (error) {
                console.error("Error merging guest cart:", error);
              } finally {
                setIsMergingCart(false);
              }
            }

            const fetchStartTime = performance.now();
            dispatch(fetchCartData());
            logTime("fetchCartData dispatched", fetchStartTime);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        if (!initializedRef.current) {
          dispatch(setError(error.message));
        }
      } finally {
        setIsLoading(false);
        logTime("InitialDataManager total load", loadStartTime);
      }
    };

    loadData();
  }, [mounted, cartType, dispatch, userCookie, initialized]);

  if (isLoading || !mounted || isMergingCart)
    return (
      <>
        <Loading />
      </>
    );

  return null;
}

// کامپوننت اصلی که Provider را فراهم می‌کند
function Layout({ children, settings }) {
  const layoutStartTime = useRef(performance.now());
  const [renderTimes, setRenderTimes] = useState([]);

  const { store } = makeStore({
    settings: { settings },
  });

  const pathname = usePathname();

  // لاگ‌گیری برای کل Layout
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const mountStartTime = performance.now();

      // اندازه‌گیری زمان کل
      const totalTime = performance.now() - layoutStartTime.current;

      // ذخیره زمان رندر
      setRenderTimes((prev) => [...prev.slice(-9), totalTime]);

      // وقتی DOM کامل شد
      const handleLoad = () => {
        const domCompleteTime = performance.now() - layoutStartTime.current;

        // گزارش Navigation Timing API
        if (performance.getEntriesByType("navigation").length > 0) {
          const navigation = performance.getEntriesByType("navigation")[0];
        }

        // گزارش منابع کند
        const resources = performance.getEntriesByType("resource");
        resources.forEach((res) => {
          if (res.duration > 1000) {
          }
        });
      };

      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    // کاهش تاخیر از 2000ms به 100ms برای بهبود UX
    const cookieStartTime = performance.now();
    const timeoutId = setTimeout(() => {
      const userCookie = Cookies.get("user");

      if (!userCookie) {
        const initialData = {
          token: "",
          refreshToken: "",
          expiration: "",
          userId: generateRandomUserId(),
          displayName: "",
          roles: [],
        };
        Cookies.set("user", JSON.stringify(initialData));
        store.dispatch(setUser(initialData));
      }
      logTime("Cookie initialization", cookieStartTime);
    }, 100); // کاهش از 2000ms به 100ms

    return () => clearTimeout(timeoutId);
  }, []);

  const [cache] = useState(() => createCache());

  // محاسبه میانگین زمان رندر
  const averageRenderTime =
    renderTimes.length > 0
      ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length
      : 0;

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider direction="rtl" locale={faIR}>
        <AntdRegistry>
          <Provider store={store}>
            {/* نمایش زمان رندر در محیط توسعه */}
            {process.env.NODE_ENV === "development" && (
              <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded z-[9999]">
                Render: {renderTimes[renderTimes.length - 1]?.toFixed(0) || "0"}
                ms
                {averageRenderTime > 0 &&
                  ` | Avg: ${averageRenderTime.toFixed(0)}ms`}
              </div>
            )}

            <div className="bg-[#f6f6f6]">
              <>
                <InitialDataManager />
                {children}
              </>
              <ScrollToTopButton />

              {/* لاگر منابع استاتیک */}
              <ResourceLoadLogger />
            </div>
          </Provider>
        </AntdRegistry>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default Layout;
