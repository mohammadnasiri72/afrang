import Container from "../container";

export default function CategoryBlogSkeleton() {
  return (
    <Container>
      <div className="flex flex-wrap items-center pt-20">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="p-4 lg:w-[14.286%] sm:w-1/4 w-1/2">
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-[50px] overflow-hidden border-4 h-52 border-transparent">
                <div className="w-full h-full bg-gray-200 rounded-[50px] animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}





