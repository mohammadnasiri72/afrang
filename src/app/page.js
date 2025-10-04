import BoxImgHomeSkeleton from "@/components/home/BoxImgHomeSkeleton";
import { getCategory } from "@/services/Category/categoryService";
import { getItem, getListItemBanner } from "@/services/Item/item";
import {
  getProductAction,
  getProductListId,
  getProducts,
} from "@/services/products/productService";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SliderHome = dynamic(() => import("@/components/home/SliderHome"));
const SliderHomeSkeleton = dynamic(() => import("@/components/home/SliderHomeSkeleton"));
const EidDiscount = dynamic(() => import("@/components/home/EidDiscount"));
const CameraAccessories = dynamic(() =>
  import("@/components/home/CameraAccessories")
);
const BoxImgHome = dynamic(() => import("@/components/home/BoxImgHome"));
const NewProduct = dynamic(() => import("@/components/home/NewProduct"));

const SliderProductSec = dynamic(() => import("@/components/home/SliderProductSec"));
const SliderProductSecSkeleton = dynamic(() => import("@/components/home/SliderProductSecSkeleton"));

const ArticleHeader = dynamic(() => import("@/components/home/ArticleHeader"));
const ArticleSlider = dynamic(() => import("@/components/home/ArticleSlider"));

export default async function Home() {
  // Initialize with empty arrays as fallback
  let sliderItems = [];
  let actionProducts = [];
  let mainBanner = [];
  let productList = [];
  let category = [];
  let newProducts = [];
  let oldProducts = [];
  let productsData = [];
  let blogs = [];

  try {
    sliderItems = await getItem({
      TypeId: 6,
      LangCode: "fa",
    });
  } catch (error) {
    console.error("Error fetching slider items:", error);
  }
  try {
    mainBanner = await getListItemBanner(3293);
  } catch (error) {
    console.error("Error fetching slider items:", error);
  }

  try {
    actionProducts = await getProductAction();
    if (actionProducts && actionProducts.length > 0 && !actionProducts.type) {
      productList = await getProductListId({
        ids: actionProducts[0]?.productIds || [],
      });
    }
  } catch (error) {
    console.error("Error fetching action products:", error);
  }

  try {
    category = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
  }

  try {
    newProducts = await getProducts({
      page: 1,
      pageSize: 12,
      orderBy: "2",
      ConditionId: 10,
    });
  } catch (error) {
    console.error("Error fetching new products:", error);
  }

  try {
    oldProducts = await getProducts({
      page: 1,
      pageSize: 12,
      orderBy: "2",
      ConditionId: 20,
    });
  } catch (error) {
    console.error("Error fetching old products:", error);
  }

  try {
    productsData = await getUserAdSell({
      LangCode: "fa",
      PageSize: 10,
      PageIndex: 1,
      OrderBy: 1,
      IsArchive: 0,
      IsActive: 1,
    });
  } catch (error) {
    console.error("Error fetching products data:", error);
  }

  try {
    blogs = await getItem({
      TypeId: 5,
      LangCode: "fa",
      PageSize: 12,
      PageIndex: 1,
      OrderBy: 1,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  const EidDiscountSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* اسکلتون عنوان */}
        <div className="lg:hidden flex justify-center items-center pb-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* اسکلتون عنوان در دسکتاپ */}
          <div className="lg:flex hidden items-center gap-3">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* اسکلتون بخش موبایل */}
          <div className="lg:hidden w-full">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center gap-2 min-w-max px-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    {item < 5 && <span className="mx-2">/</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* اسکلتون دسته‌بندی‌ها در دسکتاپ */}
          <div className="hidden lg:flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                {item < 5 && <span className="mx-2">/</span>}
              </div>
            ))}
          </div>

          {/* اسکلتون دکمه نمایش همه در دسکتاپ */}
          <div className="hidden lg:flex">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* اسکلتون محصولات */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-lg p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CameraAccessoriesSkeleton = () => {
    return (
      <div className="box-slider-CameraAccessories pt-16 pb-48 mt-3">
        <div className="sm:px-16 px-2">
          <div className="mySwiperCamera">
            <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-between">
              {/* اسکلتون آیتم‌های اسلایدر */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]"
                >
                  {/* اسکلتون آیکون */}
                  <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
                  {/* اسکلتون عنوان */}
                  <div className="mt-3 w-16 h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            {/* اسکلتون پگینیشن */}
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-2 h-2 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NewProductSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* اسکلتون عنوان */}
        <div className="lg:hidden flex justify-center items-center pb-10">
          <div className="flex items-center title-newProduct relative">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* اسکلتون عنوان در دسکتاپ */}
          <div className="lg:flex hidden items-center title-newProduct relative">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          </div>

          {/* اسکلتون بخش موبایل */}
          <div className="lg:hidden w-full">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center gap-2 min-w-max px-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    {item < 5 && <span className="mx-2">/</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* اسکلتون دسته‌بندی‌ها در دسکتاپ */}
          <div className="hidden lg:flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                {item < 5 && <span className="mx-2">/</span>}
              </div>
            ))}
          </div>

          {/* اسکلتون دکمه نمایش همه در دسکتاپ */}
          <div className="hidden lg:flex">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* اسکلتون محصولات */}
        <div className="mt-10">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
            {/* اسکلتون دکمه‌های ناوبری */}
            <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ArticleSliderSkeleton = () => {
    return (
      <div className="animate-pulse sm:px-16 px-2">
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-full p-2 h-full">
                <div className="relative rounded-lg group overflow-hidden h-full flex flex-col bg-white">
                  {/* اسکلتون تصویر */}
                  <div className="overflow-hidden relative bg-gray-200">
                    <div className="w-full h-48 bg-gray-200"></div>
                  </div>

                  {/* اسکلتون محتوا */}
                  <div className="p-3 bg-white flex-grow flex flex-col">
                    {/* اسکلتون عنوان */}
                    <div className="mb-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    </div>

                    {/* اسکلتون متن */}
                    <div className="flex-grow">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                      </div>
                    </div>

                    {/* اسکلتون فوتر */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded mr-2"></div>
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* اسکلتون دکمه‌های ناوبری */}
          <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      {sliderItems.length > 0 ? (
        <SliderHome sliderItems={sliderItems} />
      ) : (
        <SliderHomeSkeleton />
      )}
      {productList.length > 0 && (
        <div className="sm:px-20 px-2 lg:h-[29rem] h-[35rem] overflow-hidden">
          <Suspense fallback={<EidDiscountSkeleton />}>
            <EidDiscount
              actionProducts={actionProducts}
              products={productList}
            />
          </Suspense>
        </div>
      )}
      {productList.length === 0 && <EidDiscountSkeleton />}

      {category.length > 0 && (
        <div>
          <Suspense fallback={<CameraAccessoriesSkeleton />}>
            <CameraAccessories category={category} />
          </Suspense>
        </div>
      )}
      {category.type === "error" && <CameraAccessoriesSkeleton />}
      {mainBanner.length > 0 && (
        <Suspense fallback={<BoxImgHomeSkeleton />}>
          <BoxImgHome mainBanner={mainBanner} />
        </Suspense>
      )}
      {mainBanner.type === "error" && <BoxImgHomeSkeleton />}

      {newProducts.length > 0 && (
        <div className="sm:px-20 px-2 lg:h-[29rem] h-[35rem] overflow-hidden">
          <Suspense fallback={<NewProductSkeleton />}>
            <NewProduct products={newProducts} />
          </Suspense>
        </div>
      )}
      {newProducts.type === "error" && <NewProductSkeleton />}
      {oldProducts.length > 0 && productsData.length > 0 ? (
        <div className="sm:h-[32rem] h-[56rem]">
          <SliderProductSec
            oldProducts={oldProducts}
            productsData={productsData}
          />
        </div>
      ) : (
        <SliderProductSecSkeleton />
      )}
      {/* {
        (oldProducts.type === 'error' || productsData.type === 'error') &&

      } */}

      {blogs.length > 0 && (
        <div className="sm:h-[29rem] h-[31rem] overflow-hidden">
          <ArticleHeader />
          <Suspense fallback={<ArticleSliderSkeleton />}>
            <ArticleSlider blogs={blogs} />
          </Suspense>
        </div>
      )}
      {blogs.type === "error" && <ArticleSliderSkeleton />}
      
    </div>
  );
}
