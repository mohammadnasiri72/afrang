import { getCategoryChild } from "@/services/Property/propertyService";
import { notFound } from "next/navigation";

// ساخت متادیتا پویا برای لیست محصولات
export async function generateMetadata({ params }) {
  try {
    const id = await params.slug[0];

    const resultFilter = await getCategoryChild(id);


    if (!resultFilter || resultFilter.type === "error") {
      return {
        title: "صفحه پیدا نشد",
        description: "صفحه مورد نظر یافت نشد",
      };
    }

    const {
      seoTitle = "لیست محصولات",
      seoDescription = "توضیحات لیست محصولات",
      seoKeywords = "",
      seoHeadTags = "",
    } = resultFilter.category || {};

    const title =
      resultFilter?.category?.seoTitle || seoTitle || "لیست محصولات";
    const description =
      resultFilter?.category?.seoDescription ||
      seoDescription ||
      "توضیحات لیست محصولات";
    const keywords = resultFilter?.category?.seoKeywords || seoKeywords;

    return {
      title,
      description,
      keywords: keywords,
      openGraph: {
        title,
        description,
      },

      other: {
        seoHeadTags,
      },
    };
  } catch (err) {
    console.error("❌ generateMetadata error:", err);
    return {
      title: "خطا در بارگذاری لیست محصولات",
      description: "مشکلی در دریافت اطلاعات صفحه پیش آمده است.",
    };
  }
}

// layout فقط برای صفحه لیست محصولات
export default async function LayoutProductList({ children, params }) {
  const id = await params.slug[0];
  const resultFilter = await getCategoryChild(id);

  if (!resultFilter || resultFilter.type === "error") {
    return notFound();
  }

  return <main>{children}</main>;
}
