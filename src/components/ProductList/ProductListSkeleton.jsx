export default function ProductListSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
         {/* Right Side - Filter Box */}
      <div className="lg:w-1/4">
        <div className="bg-white rounded-lg p-4 shadow-sm sticky">
          <div className="h-48 bg-gray-200 animate-pulse rounded-lg mb-6" />
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Side - Header and Products */}
      <div className="lg:w-3/4">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg p-5">
          <div className="flex justify-between items-center">
            {/* Sort Options Skeleton */}
            <div className="flex lg:gap-7 gap-3 items-center lg:overflow-visible overflow-x-auto overflow-y-hidden pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="lg:flex hidden items-center gap-2 whitespace-nowrap">
                <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
              </div>
              <div className="lg:hidden min-w-fit">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-24" />
              </div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-gray-200 animate-pulse rounded w-24 min-w-fit"
                />
              ))}
            </div>
            {/* Layout Toggle Skeleton */}
            <div className="lg:flex hidden items-center gap-4 pr-10 pl-2">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Products Skeleton - List Layout */}
        <div className="space-y-5 mt-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex flex-wrap">
                {/* Image Section */}
                <div className="p-3 lg:w-1/3 w-full">
                  <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg" />
                </div>
                {/* Title and Summary Section */}
                <div className="sm:px-5 sm:py-5 px-5 lg:w-1/3 w-full">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
                  </div>
                </div>
                {/* Price and Actions Section */}
                <div className="lg:w-1/3 w-full bg-[#f9f9f9] lg:px-8">
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
                    <div className="h-10 bg-gray-200 animate-pulse rounded w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Skeleton - Grid Layout (Hidden by default) */}
        <div className="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm h-full">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-lg mb-4" />
                <div className="space-y-2 w-full">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                  <div className="h-10 bg-gray-200 animate-pulse rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
} 