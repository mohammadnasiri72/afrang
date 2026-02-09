import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getItemByUrl } from "@/services/Item/item";
import { mainUrl } from "@/utils/mainDomain";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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

const HeaderContact = dynamic(
  () => import("@/components/contact/HeaderContact"),
);
const BodyContact = dynamic(() => import("@/components/contact/BodyContact"));

export default async function Contact() {
  try {
    const data = await getItemByUrl("contect-us");

    return (
      <>
        <div className="bg-white">
          <div className="overflow-hidden max-w-[1600px] mx-auto">
            <BreadcrumbMain breadcrumb={[{ title: "تماس باما" }]} />
          </div>
        </div>
        <div className="overflow-hidden max-w-[1600px] mx-auto">
          {data.image && <HeaderContact data={data} />}
          <div className="bg-[#f6f6f6] overflow-hidden">
            <Container>
              <BodyContact />
            </Container>
          </div>
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}
