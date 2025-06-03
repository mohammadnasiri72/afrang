import { getItem } from '@/services/Item/item';
import dynamic from 'next/dynamic';

const HeaderGallery = dynamic(() => import('@/components/Gallery/HeaderGallery'));
const BodyGallery = dynamic(() => import('@/components/Gallery/BodyGallery'));



export default async function Gallery() {

  const ImagesData = await getItem({
    TypeId: 9,
    LangCode: 'fa',
    OrderBy: 9,
    PageSize: 16,
    PageIndex: 1
  });
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <HeaderGallery />
        <BodyGallery ImagesData={ImagesData}/>
      </div>
    </>
  );
}
