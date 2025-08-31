import HeaderBlogSkeleton from "./HeaderBlogSkeleton";
import FeaturedBlogSkeleton from "./FeaturedBlogSkeleton";
import CategoryBlogSkeleton from "./CategoryBlogSkeleton";
import BoxImgBlogSkeleton from "./BoxImgBlogSkeleton";

export default function NewsPageSkeleton() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden min-h-screen">
      <HeaderBlogSkeleton />
      <FeaturedBlogSkeleton />
      <CategoryBlogSkeleton />
      <BoxImgBlogSkeleton />
    </div>
  );
}
