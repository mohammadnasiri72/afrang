import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  try {
    let url = "";

    // استخراج مسیر از پارامترها
    if (params?.slug?.length) {
      url = `/dic/${params.slug.map(decodeURIComponent).join("/")}`;
    } else {
      const headersList = headers();
      const referer = headersList.get("x-url") || headersList.get("referer");
      if (referer) {
        const path = new URL(referer).pathname;
        url = decodeURIComponent(path);
      }
    }

    const dic = await getItemByUrl(url);

    if (!dic || dic.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    return {
      title: dic?.seoInfo?.seoTitle ? dic?.seoInfo?.seoTitle : dic.title,
      description: dic?.seoInfo?.seoDescription,
      keywords: dic?.seoInfo?.seoKeywords?.split(",").map((k) => k.trim()),
      alternates: {
        canonical: mainUrl + url,
      },
      openGraph: {
        title: dic?.seoInfo?.seoTitle ? dic?.seoInfo?.seoTitle : dic.title,
        description: dic?.seoInfo?.seoDescription,
        url: mainUrl + url,
      },

      other: {
        seoHeadTags: dic?.seoInfo?.seoHeadTags,
      },
    };
  } catch (err) {
    console.error("❌ generateMetadata error:", err);
    return {
      title: "خطا در بارگذاری واژگان فنی",
      description: "مشکلی در دریافت اطلاعات صفحه پیش آمده است.",
    };
  }
}

export default async function layoutDic({ children }) {
  return <div>{children}</div>;
}
