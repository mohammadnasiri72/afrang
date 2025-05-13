"use client";
import { useSelector } from "react-redux";
import BodyCompeletePay from "./BodyCompeletePay";
import DescCompeletePay from "./DescCompeletePay";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function CompeletePayWrapper() {
  const { items } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/cart");
      return;
    }

    try {
      const user = JSON.parse(userCookie);
      if (!user.token) {
        router.push("/cart");
        return;
      }

      if (!items || items.length === 0) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      router.push("/cart");
    }
  }, [items, router]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start">
      <BodyCompeletePay />
      <DescCompeletePay />
    </div>
  );
} 