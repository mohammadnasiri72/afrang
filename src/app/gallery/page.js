import dynamic from "next/dynamic";
import { Suspense } from "react";
import BodyGallerySkeleton from "@/components/skeletons/BodyGallerySkeleton";
import HeaderGallerySkeleton from "@/components/skeletons/HeaderGallerySkeleton";

const HeaderGallery = dynamic(() =>
  import("@/components/Gallery/HeaderGallery")
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default function Gallery() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Suspense fallback={<HeaderGallerySkeleton />}>
        <HeaderGallery />
      </Suspense>
      <Suspense fallback={<BodyGallerySkeleton />}>
        <BodyGallery />
      </Suspense>
    </div>
  );
}
