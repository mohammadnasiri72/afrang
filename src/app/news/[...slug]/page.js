import BlogDesc from "@/components/blogDetails/BlogDesc.jsx";
import RelationBlog from "@/components/blogDetails/RelationBlog.jsx";
import Container from "@/components/container";
import { getComment } from "@/services/comments/serviceComment";

export default async function BlogDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;

  const slug = await params;
  const id = Number(slug.slug[0]);

  const pageComment = searchParams?.pageComment
    ? parseInt(searchParams.pageComment)
    : 1;

  const { items: comments, totalCount } = await getComment(id, pageComment);

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-start mt-10 lg:flex-row flex-col-reverse">
            <RelationBlog />
            <BlogDesc
              id={id}
              comments={comments}
              totalCount={totalCount}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
