"use client";

import { AuthProvider } from "@/context/AuthContext";
import { fetchCartData, setCartType } from "@/redux/slices/cartSlice";
import {
  setError,
  setLoading,
  setMenuItems,
} from "@/redux/slices/menuResSlice";
import { fetchSettingsData } from "@/redux/slices/settingsSlice";
import { setUser } from "@/redux/slices/userSlice";
import { addToCart, getCart } from "@/services/cart/cartService";
import { fetchMenuItems } from "@/services/menuService";
import { getUserId } from "@/utils/cookieUtils";
import { mainDomain } from "@/utils/mainDomain";
import { syncUserCookieWithRedux } from "@/utils/manageCookie";
import { ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR"; // برای فارسی
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChevronUp } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./../redux/store";
import DynamicTitle from "./DynamicTitle";
import LayoutWrapper from "./LayoutWrapper";

const generateRandomUserId = () => {
  return crypto.randomUUID();
};

// کامپوننت برای مدیریت داده‌های اولیه
function InitialDataManager() {
  const dispatch = useDispatch();
  const { cartType } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);
  const lastUserId = useRef(null);
  const lastCartType = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // غیرفعال کردن بازیابی اسکرول
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // فقط در اولین بار اجرا می‌شود
        if (!initialized.current) {
          initialized.current = true;
          dispatch(setLoading());

          // دریافت منو و تنظیمات به صورت موازی
          const [menuItems, settingsData] = await Promise.all([
            fetchMenuItems(),
            dispatch(fetchSettingsData()).unwrap(),
          ]);

          dispatch(setMenuItems(menuItems));
        }

        const currentUserId = user?.userId || getUserId();
        const isLoggedIn = user?.token; // چک کردن وضعیت لاگین

        // اگر کاربر لاگین شده و قبلاً لاگین نبوده (تغییر از حالت مهمان به کاربر)
        if (
          isLoggedIn &&
          lastUserId.current &&
          lastUserId.current !== currentUserId
        ) {
          try {
            // دریافت سبد خرید قبلی (قبل از لاگین)
            const previousCartItems = await getCart(lastUserId.current);

            // دریافت سبد خرید جدید (بعد از لاگین)
            const newCartItems = await getCart(currentUserId);

            // اگر سبد خرید قبلی خالی نبود، محصولات رو به سبد خرید جدید اضافه کن
            if (previousCartItems && previousCartItems.length > 0) {
              for (const item of previousCartItems) {
                try {
                  await addToCart(
                    item.productId,
                    item.warrantyId || -1,
                    currentUserId,
                    item.quantity
                  );
                } catch (error) {
                  console.error("Error adding item to new cart:", error);
                }
              }
            }

            // دریافت سبد خرید نهایی بعد از ادغام
            dispatch(fetchCartData());

            // حذف سبد خرید قبلی
            if (previousCartItems && previousCartItems.length > 0) {
              for (const item of previousCartItems) {
                try {
                  await axios.delete(
                    `${mainDomain}/api/Cart/${lastUserId.current}/${item.id}`
                  );
                } catch (error) {
                  console.error(
                    "Error deleting item from previous cart:",
                    error
                  );
                }
              }
            }
          } catch (error) {
            console.error("Error in cart merge process:", error);
          }
        }

        // به‌روزرسانی lastUserId و lastCartType
        if (
          currentUserId !== lastUserId.current ||
          cartType !== lastCartType.current
        ) {
          lastUserId.current = currentUserId;
          lastCartType.current = cartType;

          if (currentUserId) {
            dispatch(setCartType(cartType));
            dispatch(fetchCartData());
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        if (!initialized.current) {
          dispatch(setError(error.message));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, cartType, dispatch]);

  if (isLoading) return null;
  return null;
}

// کامپوننت داخلی که از Redux استفاده می‌کند
function LayoutContent({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const showHeaderFooter =
    !pathname.includes("/login") &&
    !pathname.includes("/register") &&
    !pathname.includes("/forgot-password");

  const showPro = !pathname.includes("/product/");

  const showCart = !pathname.includes("/cart");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const userData = syncUserCookieWithRedux();
      if (!userData) {
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
    }, 2000);
  }, []);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <AuthProvider>
        <DynamicTitle />
        {mounted ? (
          <>
            <InitialDataManager />
            <LayoutWrapper
              showHeaderFooter={showHeaderFooter}
              showPro={showPro}
              showCart={showCart}
            >
              {children}
            </LayoutWrapper>
          </>
        ) : (
          <div className="fixed inset-0 bg-white flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#d1182b] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </AuthProvider>
    </ConfigProvider>
  );
}

// ScrollToTopButton component
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(percent);
      setVisible(scrollTop > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: 32,
        zIndex: 9999999,
        width: 56,
        height: 56,
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "50%",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.12)",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onClick={handleClick}
      title="برو بالا"
      className="group"
    >
      <div style={{ position: "absolute", width: 56, height: 56 }}>
        <CircularProgressbar
          value={progress}
          strokeWidth={7}
          styles={buildStyles({
            pathColor: "#d1182b",
            trailColor: "#f3f3f3",
            backgroundColor: "#fff",
          })}
        />
      </div>
      <FaChevronUp
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: 24,
          height: 24,
          color: "#d1182b",
          zIndex: 2,
          transition: "color 0.2s",
        }}
        className="group-hover:text-[#b91626]"
      />
    </div>
  );
}

// کامپوننت اصلی که Provider را فراهم می‌کند
function Layout({ children }) {
  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: "2000px",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <LayoutContent>{children}</LayoutContent>
        <ScrollToTopButton />
      </div>
    </Provider>
  );
}

export default Layout;
