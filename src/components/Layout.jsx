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
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./../redux/store";
import DynamicTitle from "./DynamicTitle";
import LayoutWrapper from "./LayoutWrapper";
import FloatingCompareIcon from "./common/FloatingCompareIcon";

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
            <FloatingCompareIcon />
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
      </div>
    </Provider>
  );
}

export default Layout;
