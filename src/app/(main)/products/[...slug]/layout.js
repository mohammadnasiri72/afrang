import { getCategoryChild } from "@/services/Property/propertyService";
import { mainUrl } from "@/utils/mainDomain";
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

    const title = ` لیست محصولات ${
      resultFilter?.category?.seoTitle
        ? resultFilter?.category?.seoTitle
        : resultFilter?.category?.title
    }`;
    const description = resultFilter?.category?.seoDescription;
    const keywords = resultFilter?.category?.seoKeywords;

    const url = `${mainUrl}${resultFilter?.category?.url}`;

    return {
      title,
      description,
      keywords: keywords,
      openGraph: {
        title,
        description,
      },

      alternates: {
        canonical: url,
      },

      other: {
        seoHeadTags: resultFilter?.category?.seoHeadTags,
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
