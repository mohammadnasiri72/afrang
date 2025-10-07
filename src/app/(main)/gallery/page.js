import dynamic from "next/dynamic";
import { Suspense } from "react";
import BodyGallerySkeleton from "@/components/skeletons/BodyGallerySkeleton";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";
import { getGallery } from "@/services/gallery/galleryServices";

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
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Suspense fallback={<HeaderGallerySkeleton />}>
        <HeaderGallery />
      </Suspense>
      <Suspense fallback={<BodyGallerySkeleton />}>
        <BodyGallery ImagesDataCurrent={ImagesData}/>
      </Suspense>
    </div>
  );
}
