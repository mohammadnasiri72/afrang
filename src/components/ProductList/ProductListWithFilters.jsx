import { getProducts } from "@/services/products/productService";
import { getItem } from "@/services/Item/item";
import { FaBoxOpen } from "react-icons/fa6";
import dynamic from 'next/dynamic';
import ErrorProductList from "@/app/products/error";

const FilterProduct = dynamic(() => import("./FilterProduct"));
const BodyProductList = dynamic(() => import("./BodyProductList"));
const PaginationProduct = dynamic(() => import("./PaginationProduct"));

export default async function ProductListWithFilters({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.OrderBy ? parseInt(searchParams.OrderBy) : "";
  const layout = searchParams?.layout ? searchParams.layout : "list";
  const price1 = searchParams?.price1 ? parseInt(searchParams.price1) : 0;
  const price2 = searchParams?.price2 ? parseInt(searchParams.price2) : 100000;
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize) : 20;
  const brandId = searchParams?.BrandId || "";
  const onlyPrice = searchParams?.onlyprice === "1" ? "1" : undefined;
  const onlyDiscount = searchParams?.onlydiscount === "1" ? "1" : undefined;
  const statusId = searchParams?.statusid === "1" ? "1" : undefined;
  const onlyfest = searchParams?.onlyfest === "1" ? "1" : undefined;
  const conditionId = searchParams?.conditionId === "20" ? "20" : undefined;

  const [products, bannerProduct] = await Promise.all([
    getProducts({
      page,
      pageSize,
      orderBy,
      price1,
      price2,
      CategoryId: '',
      BrandId: brandId,
      OnlyPrice: onlyPrice,
      OnlyDiscount: onlyDiscount,
      StatusId: statusId,
      OnlyFest: onlyfest,
      ConditionId: conditionId
    }),
    getItem({
      TypeId: 1015,
      LangCode: 'fa',
      CategoryIdArray: "4693",
    })
  ]);


 
  

  if (!products || products.length === 0 || products.type === 'error' || bannerProduct.type === 'error') {
    return (
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4">
          <div className="flex justify-center mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">محصولی یافت نشد!</h2>
          <p className="text-gray-600 mb-6">
            متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً فیلترها را تغییر دهید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <FilterProduct BannerProduct={bannerProduct} />
      <div className="w-full">
        <BodyProductList products={products} layout={layout} />
        <div className="flex justify-center mt-8">
          <PaginationProduct total={products[0].total} />
        </div>
      </div>
    </div>
  );
} 