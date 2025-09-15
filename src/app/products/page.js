import Container from '@/components/container';
import { getCategory } from '@/services/Category/categoryService';
import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Dynamic imports for components
const ProductListWithFilters = dynamic(() => import("@/components/ProductList/ProductListWithFilters"));
const CategoryList = dynamic(() => import("@/components/ProductList/CategoryList"));
const ProductListSkeleton = dynamic(() => import("@/components/ProductList/ProductListSkeleton"));
const CategoryListSkeleton = dynamic(() => import("@/components/ProductList/CategoryListSkeleton"));

// Main Page Component
export default async function ProductList({ searchParams }) {
  const params = await searchParams;
  
   const categories = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });

  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-10">
      {params && Object.keys(params).length > 0 ? (
        <div className="xl:px-16">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductListWithFilters searchParams={params} />
          </Suspense>
        </div>
      ) : (
        <Container>
          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList categories={categories}/>
          </Suspense>
        </Container>
      )}
    </div>
  );
}
