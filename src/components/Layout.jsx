"use client";

import { AuthProvider } from "@/context/AuthContext";
import { setError, setLoading, setMenuItems } from "@/redux/slice/menuRes";
import { updateCart } from "@/redux/slices/cartSlice";
import { addToCart, deleteCartItem, getCart, getNextCart } from "@/services/cart/cartService";
import { fetchMenuItems } from "@/services/menuService";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const { cartType } = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);
  const lastUserId = useRef(null);
  const lastCartType = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // فقط در اولین بار اجرا می‌شود
        if (!initialized.current) {
          initialized.current = true;
          dispatch(setLoading());
          const menuItems = await fetchMenuItems();
          dispatch(setMenuItems(menuItems));
        }

        const currentUserId = user?.userId || JSON.parse(Cookies.get("user"))?.userId;
        const isLoggedIn = user?.token; // چک کردن وضعیت لاگین



        // اگر کاربر لاگین شده و قبلاً لاگین نبوده (تغییر از حالت مهمان به کاربر)
        if (isLoggedIn && lastUserId.current && lastUserId.current !== currentUserId) {


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
                  console.error('Error adding item to new cart:', error);
                }
              }
            }

            // دریافت سبد خرید نهایی بعد از ادغام
            const finalCartItems = await getCart(currentUserId);
            dispatch(updateCart({ items: finalCartItems || [], cartType }));

            // حذف سبد خرید قبلی
            if (previousCartItems && previousCartItems.length > 0) {
              for (const item of previousCartItems) {
                try {
                  await deleteCartItem(item.id, lastUserId.current);
                } catch (error) {
                  console.error('Error deleting item from previous cart:', error);
                }
              }
            }
          } catch (error) {
            console.error("Error in cart merge process:", error);
          }
        }

        // به‌روزرسانی lastUserId و lastCartType
        if (currentUserId !== lastUserId.current || cartType !== lastCartType.current) {


          lastUserId.current = currentUserId;
          lastCartType.current = cartType;

          if (currentUserId) {
            const cartResponse = cartType === 'next'
              ? await getNextCart(currentUserId)
              : await getCart(currentUserId);
            dispatch(updateCart({ items: cartResponse || [], cartType }));
          } else {
            dispatch(updateCart({ items: [], cartType }));
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        if (!initialized.current) {
          dispatch(setError(error.message));
        }
        dispatch(updateCart({ items: [], cartType }));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, cartType, dispatch]);

  if (isLoading) return null;
  return null;
}

function Layout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const showHeaderFooter = !pathname.includes("/login") && !pathname.includes("/register");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {


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

      }

    }, 2000);


  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <DynamicTitle />
        {mounted ? (
          <>
            <InitialDataManager />
            <LayoutWrapper showHeaderFooter={showHeaderFooter}>
              {children}
            </LayoutWrapper>
          </>
        ) : (
          <div className="fixed inset-0 bg-white flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#d1182b] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </AuthProvider>
    </Provider>
  );
}

export default Layout;
