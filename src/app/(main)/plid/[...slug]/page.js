import { headers } from "next/headers";
import BoxShowInformationBank from "./BoxShowInformationBank";
import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const data = await getItemByUrl("/" + decodedPathname.split("/")[1]);

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

export default async function PaymentLinkPage(props) {
  const params = await props.params;
  const slug = await params;
  const id = Number(slug.slug[0]);

  return (
    <>
      <BoxShowInformationBank id={id} />
    </>
  );
}
