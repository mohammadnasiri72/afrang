import { TitleProductSkeleton, BodyProductSkeleton } from '@/components/Product/ProductSkeleton';

export default function Loading() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <span className="text-gray-400 mx-2 text-xs">&gt;</span>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <span className="text-gray-400 mx-2 text-xs">&gt;</span>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="xl:px-16">
        <div className="flex">
          <div className="lg:w-3/4 w-full">
            {/* Title Product Skeleton */}
            <TitleProductSkeleton />
            
            {/* Body Product Skeleton */}
            <BodyProductSkeleton />
          </div>
          
          {/* Basket Fixed Skeleton */}
          <div className="w-1/4 lg:block hidden">
            <div className="bg-white rounded-lg p-4 animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded !mb-4"></div>
              <div className="h-4 w-24 bg-gray-200 rounded !mb-2"></div>
              <div className="h-4 w-20 bg-gray-200 rounded !mb-4"></div>
              <div className="h-10 w-full bg-gray-200 rounded !mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description Product Skeleton */}
        <div className="bg-white rounded-lg p-6 mt-6 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded !mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Mobile Price Fixed Skeleton */}
      <div className="sm:hidden block fixed bottom-14 right-0 left-0 w-full !z-[50]">
        <div className="flex items-center justify-between bg-white shadow-lg rounded-xl px-3 border border-[#eee] animate-pulse">
          <div className="flex flex-col items-start">
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}