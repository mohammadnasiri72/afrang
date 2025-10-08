// export const metadata = {
//   title: "فراموشی رمز عبور",
// };

import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";

export async function generateMetadata({ params }) {
  const data = await getItemByUrl(params.slug);

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

export default async function layoutSlug({ children }) {
  return <div>{children}</div>;
}
