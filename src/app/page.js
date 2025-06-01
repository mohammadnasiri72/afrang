import dynamic from 'next/dynamic';
import { getBlogs } from "@/services/blogs/blogService";
import { getCategory } from "@/services/Category/categoryService";
import { getItem } from "@/services/Item/item";
import { getProductAction, getProductListId, getProducts } from "@/services/products/productService";

const SliderHome = dynamic(() => import("@/components/home/SliderHome"));
const EidDiscount = dynamic(() => import("@/components/home/EidDiscount"));
const CameraAccessories = dynamic(() => import("@/components/home/CameraAccessories"));
const BoxImgHome = dynamic(() => import("@/components/home/BoxImgHome"));
const NewProduct = dynamic(() => import("@/components/home/NewProduct"));
const SecondHandProduct = dynamic(() => import("@/components/home/SecondHandProduct"));
const ArticleHeader = dynamic(() => import("@/components/home/ArticleHeader"));
const ArticleSlider = dynamic(() => import("@/components/home/ArticleSlider"));

export default async function Home() {
  const { items: blogs } = await getBlogs();

  const newProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "8",
  });
  const oldProducts = await getProducts({
    page: 1,
    pageSize: 12,
    orderBy: "2",
    ConditionId: 20,
  });

  

  const mainBanner = await getItem({
    TypeId: 1015,
    LangCode: 'fa',
    CategoryIdArray: "3293",
  });

  const actionProducts = await getProductAction();

  const productList = await getProductListId({
    ids: actionProducts[0]?.productIds || []
  });
  
  const category = await getCategory();

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <SliderHome />
      {actionProducts && actionProducts.length > 0 && (
        <div className="sm:px-20 px-2 mt-5">
          <EidDiscount actionProducts={actionProducts[0]} products={productList} />
        </div>
      )}
      {category && category.length > 0 && (
        <CameraAccessories category={category} />
      )}
      {mainBanner && mainBanner.length > 0 && (
        <BoxImgHome mainBanner={mainBanner} />
      )}
      {newProducts && newProducts.length > 0 && (
        <div className="sm:px-20 px-2 mt-20">
          <NewProduct products={newProducts} />
        </div>
      )}
      <div className="secondHand-sec mt-20">
        <SecondHandProduct oldProducts={oldProducts} />
      </div>
      <ArticleHeader />
      <ArticleSlider blogs={blogs} />
    </div>
  );
}
