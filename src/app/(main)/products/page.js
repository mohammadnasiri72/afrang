import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
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
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  } else {
    return {
      title: products.seoTitle ? products.seoTitle : products.title,
      description: products.seoDescription,
      keywords: products.seoKeywords,
      openGraph: {
        title: products.seoTitle ? products.seoTitle : products.title,
        description: products.seoDescription,
      },
    };
  }
}

// Dynamic imports for components
const ProductListWithFilters = dynamic(() =>
  import("@/components/ProductList/ProductListWithFilters")
);
const CategoryList = dynamic(() =>
  import("@/components/ProductList/CategoryList")
);
const ProductListSkeleton = dynamic(() =>
  import("@/components/ProductList/ProductListSkeleton")
);
const CategoryListSkeleton = dynamic(() =>
  import("@/components/ProductList/CategoryListSkeleton")
);

// Main Page Component
export default async function ProductList({ searchParams }) {
  const params = await searchParams;
  const brandid = await params.brandid;
  let products = {};
  if (brandid) {
    products = await getItemById(Number(brandid));
  }

  const categories = await getCategory({
    TypeId: 4,
    LangCode: "fa",
    IsHome: 1,
  });
  return (
    <>
      <BreadcrumbMain
        breadcrumb={
          products.breadcrumb ? products.breadcrumb : [{ title: "محصولات" }]
        }
      />
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto py-5">
        {params && Object.keys(params).length > 0 ? (
          <div className="xl:px-16">
            {products?.title && (
              <h1 className="text-2xl font-bold text-[#d1182b] px-5">
                {products?.title}
              </h1>
            )}

            <Suspense fallback={<ProductListSkeleton />}>
              <ProductListWithFilters searchParams={params} />
            </Suspense>
          </div>
        ) : (
          <Container>
            <Suspense fallback={<CategoryListSkeleton />}>
              <CategoryList categories={categories} />
            </Suspense>
          </Container>
        )}
      </div>
    </>
  );
}
