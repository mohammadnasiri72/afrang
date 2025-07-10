import BoxImgHomeSkeleton from "@/components/home/BoxImgHomeSkeleton";
import dynamic from 'next/dynamic';
import { Suspense } from "react";

const SliderHome = dynamic(() => import("@/components/home/SliderHome"));
const EidDiscount = dynamic(() => import("@/components/home/EidDiscount"));
const CameraAccessories = dynamic(() => import("@/components/home/CameraAccessories"));
const BoxImgHome = dynamic(() => import("@/components/home/BoxImgHome"));
const NewProduct = dynamic(() => import("@/components/home/NewProduct"));
const SecondHandProduct = dynamic(() => import("@/components/home/SecondHandProduct"));
const ArticleHeader = dynamic(() => import("@/components/home/ArticleHeader"));
const ArticleSlider = dynamic(() => import("@/components/home/ArticleSlider"));

export default async function Home() {


  return (
    <div className="bg-[#f6f6f6] overflow-hidden">

      <SliderHome />

      <div className="sm:px-20 px-2">
        <EidDiscount />
      </div>

      <CameraAccessories />

      <Suspense fallback={<BoxImgHomeSkeleton />}>
        <BoxImgHome />
      </Suspense>

      <div className="sm:px-20 px-2">
        <NewProduct />
      </div>

      <div className="secondHand-sec mt-5">
        <SecondHandProduct />
      </div>

      <ArticleHeader />
      <ArticleSlider />
    </div>
  );
}
