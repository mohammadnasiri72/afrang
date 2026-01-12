import Container from "../container";

export default function BodyGallerySkeleton() {
  return (
    <Container>
      <div className="space-y-8">
       

       

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <div className="h-90 bg-gray-200 animate-pulse"></div>
              </div>
              <div className="mt-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 !mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

         {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 rounded-lg animate-pulse w-10"></div>
          ))}
        </div>
      </div>
    </Container>
  );
}








