export default function FilterSecSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="space-y-6">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
        
        {/* Search */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>

        {/* Category Filter */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse flex-1"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse flex-1"></div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
    </div>
  );
}







