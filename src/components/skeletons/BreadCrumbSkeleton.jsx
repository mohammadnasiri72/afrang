export default function BreadCrumbSkeleton() {
  return (
    <div className="bg-white py-4 px-6 rounded-lg mb-6">
      <div className="flex items-center space-x-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </div>
    </div>
  );
}






