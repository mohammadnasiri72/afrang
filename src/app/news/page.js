import { getCategory } from '@/services/Category/categoryService';
import { getItem } from '@/services/Item/item';
import dynamic from 'next/dynamic';
const BoxImgBlog = dynamic(() => import('@/components/blog/BoxImgBlog'));
const HeaderBlog = dynamic(() => import('@/components/blog/HeaderBlog'));



export default async function Blog(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams?.pageSize
    ? parseInt(searchParams.pageSize)
    : 12;

  const category = await getCategory({
    TypeId: 5,
    LangCode: "fa",
  });

  const blogs = await getItem({
    TypeId: 5,
    LangCode: "fa",
    PageSize: pageSize,
    PageIndex: page,
    CategoryIdArray: searchParams?.category,
    OrderBy: searchParams?.orderBy
  });


  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <HeaderBlog
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
          totalCount={blogs[0]?.total}
        />
      </div>
    </>
  );
}
