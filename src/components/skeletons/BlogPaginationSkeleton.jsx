export default function BlogPaginationSkeleton() {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {[...Array(7)].map((_, index) => (
        <div key={index} className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );
}







