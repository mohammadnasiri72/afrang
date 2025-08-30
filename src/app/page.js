import BoxImgHomeSkeleton from "@/components/home/BoxImgHomeSkeleton";
import { getCategory } from "@/services/Category/categoryService";
import { getItem } from "@/services/Item/item";
import {
  getProductAction,
  getProductListId,
  getProducts,
} from "@/services/products/productService";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SliderHome = dynamic(() => import("@/components/home/SliderHome"));
const EidDiscount = dynamic(() => import("@/components/home/EidDiscount"));
const CameraAccessories = dynamic(() =>
  import("@/components/home/CameraAccessories")
);
const BoxImgHome = dynamic(() => import("@/components/home/BoxImgHome"));
const NewProduct = dynamic(() => import("@/components/home/NewProduct"));
const SecondHandProduct = dynamic(() =>
  import("@/components/home/SecondHandProduct")
);
const SecondHandProductUser = dynamic(() =>
  import("@/components/home/SecondHandProductUser")
);
const ArticleHeader = dynamic(() => import("@/components/home/ArticleHeader"));
const ArticleSlider = dynamic(() => import("@/components/home/ArticleSlider"));

export default async function Home() {
  const sliderItems = await getItem({
    TypeId: 6,
    LangCode: "fa",
  });

  const actionProducts = await getProductAction();
  let productList = [];
  if (actionProducts && actionProducts.length > 0) {
    productList = await getProductListId({
      ids: actionProducts[0]?.productIds || [],
    });
  }

  const category = await getCategory({
    TypeId: 4,
    LangCode: "fa",
    IsHome: 1,
  });

  const newProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
  });

  const oldProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
    ConditionId: 20,
  });

  const productsData = await getUserAdSell({
    LangCode: "fa",
    PageSize: 10,
    PageIndex: 1,
    OrderBy: 1,
  });

  const blogs = await getItem({
    TypeId: 5,
    LangCode: "fa",
    PageSize: 12,
    PageIndex: 1,
    OrderBy: 1,
  });


  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <SliderHome sliderItems={sliderItems} />
      {productList.length > 0 && (
        <div className="sm:px-20 px-2">
          <EidDiscount actionProducts={actionProducts} products={productList} />
        </div>
      )}
      {category.length > 0 && <CameraAccessories category={category} />}

      <Suspense fallback={<BoxImgHomeSkeleton />}>
        <BoxImgHome />
      </Suspense>
      {newProducts.length > 0 && (
        <div className="sm:px-20 px-2">
          <NewProduct products={newProducts} />
        </div>
      )}
      {oldProducts.length > 0 && (
        <div className="">
          <SecondHandProduct oldProducts={oldProducts} />
        </div>
      )}
      {productsData.length > 0 && (
        <div className="secondHand-sec">
          <SecondHandProductUser filteredProducts={productsData} />
        </div>
      )}
      {blogs.length > 0 && (
        <div>
          <ArticleHeader />
          <ArticleSlider blogs={blogs} />
        </div>
      )}
    </div>
  );
}
