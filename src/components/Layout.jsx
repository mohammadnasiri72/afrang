// "use client";

// import { fetchCartData } from "@/redux/slices/cartSlice";
// import { setError } from "@/redux/slices/menuResSlice";
// import { setUser } from "@/redux/slices/userSlice";
// import { createCache, StyleProvider } from "@ant-design/cssinjs";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { ConfigProvider } from "antd";
// import faIR from "antd/locale/fa_IR";
// import Cookies from "js-cookie";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
// import { FaChevronUp } from "react-icons/fa";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { makeStore } from "../redux/makeStore";
// import Loading from "./Loading";

// const generateRandomUserId = () => {
//   if (typeof crypto !== "undefined" && crypto.randomUUID) {
//     return crypto.randomUUID();
//   }
//   // fallback: ساخت UUID ساده با Math.random
//   return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0,
//       v = c === "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// // کامپوننت برای مدیریت داده‌های اولیه
// function InitialDataManager() {
//   const dispatch = useDispatch();
//   const { cartType, initialized } = useSelector((state) => state.cart);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);
//   const initializedRef = useRef(false);
//   const lastUserId = useRef(null);
//   const userCookie = Cookies.get("user");
//   const [isMergingCart, setIsMergingCart] = useState(false);

//   // اضافه کردن mounted state برای جلوگیری از hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ذخیره guest userId در localStorage اگر کاربر مهمان باشد
//   useEffect(() => {
//     if (mounted && userCookie) {
//       const userData = JSON.parse(userCookie);
//       // اگر کاربر مهمان باشد (token ندارد) و userId دارد
//       if (!userData.token && userData.userId) {
//         localStorage.setItem("guestUserId", userData.userId);
//       }
//     }
//   }, [mounted, userCookie]);

//   useEffect(() => {
//     const loadData = async () => {
//       // فقط بعد از mount شدن کامپوننت و در client side
//       if (!mounted) return;

//       try {
//         // فقط در اولین بار اجرا می‌شود
//         if (!initializedRef.current) {
//           initializedRef.current = true;
//         }

//         // فقط اگر کاربر لاگین باشد و token داشته باشد
//         if (userCookie && JSON.parse(userCookie)?.token) {
//           const currentUserId = JSON.parse(userCookie)?.userId;

//           // جلوگیری از fetch مکرر و فقط اگر قبلاً initialize نشده باشد
//           if (lastUserId.current !== currentUserId || !initialized) {
//             lastUserId.current = currentUserId;

//             // بررسی اینکه آیا کاربر قبلاً مهمان بوده و cart داشته یا نه
//             const storedGuestUserId = localStorage.getItem("guestUserId");
//             if (storedGuestUserId && storedGuestUserId !== currentUserId) {
//               setIsMergingCart(true);

//               try {
//                 const userData = JSON.parse(userCookie);

//                 // ذخیره userId کاربر لاگین شده در localStorage برای استفاده در mergeGuestCart
//                 localStorage.setItem("user", JSON.stringify(userData));

//                 // await dispatch(
//                 //   mergeGuestCartWithUser({
//                 //     guestUserId: storedGuestUserId,
//                 //     currentUserId: userData.userId,
//                 //   })
//                 // ).unwrap();

//                 // پاک کردن guestUserId از localStorage
//                 localStorage.removeItem("guestUserId");
//               } catch (error) {
//                 console.error("Error merging guest cart:", error);
//               } finally {
//                 setIsMergingCart(false);
//               }
//             }

//             dispatch(fetchCartData());
//           }
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//         if (!initializedRef.current) {
//           dispatch(setError(error.message));
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, [mounted, cartType, dispatch, userCookie, initialized]);

//   if (isLoading || !mounted || isMergingCart)
//     return (
//       <>
//         <Loading />
//       </>
//     );

//   return null;
// }

// function ScrollToTopButton() {
//   const [visible, setVisible] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY || window.pageYOffset;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const percent =
//         docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
//       setProgress(percent);
//       setVisible(scrollTop > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         left: 4,
//         zIndex: 1000,
//         width: 36,
//         height: 36,
//         display: visible ? "flex" : "none",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#fff",
//         borderRadius: "50%",
//         boxShadow: "0 2px 16px 2px rgba(0,0,0,0.22)",
//         cursor: "pointer",
//         transition: "box-shadow 0.2s",
//       }}
//       onClick={handleClick}
//       aria-label="scroll to top"
//       className="group bottom-44 sm:bottom-[32px]"
//     >
//       <div style={{ position: "absolute", width: 36, height: 36 }}>
//         <CircularProgressbar
//           value={progress}
//           strokeWidth={7}
//           styles={buildStyles({
//             pathColor: "#d1182b",
//             trailColor: "#f3f3f3",
//             backgroundColor: "#fff",
//           })}
//         />
//       </div>
//       <FaChevronUp
//         style={{
//           position: "absolute",
//           left: 0,
//           right: 0,
//           top: 0,
//           bottom: 0,
//           margin: "auto",
//           width: 15,
//           height: 15,
//           color: "#d1182b",
//           zIndex: 2,
//           transition: "color 0.2s",
//         }}
//         className="group-hover:text-[#b91626]"
//       />
//     </div>
//   );
// }

// // کامپوننت اصلی که Provider را فراهم می‌کند
// function Layout({ children, settings }) {
//   const { store } = makeStore({
//     settings: { settings },
//   });
//   // no client-time dispatch here to avoid hydration mismatch

//   const pathname = usePathname();
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => {
//       const userCookie = Cookies.get("user");

//       if (!userCookie) {
//         const initialData = {
//           token: "",
//           refreshToken: "",
//           expiration: "",
//           userId: generateRandomUserId(),
//           displayName: "",
//           roles: [],
//         };
//         Cookies.set("user", JSON.stringify(initialData));
//         store.dispatch(setUser(initialData));
//       }
//     }, 2000);
//   }, []);

//   const [cache] = useState(() => createCache());

//   return (
//     <StyleProvider cache={cache}>
//       <ConfigProvider direction="rtl" locale={faIR}>
//         <AntdRegistry>
//           <Provider store={store}>
//             <div className="bg-[#f6f6f6]"

//             >
//               <>
//                 {/* <DynamicTitle /> */}
//                 <InitialDataManager />
//                 {children}
//               </>
//               <ScrollToTopButton />
//             </div>
//           </Provider>
//         </AntdRegistry>
//       </ConfigProvider>
//     </StyleProvider>
//   );
// }

// export default Layout;

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

  // لاگ تغییر route
  useEffect(() => {
    if (pathname && process.env.NODE_ENV === "development") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

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
