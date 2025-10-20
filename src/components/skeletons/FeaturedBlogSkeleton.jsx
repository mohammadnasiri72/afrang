export default function FeaturedBlogSkeleton() {
  return (
    <div className="flex flex-wrap bg-white p-5 rounded-lg overflow-hidden items-start">
      <div className="lg:w-1/3 w-full py-3 px-5">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-full mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        <div className="flex items-center mt-8">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 ml-2"></div>
        </div>
        <div className="flex items-center mt-6">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-2"></div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full relative overflow-hidden rounded-lg flex items-center justify-center">
        <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}








