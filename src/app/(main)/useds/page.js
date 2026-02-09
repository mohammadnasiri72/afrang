import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyUserAddSkeleton from "@/components/skeletons/BodyUserAddSkeleton";
import FilterSecSkeleton from "@/components/skeletons/FilterSecSkeleton";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import FilterSec from "@/components/UserAdd/FilterSec";
import { getItemByUrl } from "@/services/Item/item";
import { getUserAdBuy } from "@/services/UserAd/UserAdServices";
import { mainUrl } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { Suspense } from "react";

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



export default async function UserAdd(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

  const data = {
    LangCode: "fa",
    CategoryIdArray:
      typeof searchParams.category === "object"
        ? searchParams.category.join(",")
        : typeof searchParams.category === "string"
        ? searchParams.category
        : undefined,
    ...(searchParams.price1 && { Amount1: searchParams.price1 }),
    ...(searchParams.price2 && { Amount2: searchParams.price2 }),
    // IsActive: 1,
    OrderBy: Number(searchParams.orderby) || "1",
    // OrderOn: 1,
    PageSize: Number(searchParams.pageSize) || "20",
    PageIndex: Number(searchParams.page) || "1",
    IsArchive: searchParams.archived ? 1 : 0,
  };

  const productsData = await getUserAdBuy(data);
  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain breadcrumb={[{ title: "کالای دسته دوم" }]} />
        </div>
      </div>
      <Container>
        <div className="flex items-start overflow-hidden max-w-[1600px] mx-auto">
          <div className="w-1/4 lg:block hidden px-3">
            <Suspense fallback={<FilterSecSkeleton />}>
              <FilterSec />
            </Suspense>
          </div>
          <div className="lg:w-3/4 w-full">
            <Suspense fallback={<BodyUserAddSkeleton />}>
              <BodyUserAdd
                productList={productsData}
                pathname={"useds"}
                archived={searchParams.archived ? true : false}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
