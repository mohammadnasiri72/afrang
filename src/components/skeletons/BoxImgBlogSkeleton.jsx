import Container from "../container";
import BlogPaginationSkeleton from "./BlogPaginationSkeleton";

export default function BoxImgBlogSkeleton() {
  return (
    <Container>
      <div className="flex flex-wrap pt-10">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
            <div className="rounded-lg overflow-hidden bg-white relative z-50">
              <div className="overflow-hidden relative flex items-center justify-center">
                <div className="relative h-[200px] w-full">
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              <div className="p-3">
                <div className="h-12 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className="min-h-[100px] space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24 ml-1"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BlogPaginationSkeleton />
    </Container>
  );
}



