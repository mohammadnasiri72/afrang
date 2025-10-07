import ProductListSkeleton from '@/components/ProductList/ProductListSkeleton';
import dynamic from 'next/dynamic';

// Dynamic imports for skeleton components
const CategoryListSkeleton = dynamic(() => import("@/components/ProductList/CategoryListSkeleton"));

export default function Loading() {
  return <ProductListSkeleton />;
} 