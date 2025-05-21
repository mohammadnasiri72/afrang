import dynamic from 'next/dynamic';
const EidDiscount = dynamic(() => import('@/components/home/EidDiscount'));
const DetailsOffers = dynamic(() => import('@/components/Offers/DetailsOffers'));
const ProductDiscount = dynamic(() => import('@/components/Offers/ProductDiscount'));
const SliderOffers = dynamic(() => import('@/components/Offers/SliderOffers'));


export default async function Offers() {  
  
  return (
    <>
      <div className="bg-[#f6f6f6]">
        <SliderOffers />
        <div className="sm:px-20 px-2 mt-10 ">
          <EidDiscount />
        </div>
        <ProductDiscount />
        <div className="sm:px-20 px-2 mt-28">
          <DetailsOffers />
        </div>
      </div>
    </>
  );
}
