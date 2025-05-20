import React from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata = {
  title: "محصولات",
  description: "محصولات",
};

export default async function layoutProduct({ children }) {
  return (
    <div>
      <BreadcrumbNav />
      {children}
    </div>
  );
}
