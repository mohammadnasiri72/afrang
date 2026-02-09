import BreadcrumbMain from "@/components/BreadcrumbMain";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";
import MainGallerySkeleton from "@/components/skeletons/MainGallerySkeleton";
import { getCategory } from "@/services/Category/categoryService";
import { getGallery } from "@/services/gallery/galleryServices";
import { getItemByUrl } from "@/services/Item/item";
import { getPropertyItem } from "@/services/Property/propertyService";
import { getSettings } from "@/services/settings/settingsService";
import { mainUrl } from "@/utils/mainDomain";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Suspense } from "react";

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
      canonical: decodedPathname ? mainUrl + decodedPathname : mainUrl,
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

const HeaderGallery = dynamic(
  () => import("@/components/Gallery/HeaderGallery"),
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default async function GalleryCategory({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  // const page = searchParam.get("page");
  // const page = searchParam.get("page");

  const id = Number(param.slug[0]);

  const rawSettings = await getSettings();
  const settings = Array.isArray(rawSettings) ? rawSettings : [];
  const ImagesData = await getGallery({
    LangCode: "fa",
    ...(searchParam.orderBy && { OrderBy: searchParam.orderBy }),
    ...(id > 0 && { CategoryIdArray: String(id) }),
    PageSize: 16,
    PageIndex: Number(searchParam?.page) + 1 || 2,
  });
  const ImagesDataCurent = await getGallery({
    LangCode: "fa",
    ...(searchParam.orderBy && { OrderBy: searchParam.orderBy }),
    ...(id > 0 && { CategoryIdArray: String(id) }),
    PageSize: 16,
    PageIndex: 1,
  });
  const ids = ImagesDataCurent.map((item) => item.id).join(",");
  const property = await getPropertyItem(ids);

  let category = [];

  try {
    const result = await getCategory({
      TypeId: 9,
      LangCode: "fa",
      Page: 1,
      PageSize: 100,
    });

    // Check if result is an error object or valid array
    if (result && !result.type && Array.isArray(result)) {
      category = result;
    }
  } catch (error) {}

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[1600px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "گالری کاربران" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto">
        <Suspense fallback={<HeaderGallerySkeleton />}>
          <HeaderGallery category={category} searchParam={searchParam} />
        </Suspense>
        <Suspense fallback={<MainGallerySkeleton />}>
          <BodyGallery
            ImagesDataCurent={ImagesDataCurent}
            settings={settings}
            ImagesData={ImagesData}
            listProperty={property}
            category={category}
          />
        </Suspense>
      </div>
    </>
  );
}
