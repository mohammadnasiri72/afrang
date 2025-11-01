import BreadcrumbMain from "@/components/BreadcrumbMain";
import BodyGallerySkeleton from "@/components/skeletons/BodyGallerySkeleton";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";
import { getGallery } from "@/services/gallery/galleryServices";
import { getSettings } from "@/services/settings/settingsService";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeaderGallery = dynamic(() =>
  import("@/components/Gallery/HeaderGallery")
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default async function Gallery() {
  const ImagesData = await getGallery({
    LangCode: "fa",
    PageSize: 16,
    PageIndex: 1,
  });

  const settings = await getSettings();
  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[2000px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "گالری کاربران" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto">
        <Suspense fallback={<HeaderGallerySkeleton />}>
          <HeaderGallery />
        </Suspense>
        <Suspense fallback={<BodyGallerySkeleton />}>
          <BodyGallery ImagesDataCurrent={ImagesData} settings={settings} />
        </Suspense>
      </div>
    </>
  );
}
