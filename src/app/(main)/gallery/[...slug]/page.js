import BreadcrumbMain from "@/components/BreadcrumbMain";
import dynamic from "next/dynamic";

const HeaderGallery = dynamic(() =>
  import("@/components/Gallery/HeaderGallery")
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default function GalleryCategory() {
  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[2000px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "گالری کاربران" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto">
        <HeaderGallery />
        <BodyGallery />
      </div>
    </>
  );
}
