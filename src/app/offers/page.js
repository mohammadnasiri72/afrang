import EidDiscount from "@/components/home/EidDiscount";
import DetailsOffers from "@/components/Offers/DetailsOffers";
import ProductDiscount from "@/components/Offers/ProductDiscount";
import SliderOffers from "@/components/Offers/SliderOffers";

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
