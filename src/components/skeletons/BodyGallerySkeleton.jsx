import Container from "../container";

export default function BodyGallerySkeleton() {
  return (
    <Container>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 rounded-full animate-pulse w-24"></div>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="mt-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
        </div>
      </div>
    </Container>
  );
}








