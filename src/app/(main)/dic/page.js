import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getItem, getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";
import dynamic from "next/dynamic";
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

const BodyDic = dynamic(() => import("@/components/dic/bodyDic"), {
  loading: () => <div>در حال بارگذاری...</div>,
  ssr: true,
});

// تنظیمات کش برای بهبود عملکرد
export const revalidate = 900; // کش برای یک ساعت

export default async function Dic() {
  let dics = [];

  try {
    const result = await getItem({
      TypeId: 1039,
      LangCode: "fa",
      PageIndex: 1,
      PageSize: 200,
    });

    // Check if result is an error object or valid array
    if (result && !result.type && Array.isArray(result)) {
      dics = result;
    }
  } catch (error) {}

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[1600px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "واژگان فنی" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto">
        <Container>
          <BodyDic dics={dics} />
        </Container>
      </div>
    </>
  );
}
