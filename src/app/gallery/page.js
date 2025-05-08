import BodyGallery from "@/components/Gallery/BodyGallery";
import HeaderGallery from "@/components/Gallery/HeaderGallery";

export default async function Gallery() {
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <HeaderGallery />
        <BodyGallery />
      </div>
    </>
  );
}
