import { getItemByUrl } from "@/services/Item/item";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import BreadcrumbNews from "./BreadcrumbNews";
const BlogDesc = dynamic(() => import("@/components/blogDetails/BlogDesc.jsx"));
const RelationBlog = dynamic(() =>
  import("@/components/blogDetails/RelationBlog.jsx")
);
const Container = dynamic(() => import("@/components/container"));

export default async function BlogDetails(props) {
  const prop = await props;
  const params = await prop.params;

  let url;

  // First try to get URL from params
  if (params?.slug && Array.isArray(params.slug) && params.slug.length > 0) {
    const decodedSlug = params.slug.map((part) => decodeURIComponent(part));
    url = `/news/${decodedSlug.join("/")}`;
  } else {
    // Fallback to headers if params are not available
    const headersList = headers();
    const fullUrl =
      headersList.get("x-url") || headersList.get("referer") || "";
    const encodedPath = new URL(fullUrl).pathname;
    url = decodeURIComponent(encodedPath);
  }

  const blog = await getItemByUrl(url);

  return (
    <>
      <Container>
        <BreadcrumbNews
          breadcrumb={blog.breadcrumb.filter(
            (item) => item.format !== "category"
          )}
        />
      </Container>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-start mt-10 lg:flex-row flex-col-reverse">
            <RelationBlog />
            <BlogDesc blog={blog} />
          </div>
        </Container>
      </div>
    </>
  );
}
