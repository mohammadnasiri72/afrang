import { TitleProductSkeleton, BodyProductSkeleton } from '@/components/Product/ProductSkeleton';
import BreadcrumbNavProduct from './BreadcrumbNavProduct';

export default function Loading() {
  return (
    <>
      <BreadcrumbNavProduct breadcrumb={[]} />
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <TitleProductSkeleton />
          <BodyProductSkeleton />
        </div>
      </div>
    </>
  );
}