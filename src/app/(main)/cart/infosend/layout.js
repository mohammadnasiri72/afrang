import { mainUrl } from "@/utils/mainDomain";
import React from "react";

export const metadata = {
  title: "سبد خرید | اطلاعات ارسال",
  description: "سبد خرید | اطلاعات ارسال",
  alternates: {
    canonical: mainUrl + "/cart/infosend",
  },
};
export default async function layoutCard({ children }) {
  return <div>{children}</div>;
}
