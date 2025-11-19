import BreadcrumbMain from "@/components/BreadcrumbMain";
import { getGallery } from "@/services/gallery/galleryServices";
import { getSettings } from "@/services/settings/settingsService";
import dynamic from "next/dynamic";

const HeaderGallery = dynamic(() =>
  import("@/components/Gallery/HeaderGallery")
);
const BodyGallery = dynamic(() => import("@/components/Gallery/BodyGallery"));

export default async function GalleryCategory() {
   const settings = await getSettings();
    const ImagesData = await getGallery({
       LangCode: "fa",
       PageSize: 16,
       PageIndex: 1,
     });
  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[2000px] mx-auto">
          <BreadcrumbMain breadcrumb={[{ title: "گالری کاربران" }]} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto">
        <HeaderGallery />
        <BodyGallery ImagesDataCurrent={ImagesData} settings={settings}/>
      </div>
    </>
  );
}
