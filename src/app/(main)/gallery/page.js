import dynamic from "next/dynamic";
import { Suspense } from "react";
import BodyGallerySkeleton from "@/components/skeletons/BodyGallerySkeleton";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";
import { getGallery } from "@/services/gallery/galleryServices";
import { getSettings } from "@/services/settings/settingsService";

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
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Suspense fallback={<HeaderGallerySkeleton />}>
        <HeaderGallery />
      </Suspense>
      <Suspense fallback={<BodyGallerySkeleton />}>
        <BodyGallery ImagesDataCurrent={ImagesData} settings={settings}/>
      </Suspense>
    </div>
  );
}
