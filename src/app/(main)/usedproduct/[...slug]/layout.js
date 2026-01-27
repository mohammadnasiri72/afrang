import { getProductSecId } from "@/services/UserAd/UserAdServices";
import React from "react";

export async function generateMetadata({ params }) {
  try {
    const id = await params.slug[0];
    const resultFilter = await getProductSecId(id);

    if (!resultFilter || resultFilter.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    const title = ` دست دوم کاربران ${
      resultFilter?.title ? `- ${resultFilter?.title}` : ""
    }`;

    return {
      title,
    };
  } catch (err) {
    console.error("❌ generateMetadata error:", err);
    return {
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  }
}

export default async function layoutUserAdd({ children }) {
  return <div>{children}</div>;
}
