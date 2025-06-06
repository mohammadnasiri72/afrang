import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { Suspense } from 'react';
const BodyProduct = dynamic(() => import('@/components/Product/BodyProduct'));
const TitleProduct = dynamic(() => import('@/components/Product/TitleProduct'));
import { getProductId } from "@/services/products/productService";
import { itemVisit } from '@/services/Item/item';
import BreadcrumbNavProduct from './BreadcrumbNavProduct';
import { TitleProductSkeleton, BodyProductSkeleton } from '@/components/Product/ProductSkeleton';

export default async function ProductDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const headersList = headers();
  
  // Get IP and User Agent from headers
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';
  const url = headersList.get('x-url') || headersList.get('referer') || '';

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
      <BreadcrumbNavProduct breadcrumb={product?.breadcrumb} />
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
            <TitleProduct product={{...product, id}} />
         
          
            <BodyProduct product={{...product, id}} />
         
        </div>
      </div>
    </>
  );
}
