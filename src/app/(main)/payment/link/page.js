"use client";

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

// تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
const toEnglishNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
};

export default function PaymentLinkPage() {
  const [paymentId, setPaymentId] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleInquiry = () => {
    if (paymentId.trim()) {
      startTransition(() => {
        router.push(`/payment/link/${paymentId.trim()}`);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInquiry();
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">استعلام پرداخت</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شناسه پرداخت
            </label>
            <Input
              value={paymentId}
              //   onChange={(e) => setPaymentId(e.target.value)}
              onChange={(e) => {
                const raw = toEnglishNumber(e.target.value).replace(/,/g, "");
                if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                  const formatted = raw === "" ? "" : String(raw);
                  setPaymentId(formatted);
                }
              }}
              onKeyDown={handleKeyPress}
              placeholder="مثال: 12345"
              size="large"
              className="w-full"
            />
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleInquiry}
            disabled={!paymentId.trim() || isPending}
            loading={isPending}
            className="w-full"
          >
            استعلام
          </Button>
        </div>
      </div>
    </>
  );
}
