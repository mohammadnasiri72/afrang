// import BreadcrumbMain from "@/components/BreadcrumbMain";
// import Container from "@/components/container";
// import { getCategory } from "@/services/Category/categoryService";
// import { getItemById } from "@/services/Item/item";
// import dynamic from "next/dynamic";
// import { Suspense } from "react";

// export async function generateMetadata({ searchParams }) {
//   const params = await searchParams;
//   const brandid = await params.brandid;
//   let products = {};
//   if (brandid) {
//     products = await getItemById(Number(brandid));
//   }

//   if (!products.title) {
//     return {
//       title: "لیست محصولات",
//       description: "صفحه لیست محصولات",
//     };
//   } else {
//     return {
//       title: ` لیست محصولات ${
//         products.seoTitle ? products.seoTitle : products.title
//       }`,
//       description: products.seoDescription,
//       keywords: products.seoKeywords,
//       openGraph: {
//         title: `  لیست محصولات ${
//           products.seoTitle ? products.seoTitle : products.title
//         }`,
//         description: products.seoDescription,
//       },
//     };
//   }
// }

// // Dynamic imports for components
// const ProductListWithFilters = dynamic(() =>
//   import("@/components/ProductList/ProductListWithFilters")
// );
// const CategoryList = dynamic(() =>
//   import("@/components/ProductList/CategoryList")
// );
// const ProductListSkeleton = dynamic(() =>
//   import("@/components/ProductList/ProductListSkeleton")
// );
// const CategoryListSkeleton = dynamic(() =>
//   import("@/components/ProductList/CategoryListSkeleton")
// );

// // Main Page Component
// export default async function ProductList({ searchParams }) {
//   const params = await searchParams;
//   const brandid = await params.brandid;
//   let products = {};
//   if (brandid) {
//     products = await getItemById(Number(brandid));
//   }

//   const categories = await getCategory({
//     TypeId: 4,
//     LangCode: "fa",
//     IsHome: 1,
//   });
//   return (
//     <>
//       <BreadcrumbMain
//         breadcrumb={
//           products.breadcrumb ? products.breadcrumb : [{ title: "محصولات" }]
//         }
//       />
//       <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto py-5">
//         {params && Object.keys(params).length > 0 ? (
//           <div className="xl:px-16">
//             {products?.title && (
//               <h1 className="text-2xl font-bold text-[#d1182b] px-5">
//                 {products?.title}
//               </h1>
//             )}

//             <Suspense fallback={<ProductListSkeleton />}>
//               <ProductListWithFilters searchParams={params} />
//             </Suspense>
//           </div>
//         ) : (
//           <Container>
//             <Suspense fallback={<CategoryListSkeleton />}>
//               <CategoryList categories={categories} />
//             </Suspense>
//           </Container>
//         )}
//       </div>
//       <div>
//         20 30 تا از آخرین محصولات
//       </div>
//     </>
//   );
// }


import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getCategory } from "@/services/Category/categoryService";
import { getItemById } from "@/services/Item/item";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 🔍 تابع برای لاگ زمان
function logTime(message) {
  console.log(`⏰ ${message}:`, new Date().toLocaleTimeString(), performance.now().toFixed(2));
}

export async function generateMetadata({ searchParams }) {
  logTime("generateMetadata شروع");
  const params = await searchParams;
  logTime("searchParams گرفته شد");
  
  const brandid = await params.brandid;
  let products = {};
  
  if (brandid) {
    logTime("getItemById شروع");
    products = await getItemById(Number(brandid));
    logTime("getItemById پایان");
  }

  logTime("generateMetadata پایان");
  
  if (!products.title) {
    return {
      title: "لیست محصولات",
      description: "صفحه لیست محصولات",
    };
  } else {
    return {
      title: ` لیست محصولات ${
        products.seoTitle ? products.seoTitle : products.title
      }`,
      description: products.seoDescription,
      keywords: products.seoKeywords,
      openGraph: {
        title: `  لیست محصولات ${
          products.seoTitle ? products.seoTitle : products.title
        }`,
        description: products.seoDescription,
      },
    };
  }
}

