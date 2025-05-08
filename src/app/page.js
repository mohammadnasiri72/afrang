import Loading from "@/components/Loading";
import React, { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="bg-[#f6f6f6] overflow-hidden">
          <SliderHome />
          <div className="sm:px-20 px-2 mt-5">
            <EidDiscount />
          </div>
          <div className="mt-10 sm:px-16 px-2">
            <ProductMain />
          </div>
          <CameraAccessories />
          <BoxImgHome />
          <div className="sm:px-20 px-2 mt-20">
            <NewProduct />
          </div>
          <div className="mt-5 sm:px-16 px-2">
            <ProductMain />
          </div>
          <div className="secondHand-sec mt-20">
            <SecondHandProduct />
          </div>
          <ArticleHeader />
          <ArticleSlider />
        </div>
      </Suspense>
    </>
  );
}

const SliderHome = React.lazy(() => import("@/components/home/SliderHome"));
const EidDiscount = React.lazy(() => import("@/components/home/EidDiscount"));
const ProductMain = React.lazy(() => import("@/components/home/ProductMain"));
const CameraAccessories = React.lazy(() =>
  import("@/components/home/CameraAccessories")
);
const BoxImgHome = React.lazy(() => import("@/components/home/BoxImgHome"));
const NewProduct = React.lazy(() => import("@/components/home/NewProduct"));
const SecondHandProduct = React.lazy(() =>
  import("@/components/home/SecondHandProduct")
);
const ArticleHeader = React.lazy(() =>
  import("@/components/home/ArticleHeader")
);
const ArticleSlider = React.lazy(() =>
  import("@/components/home/ArticleSlider")
);
