// import NotFound from "@/app/(main)/not-found";
// import BreadcrumbMain from "@/components/BreadcrumbMain";
// import Container from "@/components/container";
// import ProductListSkeleton from "@/components/ProductList/ProductListSkeleton";
// import { getListItemBanner } from "@/services/Item/item";
// import {
//   getProductCategory,
//   getProducts,
// } from "@/services/products/productService";
// import { getCategoryChild } from "@/services/Property/propertyService";
// import dynamic from "next/dynamic";
// import { Suspense } from "react";
// import { FaBoxOpen } from "react-icons/fa6";

// const BodyProductList = dynamic(() =>
//   import("@/components/ProductList/BodyProductList")
// );
// const FilterProduct = dynamic(() =>
//   import("@/components/ProductList/FilterProduct")
// );
// const PaginationProduct = dynamic(() =>
//   import("@/components/ProductList/PaginationProduct")
// );

// // کامپوننت اصلی محتوا
// async function ProductContent({ id, searchParams }) {
//   const params = await searchParams;
//    const queryParts = [];

//   for (const [key, value] of Object.entries(params)) {
//     // فقط attr ها رو بگیر
//     if (key.startsWith('attr_')) {
//       queryParts.push(`${key}=${value}`);
//     }
//   }

//   const fullQueryString = queryParts.length > 0 ? `${queryParts.join('&')}` : '';

//   const page = params?.page ? parseInt(params.page) : 1;
//   const orderBy = params?.orderby ? parseInt(params.orderby) : 5;
//   const layout = params?.layout ? params.layout : "list";
//   const price1 = params?.price1 ? parseInt(params.price1) : 0;
//   const price2 = params?.price2 ? parseInt(params.price2) : 100000;
//   const pageSize = params?.pageSize ? parseInt(params.pageSize) : 20;
//   const brandId = params?.brandid || "";

//   const onlyPrice = params?.onlyprice === "1" ? "1" : undefined;
//   const onlyDiscount = params?.onlydiscount === "1" ? "1" : undefined;
//   const statusId = params?.statusid === "1" ? "1" : undefined;
//   const onlyfest = params?.onlyfest === "1" ? "1" : undefined;
//   const conditionId = params?.conditionId === "20" ? "20" : undefined;

//   // همه درخواست‌های لازم را به‌صورت هم‌زمان ارسال می‌کنیم تا زمان انتظار کل کاهش پیدا کند
//   const [productCategory, resultFilter, products, BannerProduct] =
//     await Promise.all([
//       getProductCategory(id),
//       getCategoryChild(id),
//       getProducts({
//         page,
//         pageSize,
//         orderBy,
//         price1,
//         price2,
//         CategoryId: id,
//         BrandId: brandId,
//         OnlyPrice: onlyPrice,
//         OnlyDiscount: onlyDiscount,
//         StatusId: statusId,
//         OnlyFest: onlyfest,
//         ConditionId: conditionId,
//         Filters: fullQueryString,
//       }),
//       getListItemBanner(),
//     ]);

//   if (products.type === "error") {
//     return NotFound();
//   }

//   return (
//     <>
//       <div className="bg-white">
//         <div className="overflow-hidden max-w-[1600px] mx-auto">
//           <BreadcrumbMain breadcrumb={productCategory?.breadcrumb} />
//         </div>
//       </div>
//       <div className="bg-[#f6f6f6] overflow-hidden py-5 max-w-[1600px] mx-auto">
//         <div className="xl:px-16">
//           {productCategory?.breadcrumb[productCategory?.breadcrumb?.length - 1]
//             ?.title && (
//             <h1 className="text-2xl font-bold text-[#d1182b] px-5">
//               {
//                 productCategory?.breadcrumb[
//                   productCategory?.breadcrumb?.length - 1
//                 ]?.title
//               }
//             </h1>
//           )}
//           <div className="flex flex-col lg:flex-row w-full">
//             <FilterProduct
//               BannerProduct={BannerProduct}
//               id={id}
//               resultFilter={resultFilter}
//             />
//             <div className="w-full">
//               {!products || products.length === 0 ? (
//                 <div className="flex justify-center">
//                   <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4">
//                     <div className="flex justify-center !mb-6">
//                       <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
//                     </div>
//                     <h2 className="text-2xl font-bold !mb-4 text-gray-800">
//                       محصولی یافت نشد!
//                     </h2>
//                     <p className="text-gray-600 !mb-6">
//                       متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً
//                       فیلترها را تغییر دهید.
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full">
//                   <BodyProductList products={products} layout={layout} resultFilter={resultFilter}/>
//                   <div className="flex justify-center mt-8">
//                     <PaginationProduct total={products[0].total} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default async function ProductList(props) {
//   const { params, searchParams } = props;
//   const param = await params;

//   let id = 0;
//   const pathParts = param.slug;

//   // پیدا کردن آخرین عدد در URL
//   for (let i = pathParts.length - 1; i >= 0; i--) {
//     const num = Number(pathParts[i]);
//     if (!isNaN(num)) {
//       id = num;
//       break;
//     }
//   }

//   return (
//     <Suspense
//       fallback={
//         <div className="bg-[#f6f6f6] overflow-hidden py-10">
//           <Container>
//             <ProductListSkeleton />
//           </Container>
//         </div>
//       }
//     >
//       <ProductContent id={id} searchParams={searchParams} />
//     </Suspense>
//   );
// }

