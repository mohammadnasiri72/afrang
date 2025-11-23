import BreadcrumbMain from "@/components/BreadcrumbMain";
import BodyGallerySkeleton from "@/components/skeletons/BodyGallerySkeleton";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";
import { getCategory } from "@/services/Category/categoryService";
import { getGallery } from "@/services/gallery/galleryServices";
import { getPropertyItem } from "@/services/Property/propertyService";
import { getSettings } from "@/services/settings/settingsService";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeaderGallery = dynamic(() =>
  import("@/components/Gallery/HeaderGallery")
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default async function Gallery({ searchParams }) {
  const searchParam = await searchParams;

  const ImagesData = await getGallery({
    LangCode: "fa",
    ...(searchParam.orderBy && { OrderBy: searchParam.orderBy }),
    PageSize: 16,
    PageIndex: Number(searchParam?.page) + 1 || 2,
  });
  const ImagesDataCurent = await getGallery({
    LangCode: "fa",
    ...(searchParam.orderBy && { OrderBy: searchParam.orderBy }),
    PageSize: 16,
    PageIndex: 1,
  });

  const settings = await getSettings();

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
  } catch (error) {
    console.error("Error fetching category:", error);
  }

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[1600px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "گالری کاربران" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto">
        <Suspense fallback={<HeaderGallerySkeleton />}>
          <HeaderGallery category={category} searchParam={searchParam}/>
        </Suspense>
        <Suspense fallback={<HeaderGallerySkeleton />}>
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
