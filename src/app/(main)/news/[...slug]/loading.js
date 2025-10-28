import Container from "@/components/container";

export default function Loading() {
  return (
    <>
      <Container>
        {/* Breadcrumb Skeleton */}
        <div className="bg-white py-4 px-5 rounded-lg xl:px-16 !mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <span className="text-gray-400 mx-2 text-xs">&gt;</span>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <span className="text-gray-400 mx-2 text-xs">&gt;</span>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
        </div>
      </Container>
      
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-start mt-10 lg:flex-row flex-col-reverse">
            
            {/* Sidebar Skeleton - RelationBlog */}
            <div className="lg:w-1/4 w-full p-2 z-50 relative">
              <div className="bg-white p-4 rounded-lg">
                {/* Sidebar Title */}
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32 !mb-4"></div>
                
                {/* Sidebar Blog Items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-full mt-2">
                    <div className="relative group overflow-hidden">
                      {/* Image Skeleton */}
                      <div className="overflow-hidden relative cursor-pointer flex items-center justify-center">
                        <div className="w-full h-48 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      
                      {/* Content Skeleton */}
                      <div className="p-3 bg-white">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full !mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Content Skeleton - BlogDesc */}
            <div className="lg:w-3/4 w-full p-2">
              <div className="bg-white p-4 rounded-lg">
                {/* Title Skeleton */}
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 !mb-4"></div>
                
                {/* Meta Info Skeleton */}
                <div className="flex flex-wrap gap-3 mt-2 !mb-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                  </div>
                </div>
                
                {/* Image Skeleton */}
                <div className="mt-4">
                  <div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>
                </div>
                
                {/* Content Skeleton */}
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
                
                {/* Divider */}
                <hr className="mt-10 border-[#40768c55] border-[1.5px]" />
                
                {/* Action Buttons Skeleton */}
                <div className="flex flex-wrap justify-between items-center p-3 font-semibold">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Comments Section Skeleton */}
              <div className="bg-white p-4 rounded-lg mt-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32 !mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((comment) => (
                    <div key={comment} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 !mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-full !mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
} 