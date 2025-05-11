"use client";
import BodyCompeletePay from "./BodyCompeletePay";
import DescCompeletePay from "./DescCompeletePay";

export default function CompeletePayWrapper() {
  return (
    <div className="flex flex-wrap items-start">
      <BodyCompeletePay />
      <DescCompeletePay />
    </div>
  );
} 