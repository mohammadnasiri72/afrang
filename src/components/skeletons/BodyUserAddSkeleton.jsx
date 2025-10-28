export default function BodyUserAddSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 !mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="h-12 bg-gray-200 rounded animate-pulse flex-1"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg">
            <div className="flex items-center space-x-4 !mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32 !mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}








