import Container from '@/components/container';
import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Dynamic imports for components
const ProductListWithFilters = dynamic(() => import("@/components/ProductList/ProductListWithFilters"));
const CategoryList = dynamic(() => import("@/components/ProductList/CategoryList"));
const ProductListSkeleton = dynamic(() => import("@/components/ProductList/ProductListSkeleton"));
const CategoryListSkeleton = dynamic(() => import("@/components/ProductList/CategoryListSkeleton"));

// Main Page Component
export default function ProductList({ searchParams }) {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-10">
      {searchParams && Object.keys(searchParams).length > 0 ? (
        <div className="xl:px-16">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductListWithFilters searchParams={searchParams} />
          </Suspense>
        </div>
      ) : (
        <Container>
          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList />
          </Suspense>
        </Container>
      )}
    </div>
  );
}
