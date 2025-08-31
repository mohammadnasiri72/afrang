import { getCategory } from '@/services/Category/categoryService';
import { getItem } from '@/services/Item/item';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeaderBlog = dynamic(() => import('@/components/blog/HeaderBlog'));
const FeaturedBlog = dynamic(() => import('@/components/blog/FeaturedBlog'));
const CategoryBlog = dynamic(() => import('@/components/blog/CategoryBlog'));
const BoxImgBlog = dynamic(() => import('@/components/blog/BoxImgBlog'));

// Import skeleton components
import HeaderBlogSkeleton from '@/components/skeletons/HeaderBlogSkeleton';
import FeaturedBlogSkeleton from '@/components/skeletons/FeaturedBlogSkeleton';
import CategoryBlogSkeleton from '@/components/skeletons/CategoryBlogSkeleton';
import BoxImgBlogSkeleton from '@/components/skeletons/BoxImgBlogSkeleton';

export default async function Blog({ searchParams }) {
  // دریافت دسته‌بندی‌ها
  const category = await getCategory({
    TypeId: 5,
    LangCode: "fa",
  });

  // دریافت مقالات برای SSR
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize) : 12;
  
  let blogs;
  try {
    blogs = await getItem({
      TypeId: 5,
      LangCode: "fa",
      PageSize: pageSize,
      PageIndex: page,
      CategoryIdArray: searchParams?.category,
      OrderBy: searchParams?.orderBy,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogs = [];
  }

  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Suspense fallback={<HeaderBlogSkeleton />}>
        <HeaderBlog searchParams={searchParams} category={category} />
      </Suspense>
      <Suspense fallback={<FeaturedBlogSkeleton />}>
        <FeaturedBlog />
      </Suspense>
      <Suspense fallback={<CategoryBlogSkeleton />}>
        <CategoryBlog category={category} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<BoxImgBlogSkeleton />}>
        <BoxImgBlog blogs={blogs} />
      </Suspense>
    </div>
  );
}
