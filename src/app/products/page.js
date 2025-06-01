import { getCategory } from "@/services/Category/categoryService";
import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import Image from "next/image";
import { FaBoxOpen } from "react-icons/fa6";
import dynamic from 'next/dynamic';
const BodyProductList = dynamic(() => import("@/components/ProductList/BodyProductList"));
const FilterProduct = dynamic(() => import("@/components/ProductList/FilterProduct"));
const PaginationProduct = dynamic(() => import("@/components/ProductList/PaginationProduct"));
import { getProducts } from "@/services/products/productService";
import { getItem } from "@/services/Item/item";

export default async function ProductList({ searchParams }) {
  // اگر searchParams وجود داشته باشد، محصولات را نمایش می‌دهیم
  if (searchParams && Object.keys(searchParams).length > 0) {
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

    const products = await getProducts({
      page: page,
      pageSize: pageSize,
      orderBy: orderBy,
      price1: price1,
      price2: price2,
      CategoryId: '',
      BrandId: brandId,
      OnlyPrice: onlyPrice,
      OnlyDiscount: onlyDiscount,
      StatusId: statusId,
      OnlyFest: onlyfest,
      ConditionId: conditionId
    });

    const BannerProduct = await getItem({
      TypeId: 1015,
      LangCode: 'fa',
      CategoryIdArray: "4693",
    });

    return (
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
    );
  }

  // اگر searchParams نداشته باشیم، دسته‌بندی‌ها را نمایش می‌دهیم
  const categories = await getCategory();

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden py-10">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="min-h-[70vh] flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4 relative z-50">
                <div className="flex justify-center mb-6">
                  <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">دسته‌بندی یافت نشد!</h2>
                <p className="text-gray-600 mb-6">
                  متأسفانه در حال حاضر دسته‌بندی‌ای برای نمایش وجود ندارد.
                </p>
                <Link
                  href="/"
                  className="bg-[#d1182b] text-white px-6 py-2 rounded-md hover:bg-[#b31525] transition-colors duration-300"
                >
                  صفحه اصلی
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-8 text-center">دسته‌بندی‌های محصولات</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.url + "?OrderBy=2"}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 z-50 relative group"
                  >
                    <div className="flex flex-col items-center text-center">
                      {category.image && (
                        <div className="bg-gray-600 p-10 rounded-full mb-4 group-hover:bg-[#d1182b] transition-colors duration-300 shadow-sm flex items-center justify-center">
                          <Image 
                            src={getImageUrl(category.image)}
                            alt={category.title}
                            width={56}
                            height={56}
                            unoptimized
                            className="object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
                          />
                        </div>
                      )}
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-[#d1182b] transition-colors duration-300">{category.title}</h2>
                      {category.count > 0 && (
                        <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full group-hover:bg-[#d1182b]/10 transition-colors duration-300">
                          {category.count} محصول
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
