import dynamic from 'next/dynamic';
import { getBlogsCat } from "@/services/blogs/blogCategory";
import { getBlogs } from "@/services/blogs/blogService";
const BoxImgBlog = dynamic(() => import('@/components/blog/BoxImgBlog'));
const HeaderBlog = dynamic(() => import('@/components/blog/HeaderBlog'));



export default async function Blog(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams?.pageSize
    ? parseInt(searchParams.pageSize)
    : 12;

  const { items: category } = await getBlogsCat();

  const { items: blogs, totalCount } = await getBlogs(
    page,
    pageSize,
    searchParams?.category
  );

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <HeaderBlog
          page={page}
          pageSize={pageSize}
          searchParams={searchParams}
          category={category}
          blogs={blogs}
        />
        <BoxImgBlog
          page={page}
          pageSize={pageSize}
          searchParams={searchParams}
          category={category}
          blogs={blogs}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}
