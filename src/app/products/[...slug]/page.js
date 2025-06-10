import { getItem } from "@/services/Item/item";
import { getProductCategory, getProducts } from "@/services/products/productService";
import dynamic from 'next/dynamic';
import { FaBoxOpen } from "react-icons/fa6";
import BreadcrumbNav from "./BreadcrumbNav";
import { redirect } from 'next/navigation';

const BodyProductList = dynamic(() => import("@/components/ProductList/BodyProductList"));
const FilterProduct = dynamic(() => import("@/components/ProductList/FilterProduct"));
const PaginationProduct = dynamic(() => import("@/components/ProductList/PaginationProduct"));

export default async function ProductList(props) {
  const { params, searchParams } = props;
  const id = Number(params.slug[params.slug.length - 2]);

  // اول چک می‌کنیم که آیا نیاز به ریدایرکت داریم
  const productCategory = await getProductCategory(id);
  if (productCategory?.url) {
    const currentPath = `/products/${params.slug.join('/')}`;
    const searchParamsObj = {};
    
    for (const [key, value] of Object.entries(searchParams)) {
      searchParamsObj[key] = value;
    }
    
    const searchParamsString = new URLSearchParams(searchParamsObj).toString();
    const currentUrl = searchParamsString ? `${currentPath}?${searchParamsString}` : currentPath;
    const decodedUrl = decodeURIComponent(currentUrl);

    // فقط اگر URL متفاوت باشه ریدایرکت می‌کنیم
    if (productCategory.url !== decodedUrl) {
      redirect(productCategory.url);
    }
  }

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.orderby ? parseInt(searchParams.orderby) : "";
  const layout = searchParams?.layout ? searchParams.layout : "list";
  const price1 = searchParams?.price1 ? parseInt(searchParams.price1) : 0;
  const price2 = searchParams?.price2 ? parseInt(searchParams.price2) : 100000;
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize) : 20;
  const brandId = searchParams?.brandid || "";

  const onlyPrice = searchParams?.onlyprice === "1" ? "1" : undefined;
  const onlyDiscount = searchParams?.onlydiscount === "1" ? "1" : undefined;
  const statusId = searchParams?.statusid === "1" ? "1" : undefined;
  const onlyfest = searchParams?.onlyfest === "1" ? "1" : undefined;
  const conditionId = searchParams?.conditionId === "20" ? "20" : undefined;

  const [products, BannerProduct] = await Promise.all([
    getProducts({
      page,
      pageSize,
      orderBy,
      price1,
      price2,
      CategoryId: id,
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

  return (
    <>
      <BreadcrumbNav breadcrumb={productCategory.breadcrumb} />
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
