"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./../redux/store";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import BoxImgBranding from "./home/BoxImgBranding";
import SupportBox from "./home/SupportBox";
import Loading from "./Loading";
import NavBar from "./NavBar";
import SocialNetworks from "./SocialNetworks";
import SubFooter from "./SubFooter";
import SubHeader from "./SubHeader";
import DynamicTitle from "./DynamicTitle";
import Cookies from "js-cookie";

const generateRandomUserId = () => {
  return crypto.randomUUID();
};


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
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        ) : (
          <Loading />
        )}
      </AuthProvider>
    </Provider>
  );
}

export default Layout;
