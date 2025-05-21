"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./../redux/store";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import BoxImgBranding from "./home/BoxImgBranding";
import SupportBox from "./home/SupportBox";
import NavBar from "./NavBar";
import SocialNetworks from "./SocialNetworks";
import SubFooter from "./SubFooter";
import SubHeader from "./SubHeader";
import DynamicTitle from "./DynamicTitle";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/redux/slices/cartSlice";
import { getCart, getNextCart } from "@/services/cart/cartService";
import { setLoading, setMenuItems, setError } from "@/redux/slice/menuRes";
import { fetchMenuItems } from "@/services/menuService";

const generateRandomUserId = () => {
  return crypto.randomUUID();
};

// کامپوننت برای مدیریت داده‌های اولیه
function InitialDataManager() {
  const dispatch = useDispatch();
  const { cartType } = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (initialized.current) return;
        initialized.current = true;

        dispatch(setLoading());
        const menuItems = await fetchMenuItems();
        dispatch(setMenuItems(menuItems));

        const userId = JSON.parse(Cookies.get("user"))?.userId;
        const cartResponse = cartType === 'next'
          ? await getNextCart(userId)
          : await getCart(userId);
        dispatch(updateCart({ items: cartResponse || [], cartType }));
      } catch (error) {
        console.error("Error loading initial data:", error);
        dispatch(setError(error.message));
        dispatch(updateCart({ items: [], cartType }));
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  if (isLoading) return null;
  return null;
}

function Layout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
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
      Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <DynamicTitle />
        {mounted ? (
          <>
            <InitialDataManager />
            <div>
              {!pathname.includes("/login") &&
                !pathname.includes("/register") && (
                  <>
                    <SubHeader />
                    <Header />
                    <NavBar />
                    <SocialNetworks />
                  </>
                )}
              {children}
              {!pathname.includes("/login") &&
                !pathname.includes("/register") && (
                  <>
                    <BoxImgBranding />
                    <SupportBox />
                    <Footer />
                    <SubFooter />
                  </>
                )}
            </div>
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
