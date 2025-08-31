import Container from "../container";

export default function EmptyBlogsSkeleton() {
  return (
    <Container>
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mx-auto mb-6"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto"></div>
      </div>
    </Container>
  );
}
