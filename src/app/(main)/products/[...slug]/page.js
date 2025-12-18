
export const dynamic = 'force-dynamic';
export const revalidate = 60; // هر 60 ثانیه revalidate

// جلوگیری از generate در build time
// export async function generateStaticParams() {
//   return [];
// }

import NotFound from "@/app/(main)/not-found";
import BreadcrumbMain from "@/components/BreadcrumbMain";
import ProductListSkeleton from "@/components/ProductList/ProductListSkeleton";
import { getListItemBanner } from "@/services/Item/item";
import {
  getProductCategory,
  getProducts,
} from "@/services/products/productService";
import { getCategoryChild } from "@/services/Property/propertyService";
import { Suspense } from "react";
import { FaBoxOpen } from "react-icons/fa6";

// کامپوننت‌ها را static import کنید (dynamic حذف شود)
import BodyProductList from "@/components/ProductList/BodyProductList";
import FilterProduct from "@/components/ProductList/FilterProduct";
import PaginationProduct from "@/components/ProductList/PaginationProduct";

// ==================== تابع کمکی برای پردازش سریع ====================
function processParams(params) {
  const result = {
    page: parseInt(params?.page) || 1,
    pageSize: Math.min(parseInt(params?.pageSize) || 20, 100), // محدودیت 100
    orderBy: parseInt(params?.orderby) || 5,
    price1: parseInt(params?.price1) || 0,
    price2: parseInt(params?.price2) || 100000,
    layout: params?.layout || "list",
    brandId: params?.brandid || "",
    filters: "",
  };

  // پردازش سریع فیلترها
  const filterKeys = Object.keys(params || {}).filter(key => 
    key.startsWith('attr_')
  );
  
  if (filterKeys.length > 0) {
    result.filters = filterKeys
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  // فیلترهای بولی
  result.onlyPrice = params?.onlyprice === "1" ? "1" : undefined;
  result.onlyDiscount = params?.onlydiscount === "1" ? "1" : undefined;
  result.statusId = params?.statusid === "1" ? "1" : undefined;
  result.onlyfest = params?.onlyfest === "1" ? "1" : undefined;
  result.conditionId = params?.conditionId === "20" ? "20" : undefined;

  return result;
}

// ==================== کامپوننت اصلی محتوا ====================
async function ProductContent({ id, searchParams }) {
  const params = await searchParams;
  const processed = processParams(params);

  try {
    // درخواست‌های مرحله اول (ضروری)
    const [productCategory, products] = await Promise.all([
      getProductCategory(id),
      getProducts({
        page: processed.page,
        pageSize: processed.pageSize,
        orderBy: processed.orderBy,
        price1: processed.price1,
        price2: processed.price2,
        CategoryId: id,
        BrandId: processed.brandId,
        OnlyPrice: processed.onlyPrice,
        OnlyDiscount: processed.onlyDiscount,
        StatusId: processed.statusId,
        OnlyFest: processed.onlyfest,
        ConditionId: processed.conditionId,
        Filters: processed.filters
      }),
    ]);

    // بررسی خطا در داده‌های اصلی
    if (products?.type === "error" || !products || !Array.isArray(products)) {
      console.error('خطا در دریافت محصولات');
      return <NotFound />;
    }

    // درخواست‌های مرحله دوم (کم‌اهمیت‌تر)
    const [resultFilter, BannerProduct] = await Promise.all([
      getCategoryChild(id).catch(() => []), // اگر خطا خورد، آرایه خالی برگردان
      getListItemBanner().catch(() => []),   // اگر خطا خورد، آرایه خالی برگردان
    ]);

    // محاسبه pagination
    const totalItems = products[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / processed.pageSize);

    return (
      <>
        <div className="bg-white">
          <div className="overflow-hidden max-w-[1600px] mx-auto">
            <BreadcrumbMain breadcrumb={productCategory?.breadcrumb} />
          </div>
        </div>
        
        <div className="bg-[#f6f6f6] overflow-hidden py-5 max-w-[1600px] mx-auto">
          <div className="xl:px-16">
            {productCategory?.breadcrumb?.[productCategory?.breadcrumb?.length - 1]
              ?.title && (
              <h1 className="text-2xl font-bold text-[#d1182b] px-5">
                {productCategory.breadcrumb[productCategory.breadcrumb.length - 1].title}
              </h1>
            )}
            
            <div className="flex flex-col lg:flex-row w-full mt-4">
              {/* سایدبار فیلتر */}
              <div className="lg:w-1/4 mb-4 lg:mb-0 lg:pr-4">
                <FilterProduct
                  BannerProduct={BannerProduct}
                  id={id}
                  resultFilter={resultFilter}
                />
              </div>
              
              {/* محتوای اصلی */}
              <div className="lg:w-3/4">
                {products.length === 0 ? (
                  <div className="flex justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4">
                      <div className="flex justify-center mb-6">
                        <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        محصولی یافت نشد!
                      </h2>
                      <p className="text-gray-600 mb-6">
                        متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً
                        فیلترها را تغییر دهید.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BodyProductList 
                      products={products} 
                      layout={processed.layout} 
                      resultFilter={resultFilter}
                    />
                    
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <PaginationProduct 
                          total={totalItems}
                          pageSize={processed.pageSize}
                          currentPage={processed.page}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('خطا در دریافت داده‌ها:', error);
    return <NotFound />;
  }
}

// ==================== صفحه اصلی ====================
function extractIdFromSlug(slug) {
  // پیدا کردن آخرین عدد در URL
  for (let i = slug.length - 1; i >= 0; i--) {
    const num = Number(slug[i]);
    if (!isNaN(num)) {
      return num;
    }
  }
  return 0;
}

export default async function ProductList({ params, searchParams }) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={
      <div className="bg-[#f6f6f6] min-h-screen py-10">
        <div className="max-w-[1600px] mx-auto">
          <ProductListSkeleton />
        </div>
      </div>
    }>
      <ProductContent id={id} searchParams={searchParams} />
    </Suspense>
  );
}