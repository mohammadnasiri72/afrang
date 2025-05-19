import BodyProduct from "@/components/Product/BodyProduct";
import TitleProduct from "@/components/Product/TitleProduct";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { getComment } from "@/services/comments/serviceComment";
import { getProductId } from "@/services/products/productService";

export default async function ProductDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;

  const pageComment = searchParams?.pageComment ? parseInt(searchParams.pageComment) : 1;

  const slug = await params;
  const id = Number(slug.slug[0]);
  const product = await getProductId(id);

  const { items: comments , totalCount} = await getComment(
    id,
    pageComment,
  );

  const breadcrumbItems = [
    { title: "محصولات", href: "/products" },
    { title: product.categoryTitle, href: `/products/${product.categoryId}/${encodeURIComponent(product.categoryTitle)}` },
    { title: product.title }
  ];
   
  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <TitleProduct product={{...product , id}}/>   
          <BodyProduct product={{...product , id}} comments={comments} totalCount={totalCount}/>
        </div>
      </div>
    </>
  );
}
