"use client";

import Container from "@/components/container";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const CompeletePayWrapper = dynamic(() =>
  import("@/components/CompeletePay/CompeletePayWrapper")
);

export default function CompletePay() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    

  useEffect(() => {
    const checkAuthAndCart = async () => {
      try {
        // Check for user token
        const userCookie = Cookies.get("user");

        if (!userCookie) {
          router.push("/cart");
          return;
        }

        const userData = JSON.parse(userCookie);
        if (!userData?.token) {
          router.push("/cart");
          return;
        }

        // Check cart items
        // if (!currentItems || currentItems.length === 0) {
        //     router.push('/cart');
        //     return;
        // }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/cart");
      }
    };

    checkAuthAndCart();
  }, [dispatch, currentItems, router]);

  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Container>
        <HeaderCard />
        <CompeletePayWrapper />
      </Container>
    </div>
  );
}
