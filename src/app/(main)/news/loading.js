import Container from "@/components/container";

export default function Loading() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
    <Container>
      {/* Header Skeleton */}
      <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full h-full">
          <div className="align-middle w-full">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
            <div className="lg:w-[300px] w-full">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="lg:w-[250px] w-full">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article Skeleton */}
      <div className="flex flex-wrap bg-white p-5 rounded-lg overflow-hidden items-start">
        <div className="lg:w-1/3 w-full py-3 px-5">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse !mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center mt-8">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center mt-6">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="lg:w-2/3 w-full">
          <div className="h-[400px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="flex flex-wrap items-center pt-20">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="p-4 lg:w-[14.286%] sm:w-1/4 w-1/2">
            <div className="h-52 bg-gray-200 rounded-[50px] animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mt-4 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Articles Grid Skeleton */}
      <div className="flex flex-wrap pt-10">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2"
          >
            <div className="rounded-lg overflow-hidden bg-white relative">
              <div className="h-[200px] bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse !mb-5"></div>
                <div className="space-y-2 !mb-5">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center py-8">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </Container>
  </div>
  );
} 