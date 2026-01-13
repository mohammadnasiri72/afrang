import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import SliderCategoryProducts from "@/components/ProductList/SliderCategoryProducts";
import { getCategory } from "@/services/Category/categoryService";
import { getItemById } from "@/services/Item/item";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;

  const brandid = await params.brandid;
  let products = {};

  if (brandid) {
    products = await getItemById(Number(brandid));
  }

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
const ProductListWithFilters = dynamic(
  () => import("@/components/ProductList/ProductListWithFilters"),
  {
    loading: () => <div>در حال بارگذاری فیلترها...</div>,
    ssr: true,
  }
);

const CategoryList = dynamic(
  () => import("@/components/ProductList/CategoryList"),
  {
    loading: () => <div>در حال بارگذاری دسته‌بندی‌ها...</div>,
    ssr: true,
  }
);

const ProductListSkeleton = dynamic(() =>
  import("@/components/ProductList/ProductListSkeleton")
);

const CategoryListSkeleton = dynamic(() =>
  import("@/components/ProductList/CategoryListSkeleton")
);

// Main Page Component
export default async function ProductList({ searchParams }) {
  // 1. بررسی پارامترها
  const params = await searchParams;

  const brandid = await params.brandid;
  let products = {};

  // 2. بررسی API call اول
  if (brandid) {
    products = await getItemById(Number(brandid));
  }

  // 3. بررسی API call دوم - با handle خطا
  let categories = [];
  try {
    const categoryResult = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });
    categories = Array.isArray(categoryResult) ? categoryResult : [];
  } catch (error) {
    console.error("❌ خطا در getCategory:", error);
    categories = [];
  }


  return (
    <>
      {/* 4. بررسی Breadcrumb */}
      <div style={{ display: "none" }}>
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
            <SliderCategoryProducts categories={categories}/>
            {/* 5. بررسی کامپوننت ProductListWithFilters */}
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductListWithFilters searchParams={params} />
            </Suspense>
          </div>
        ) : (
          <Container>
            {/* 6. بررسی کامپوننت CategoryList */}
            <Suspense fallback={<CategoryListSkeleton />}>
              <CategoryList categories={categories} />
            </Suspense>
          </Container>
        )}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
           
            
            // اندازه‌گیری زمان paint
            window.addEventListener('load', () => {
              setTimeout(() => {
                const paintTime = performance.getEntriesByType('paint');
                
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                 
                }
              }, 0);
            });
          `,
        }}
      />
    </>
  );
}
