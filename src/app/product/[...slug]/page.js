import BodyProduct from "@/components/Product/BodyProduct";
import TitleProduct from "@/components/Product/TitleProduct";
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

 
   
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <TitleProduct product={{...product , id}}/>   
          <BodyProduct product={{...product , id}} comments={comments} totalCount={totalCount}/>
        </div>
      </div>
    </>
  );
}
