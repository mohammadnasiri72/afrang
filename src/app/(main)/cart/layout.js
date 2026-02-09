import { mainUrl } from "@/utils/mainDomain";
import React from "react";

export const metadata = {
  title: "سبد خرید",
  description: "سبد خرید",
  alternates: {
    canonical: mainUrl + "/cart",
  },
};
export default async function layoutCard({ children }) {
  return <div>{children}</div>;
}
