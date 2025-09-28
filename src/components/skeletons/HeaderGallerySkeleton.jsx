export default function HeaderGallerySkeleton() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="h-12 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-96 mx-auto mb-8"></div>
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded-full animate-pulse w-32"></div>
          ))}
        </div>
      </div>
    </div>
  );
}



