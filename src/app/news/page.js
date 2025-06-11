import Container from '@/components/container';
import { getCategory } from '@/services/Category/categoryService';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const BoxImgBlog = dynamic(() => import('@/components/blog/BoxImgBlog'));
const HeaderBlog = dynamic(() => import('@/components/blog/HeaderBlog'));
const FeaturedBlog = dynamic(() => import('@/components/blog/FeaturedBlog'));
const CategoryBlog = dynamic(() => import('@/components/blog/CategoryBlog'));



const BoxImgBlogScelton = () => {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Container>
        {/* Articles Grid Skeleton */}
        <div className="flex flex-wrap pt-10">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
              <div className="rounded-lg overflow-hidden bg-white relative">
                <div className="h-[200px] bg-gray-200 animate-pulse"></div>
                <div className="p-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2 mb-3">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
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
  )
}

export default async function Blog(props) {

  const prop = await props;
  const searchParams = await prop.searchParams;

  // دریافت دسته‌بندی‌ها
  const category = await getCategory({
    TypeId: 5,
    LangCode: "fa",
  });

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <HeaderBlog searchParams={searchParams} category={category} />
      <FeaturedBlog />
      <CategoryBlog category={category} searchParams={searchParams} />
      <Suspense fallback={<BoxImgBlogScelton />}>
        <BoxImgBlog searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
