import BodyProductList from "@/components/ProductList/BodyProductList";
import FilterProduct from "@/components/ProductList/FilterProduct";
import PaginationProduct from "@/components/ProductList/PaginationProduct";
import { getProducts } from "@/services/products/productService";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa6";
import { getItem } from "@/services/Item/item";

export default async function ProductList(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;

  const slug = await params;
  const id = Number(slug.slug[0]);
  const categoryTitle = decodeURIComponent(slug.slug[1]);

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.OrderBy ? parseInt(searchParams.OrderBy) : "";
  const layout = searchParams?.layout ? searchParams.layout : "list";
  const price1 = searchParams?.price1 ? parseInt(searchParams.price1) : 0;
  const price2 = searchParams?.price2
    ? parseInt(searchParams.price2)
    : 100000;
  const pageSize = searchParams?.pageSize
    ? parseInt(searchParams.pageSize)
    : 20;
  const brandId = searchParams?.BrandId || "";
  
  // تبدیل مقادیر به عدد 1 برای ارسال به API
  const onlyPrice = searchParams?.onlyprice === "1" ? "1" : undefined;
  const onlyDiscount = searchParams?.onlydiscount === "1" ? "1" : undefined;
  const statusId = searchParams?.statusid === "1" ? "1" : undefined;
  const onlyfest = searchParams?.onlyfest === "1" ? "1" : undefined;

  const products = await getProducts({
    page: page,
    pageSize: pageSize,
    orderBy: orderBy,
    price1: price1,
    price2: price2,
    CategoryId: id,
    BrandId: brandId,
    OnlyPrice: onlyPrice,
    OnlyDiscount: onlyDiscount,
    StatusId: statusId,
    OnlyFest: onlyfest
  });



 

   const BannerProduct = await getItem({
    TypeId: 1015,
    LangCode: 'fa',
    CategoryIdArray: "4693",
  });


  return (
    <>
     
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="xl:px-16">
          <div className="flex flex-col lg:flex-row w-full">
            <FilterProduct BannerProduct={BannerProduct} />
            <div className="w-full">
              {!products || products.length === 0 ? (
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
              ) : (
                <div className="w-full">
                  <BodyProductList products={products} layout={layout} />
                  <div className="flex justify-center mt-8">
                    <PaginationProduct total={products[0].total} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
