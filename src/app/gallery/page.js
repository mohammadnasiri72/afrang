import dynamic from 'next/dynamic';

const HeaderGallery = dynamic(() => import('@/components/Gallery/HeaderGallery'));
const BodyGallery = dynamic(() => import('@/components/Gallery/BodyGallery'));

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
