import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

// ساخت متادیتا پویا برای خبر
export async function generateMetadata({ params }) {
  try {
    let url = "";

    // استخراج مسیر از پارامترها
    if (params?.slug?.length) {
      url = `/news/${params.slug.map(decodeURIComponent).join("/")}`;
    } else {
      const headersList = headers();
      const referer = headersList.get("x-url") || headersList.get("referer");
      if (referer) {
        const path = new URL(referer).pathname;
        url = decodeURIComponent(path);
      }
    }

    const blog = await getItemByUrl(url);
    if (!blog || blog.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    const title = blog?.seoInfo?.seoTitle
      ? blog?.seoInfo?.seoTitle
      : blog?.title;
    const description = blog?.seoInfo?.seoDescription;
    const keywords = blog?.seoInfo?.seoKeywords;

    return {
      title,
      description,
      keywords: keywords.split(",").map((k) => k.trim()),
      alternates: {
        canonical: mainUrl + url,
      },
      openGraph: {
        title,
        description,
        url: mainUrl + url,
      },

      other: {
        seoHeadTags: blog?.seoInfo?.seoHeadTags,
      },
    };
  } catch (err) {
    console.error("❌ generateMetadata error:", err);
    return {
      title: "خطا در بارگذاری خبر",
      description: "مشکلی در دریافت اطلاعات صفحه پیش آمده است.",
    };
  }
}

// layout فقط برای صفحه خبر
export default async function LayoutNewsDetails({ children, params }) {
  let url = "";

  if (params?.slug?.length) {
    url = `/news/${params.slug.map(decodeURIComponent).join("/")}`;
  } else {
    const headersList = headers();
    const referer = headersList.get("x-url") || headersList.get("referer");
    if (referer) {
      const path = new URL(referer).pathname;
      url = decodeURIComponent(path);
    }
  }

  const blog = await getItemByUrl(url);

  if (!blog || blog.type === "error") {
    return notFound();
  }

  return <main>{children}</main>;
}
