import { itemVisit } from '@/services/Item/item';
import { getProductId } from "@/services/products/productService";
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import BreadcrumbNavProduct from './BreadcrumbNavProduct';
const BodyProduct = dynamic(() => import('@/components/Product/BodyProduct'));
const TitleProduct = dynamic(() => import('@/components/Product/TitleProduct'));

export default async function ProductDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const headersList = headers();
  
  // Get IP and User Agent from headers
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';
  const fullUrl = headersList.get('x-url') || headersList.get('referer') || '';
  const encodedPath = new URL(fullUrl).pathname;
  const url = decodeURIComponent(encodedPath);

  const slug = await params;
  const id = Number(slug.slug[0]);
  const product = await getProductId(id);

  
  
  // Record the visit with IP and User Agent
  try {
    await itemVisit(product?.product?.productId, url, ip, userAgent);
   
  } catch (error) {
    console.error('Error recording visit:', error);
  }

  return (
    <>
      <BreadcrumbNavProduct breadcrumb={product?.breadcrumb} />
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
            <TitleProduct product={product} />
            <BodyProduct product={product} />
        </div>
      </div>
    </>
  );
}
