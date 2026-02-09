import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyPriceList from "@/components/priceList/bodyPriceList";
import { getCategory } from "@/services/Category/categoryService";
import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const data = await getItemByUrl(decodedPathname);

  if (data.type === "error") {
    return {
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  }

  return {
    title: data?.seoInfo?.seoTitle ? data.seoInfo.seoTitle : data.title,
    description: data?.seoInfo?.seoDescription,
    keywords: data?.seoInfo?.seoKeywords,
    url: data.seoUrl,
    alternates: {
      canonical: data.seoUrl
        ? mainUrl + data.seoUrl
        : data.url
          ? mainUrl + data.url
          : mainUrl,
    },
    openGraph: {
      title: data?.seoInfo?.seoTitle ? data.seoInfo.seoTitle : data.title,
      description: data?.seoInfo?.seoDescription,
      url: data.seoUrl,
    },
    other: {
      seoHeadTags: data?.seoInfo?.seoHeadTags,
    },
  };
}

export default async function PriceList() {
  let categories = [];

  try {
    const result = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });

    // Check if result is an error object or valid array
    if (result && !result.type && Array.isArray(result)) {
      categories = result;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain breadcrumb={[{ title: "لیست قیمت محصولات" }]} />
        </div>
      </div>
      <Container>
        <BodyPriceList categories={categories} />
      </Container>
    </>
  );
}
