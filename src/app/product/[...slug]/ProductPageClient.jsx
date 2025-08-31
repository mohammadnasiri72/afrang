"use client";

import dynamic from "next/dynamic";

const TitleProduct = dynamic(() => import("@/components/Product/TitleProduct"), { 
  loading: () => <div className="bg-white rounded-lg p-6 animate-pulse"><div className="h-32 bg-gray-200 rounded"></div></div>
});
const DescProduct = dynamic(() => import("@/components/Product/DescProduct"), { 
  loading: () => <div className="bg-white rounded-lg p-6 animate-pulse"><div className="h-48 bg-gray-200 rounded"></div></div>
});
const BreadcrumbNavProduct = dynamic(() => import("./BreadcrumbNavProduct"), { 
  loading: () => <div className="bg-white py-4 px-5 rounded-lg xl:px-16 animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/3"></div></div>
});
const BasketFixed = dynamic(() => import("./BasketFixed"), { 
  loading: () => <div className="lg:w-1/4 w-full p-4"><div className="bg-white rounded-lg p-6 animate-pulse"><div className="h-32 bg-gray-200 rounded"></div></div></div>
});
const PriceFixed = dynamic(() => import("./PriceFixed"), { 
  loading: () => <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div></div>
});


export default function ProductPageClient({ product, breadcrumb }) {
  return (
    <>
      <BreadcrumbNavProduct breadcrumb={breadcrumb || []} />
      <TitleProduct product={product} />
      <BasketFixed product={product} />
      <DescProduct product={product} />
      <PriceFixed product={product} />
    </>
  );
}
