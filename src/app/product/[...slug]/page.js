import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
const BodyProduct = dynamic(() => import('@/components/Product/BodyProduct'));
const TitleProduct = dynamic(() => import('@/components/Product/TitleProduct'));
import { getComment } from '@/services/comments/serviceComment';
import { getProductId } from "@/services/products/productService";
import { itemVisit } from '@/services/Item/item';

export default async function ProductDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;
  const headersList = headers();
  
  // Get IP and User Agent from headers
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';
  const url = headersList.get('x-url') || headersList.get('referer') || '';

  const pageComment = searchParams?.pageComment ? parseInt(searchParams.pageComment) : 1;

  const slug = await params;
  const id = Number(slug.slug[0]);
  const product = await getProductId(id);
  
  // Record the visit with IP and User Agent
  try {
    await itemVisit(id, url, ip, userAgent);
  } catch (error) {
    console.error('Error recording visit:', error);
  }

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
