import dynamic from 'next/dynamic';
const BlogDesc = dynamic(() => import('@/components/blogDetails/BlogDesc.jsx'));
const RelationBlog = dynamic(() => import('@/components/blogDetails/RelationBlog.jsx'));
const Container = dynamic(() => import('@/components/container'));

export default async function BlogDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-start mt-10 lg:flex-row flex-col-reverse">
            <RelationBlog />
            <BlogDesc
              params={params}
              searchParams={searchParams}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