// app/(main)/product/[...slug]/page.jsx
import NotFound from "@/app/(main)/not-found";
import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import ProductListSkeleton from "@/components/ProductList/ProductListSkeleton";
import SliderCategoryProducts from "@/components/ProductList/SliderCategoryProducts";
import { getListItemBanner } from "@/services/Item/item";
import {
  getProductCategory,
  getProducts,
} from "@/services/products/productService";
import { getCategoryChild } from "@/services/Property/propertyService";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FaBoxOpen } from "react-icons/fa6";

const BodyProductList = dynamic(() =>
  import("@/components/ProductList/BodyProductList")
);
const FilterProduct = dynamic(() =>
  import("@/components/ProductList/FilterProduct")
);
const PaginationProduct = dynamic(() =>
  import("@/components/ProductList/PaginationProduct")
);

// کامپوننت اصلی محتوا
async function ProductContent({ id, searchParams }) {
  const params = await searchParams;

  // استخراج پارامترها
  const queryParts = [];
  for (const [key, value] of Object.entries(params)) {
    if (key.startsWith("attr_")) {
      queryParts.push(`${key}=${value}`);
    }
  }

  const fullQueryString =
    queryParts.length > 0 ? `${queryParts.join("&")}` : "";

  const page = params?.page ? parseInt(params.page) : 1;
  const orderBy = params?.orderby ? parseInt(params.orderby) : 5;
  const layout = params?.layout ? params.layout : "list";
  const price1 = params?.price1 ? parseInt(params.price1) : 0;
  const price2 = params?.price2 ? parseInt(params.price2) : 100000;
  const pageSize = params?.pageSize ? parseInt(params.pageSize) : 20;
  const brandId = params?.brandid || "";

  const onlyPrice = params?.onlyprice === "1" ? "1" : undefined;
  const onlyDiscount = params?.onlydiscount === "1" ? "1" : undefined;
  const statusId = params?.statusid ? params?.statusid : undefined;
  const onlyfest = params?.onlyfest === "1" ? "1" : undefined;
  const conditionId = params?.conditionId === "20" ? "20" : undefined;

  // همه درخواست‌ها به صورت موازی با cache
  const [productCategory, resultFilter, products, BannerProduct] =
    await Promise.all([
      getProductCategory(id),
      getCategoryChild(id),
      getProducts({
        page,
        pageSize,
        orderBy,
        price1,
        price2,
        CategoryId: id,
        BrandId: brandId,
        OnlyPrice: onlyPrice,
        OnlyDiscount: onlyDiscount,
        StatusId: statusId,
        OnlyFest: onlyfest,
        ConditionId: conditionId,
        Filters: fullQueryString,
      }),
      getListItemBanner(),
    ]);

  if (products.type === "error") {
    return NotFound();
  }

  return (
    <>
      <div className="bg-white">
        <div className="overflow-hidden max-w-[1600px] mx-auto">
          <BreadcrumbMain breadcrumb={productCategory?.breadcrumb} />
        </div>
      </div>
      <div className="bg-[#f6f6f6] overflow-hidden py-5 max-w-[1600px] mx-auto">
        <div className="xl:px-16">
          <div className="flex items-center justify-between">
            {productCategory?.breadcrumb[
              productCategory?.breadcrumb?.length - 1
            ]?.title && (
              <h1 className="text-2xl! font-bold! text-[#d1182b] px-5">
                {
                  productCategory?.breadcrumb[
                    productCategory?.breadcrumb?.length - 1
                  ]?.title
                }
              </h1>
            )}
            <span className="text-2xl font-bold text-[#d1182b] px-5">
              {products[0]?.total || 0} محصول
            </span>
          </div>
          {resultFilter?.categories.length > 1 && (
            <SliderCategoryProducts categories={resultFilter?.categories} />
          )}
          <div className="flex flex-col lg:flex-row w-full">
            <FilterProduct
              BannerProduct={BannerProduct}
              id={id}
              resultFilter={resultFilter}
            />
            <div className="w-full">
              {!products || products.length === 0 ? (
                <div className="flex justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4">
                    <div className="flex justify-center !mb-6">
                      <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
                    </div>
                    <h2 className="text-2xl font-bold !mb-4 text-gray-800">
                      محصولی یافت نشد!
                    </h2>
                    <p className="text-gray-600 !mb-6">
                      متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً
                      فیلترها را تغییر دهید.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <BodyProductList
                    products={products}
                    layout={layout}
                    resultFilter={resultFilter}
                  />
                  <div className="flex justify-center mt-8">
                    <PaginationProduct total={products[0].total} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function ProductList(props) {
  const { params, searchParams } = props;
  const param = await params;

  let id = 0;
  const pathParts = param.slug;

  // پیدا کردن آخرین عدد در URL
  for (let i = pathParts.length - 1; i >= 0; i--) {
    const num = Number(pathParts[i]);
    if (!isNaN(num)) {
      id = num;
      break;
    }
  }

  return (
    <Suspense
      fallback={
        <div className="bg-[#f6f6f6] overflow-hidden py-10">
          <Container>
            <ProductListSkeleton />
          </Container>
        </div>
      }
    >
      <ProductContent id={id} searchParams={searchParams} />
    </Suspense>
  );
}

export const revalidate = 900;
