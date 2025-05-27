import dynamic from 'next/dynamic';
const BodyProduct = dynamic(() => import('@/components/Product/BodyProduct'));
const TitleProduct = dynamic(() => import('@/components/Product/TitleProduct'));
import { getComment } from '@/services/comments/serviceComment';
import { getProductId } from "@/services/products/productService";

export default async function ProductDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;

  const pageComment = searchParams?.pageComment ? parseInt(searchParams.pageComment) : 1;

  const slug = await params;
  const id = Number(slug.slug[0]);
  const product = await getProductId(id);
  
  

 

 
   
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <TitleProduct product={{...product , id}}/>   
          <BodyProduct product={{...product , id}} />
        </div>
      </div>
    </>
  );
}
