import { mainUrl } from "@/utils/mainDomain";
import React from "react";

export const metadata = {
  title: "سبد خرید | اطلاعات پرداخت",
   description: "سبد خرید | اطلاعات پرداخت",
   alternates: {
      canonical: mainUrl + "/cart/infopay",
    },
};
export default async function layoutCard({ children }) {
  return <div>
    {children}
    </div>;
}
