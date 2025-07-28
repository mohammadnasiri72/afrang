import Container from '@/components/container';
import { getCategory } from '@/services/Category/categoryService';
import dynamic from 'next/dynamic';
const HeaderBlog = dynamic(() => import('@/components/blog/HeaderBlog'));
const FeaturedBlog = dynamic(() => import('@/components/blog/FeaturedBlog'));
const CategoryBlog = dynamic(() => import('@/components/blog/CategoryBlog'));
const BoxImgBlog = dynamic(() => import('@/components/blog/BoxImgBlog'));





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
      <BoxImgBlog searchParams={searchParams} />
    </div>
  );
}
