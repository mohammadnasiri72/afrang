"use client";

import HeaderCard from "@/components/Card/HeaderCard";
import BodyPayment from "@/components/payment/BodyPayment";
import { fetchCartData } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const checkCart = async () => {
      dispatch(fetchCartData());
      if (!items || items.length === 0) {
        router.push("/cart");
      }
    };
    checkCart();
  }, [dispatch, items, router]);

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      {mounted && (
        <div className="container mx-auto px-4">
          <HeaderCard />
          <BodyPayment />
        </div>
      )}
    </div>
  );
}
