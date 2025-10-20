import ArticleHeader from "@/components/home/ArticleHeader";
import ArticleSliderSSR from "@/components/home/ArticleSliderSSR";
import BoxImgHomeSSR from "@/components/home/BoxImgHomeSSR";
import NewProductSSR from "@/components/home/NewProductSSR";
import SliderProductSecSSR from "@/components/home/SliderProductSecSSR";
import { getListItemBanner } from "@/services/Item/item";
import { getSettings } from "@/services/settings/settingsService";
import { Suspense } from "react";
import CameraAccessoriesSSR from "../../components/home/CameraAccessoriesSSR";
import EidDiscountSSR from "../../components/home/EidDiscountSSR";
import SliderHomeSSR from "../../components/home/SliderHomeSSR";

export default async function Home() {
  const mainBanner = await getListItemBanner();
  const settings = await getSettings();
  const pageTitleH1 = settings.find(
    (item) => item.propertyKey === "site_title"
  )?.propertyValue;

  const SliderHomeSkeleton = () => {
    return (
      <div className="relative w-full h-64 slider-homePage animate-pulse">
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full bg-gray-200" />
        </div>

        <div className="custom-swiper-pagination absolute right-5 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    );
  };

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

  const SliderProductSecSkeleton = () => {
    return (
      <div className="flex items-center flex-wrap px-4 sm:px-16 py-8 animate-pulse">
        {/* Left: old products slider skeleton */}
        <div className="sm:w-1/2 w-full sm:pl-10">
          <div className="flex justify-between items-center pb-5">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="relative w-full">
            <div className="w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-40 bg-gray-200 rounded" />
              </div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
            <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Right: users second-hand slider skeleton */}
        <div className="sm:w-1/2 w-full sm:pr-10 sm:border-r-2 border-[#0002] sm:mt-0 mt-5">
          <div className="flex justify-between items-center pb-5">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="relative w-full">
            <div className="w-full sm:min-h-[22rem] min-h-[23rem] overflow-hidden rounded-xl bg-white shadow-md">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-40 bg-gray-200 rounded" />
              </div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="creative-prev absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
            <div className="creative-next absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="sr-only">{pageTitleH1}</h1>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Suspense fallback={<SliderHomeSkeleton />}>
          <SliderHomeSSR />
        </Suspense>

        <Suspense fallback={<EidDiscountSkeleton />}>
          <EidDiscountSSR />
        </Suspense>

        <Suspense fallback={<CameraAccessoriesSkeleton />}>
          <CameraAccessoriesSSR />
        </Suspense>
        {mainBanner.length > 0 && <BoxImgHomeSSR mainBanner={mainBanner} />}

        <div className="sm:px-20 px-2 lg:h-[29rem] h-[35rem] overflow-hidden">
          <Suspense fallback={<NewProductSkeleton />}>
            <NewProductSSR />
          </Suspense>
        </div>
        <div className="lg:h-[26rem] sm:h-[48rem] h-[54rem] overflow-hidden">
          <Suspense fallback={<SliderProductSecSkeleton />}>
            <SliderProductSecSSR mainBanner={mainBanner} />
          </Suspense>
        </div>
        <div className="sm:h-[29rem] h-[31rem] overflow-hidden">
          <ArticleHeader />
          <Suspense fallback={<ArticleSliderSkeleton />}>
            <ArticleSliderSSR />
          </Suspense>
        </div>
      </div>
    </>
  );
}