// Dynamic imports for components
const ProductListWithFilters = dynamic(() =>
  import("@/components/ProductList/ProductListWithFilters"), {
  loading: () => <div>در حال بارگذاری فیلترها...</div>,
  ssr: true
});

const CategoryList = dynamic(() =>
  import("@/components/ProductList/CategoryList"), {
  loading: () => <div>در حال بارگذاری دسته‌بندی‌ها...</div>,
  ssr: true
});

const ProductListSkeleton = dynamic(() =>
  import("@/components/ProductList/ProductListSkeleton")
);

const CategoryListSkeleton = dynamic(() =>
  import("@/components/ProductList/CategoryListSkeleton")
);

// Main Page Component
export default async function ProductList({ searchParams }) {
  console.log("🚀 ========== صفحه ProductList شروع شد ==========");
  logTime("صفحه شروع");
  
  // 1. بررسی پارامترها
  logTime("دریافت searchParams شروع");
  const params = await searchParams;
  logTime("دریافت searchParams پایان");
  
  const brandid = await params.brandid;
  let products = {};
  
  // 2. بررسی API call اول
  if (brandid) {
    console.log("📞 تماس با getItemById برای brandid:", brandid);
    logTime("getItemById شروع");
    products = await getItemById(Number(brandid));
    logTime("getItemById پایان");
    console.log("✅ getItemById نتیجه:", products ? "موفق" : "ناموفق");
  } else {
    console.log("ℹ️ brandid وجود ندارد");
  }
  
  // 3. بررسی API call دوم
  console.log("📞 تماس با getCategory شروع");
  logTime("getCategory شروع");
  const categories = await getCategory({
    TypeId: 4,
    LangCode: "fa",
    IsHome: 1,
  });
  logTime("getCategory پایان");
  console.log("✅ getCategory نتیجه:", Array.isArray(categories) ? `${categories.length} آیتم` : "خطا");
  
  logTime("قبل از رندر JSX");
  
  return (
    <>
      {/* 4. بررسی Breadcrumb */}
      <div style={{ display: 'none' }}>
        زمان‌سنجی: {performance.now().toFixed(2)}
      </div>
      
      <BreadcrumbMain
        breadcrumb={
          products.breadcrumb ? products.breadcrumb : [{ title: "محصولات" }]
        }
      />
      
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[1600px] mx-auto py-5">
        {params && Object.keys(params).length > 0 ? (
          <div className="xl:px-16">
            {products?.title && (
              <h1 className="text-2xl font-bold text-[#d1182b] px-5">
                {products?.title}
              </h1>
            )}

            {/* 5. بررسی کامپوننت ProductListWithFilters */}
            <Suspense fallback={<ProductListSkeleton />}>
              {console.log("🔄 ProductListWithFilters در حال بارگذاری...")}
              <ProductListWithFilters searchParams={params} />
            </Suspense>
          </div>
        ) : (
          <Container>
            {/* 6. بررسی کامپوننت CategoryList */}
            <Suspense fallback={<CategoryListSkeleton />}>
              {console.log("🔄 CategoryList در حال بارگذاری...")}
              <CategoryList categories={categories} />
            </Suspense>
          </Container>
        )}
      </div>
      
      {/* 7. بخش پایینی */}
      <div>
        20 30 تا از آخرین محصولات
      </div>
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log('🏁 صفحه کاملاً لود شد:', {
              زمان: ${performance.now().toFixed(2)},
              تاریخ: new Date().toLocaleTimeString()
            });
            
            // اندازه‌گیری زمان paint
            window.addEventListener('load', () => {
              setTimeout(() => {
                const paintTime = performance.getEntriesByType('paint');
                console.log('🎨 Paint Times:', paintTime);
                
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                  console.log('📊 Navigation Timing:', {
                    DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
                    TCP: navigation.connectEnd - navigation.connectStart,
                    Request: navigation.responseStart - navigation.requestStart,
                    Response: navigation.responseEnd - navigation.responseStart,
                    DOMComplete: navigation.domComplete,
                    Load: navigation.loadEventEnd
                  });
                }
              }, 0);
            });
          `
        }}
      />
    </>
  );
}