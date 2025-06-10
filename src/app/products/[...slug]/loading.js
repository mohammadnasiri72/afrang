import Container from '@/components/container';
import dynamic from 'next/dynamic';

// Dynamic imports for skeleton components
const ProductListSkeleton = dynamic(() => import("@/components/ProductList/ProductListSkeleton"));

export default function Loading() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-10">
      <Container>
        <ProductListSkeleton />
      </Container>
    </div>
  );
} 