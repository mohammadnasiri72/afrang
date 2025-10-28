export default function CategoryListSkeleton() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-10">
      <div className="container mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-8 bg-gray-200 animate-pulse rounded w-64 mx-auto !mb-8" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              {/* Category Icon */}
              <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full mx-auto !mb-4" />
              
              {/* Category Title */}
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mx-auto !mb-2" />
              
              {/* Product Count */}
              <div className="h-5 bg-gray-200 animate-pulse rounded w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 