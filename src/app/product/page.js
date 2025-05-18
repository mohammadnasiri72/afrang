import BodyProductList from "@/components/ProductList/BodyProductList";
import FilterProduct from "@/components/ProductList/FilterProduct";
import PaginationProduct from "@/components/ProductList/PaginationProduct";
import { getProducts } from "@/services/products/productService";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa6";

export default async function ProductList(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.OrderBy ? parseInt(searchParams.OrderBy) : "";
  const layout = searchParams?.layout ? searchParams.layout : "list";
  const price1 = searchParams?.minPrice ? parseInt(searchParams.minPrice) : 0;
  const price2 = searchParams?.maxPrice
    ? parseInt(searchParams.maxPrice)
    : 100000;
  const pageSize = searchParams?.pageSize
    ? parseInt(searchParams.pageSize)
    : 20;


  const products = await getProducts({
    page: page,
    pageSize: pageSize,
    orderBy: orderBy,
    price1: price1,
    price2: price2,
  });


  return (
    <>
      {products.length === 0 && (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f6f6f6]">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg mx-4 relative z-50">
            <div className="flex justify-center mb-6">
              <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">محصولی یافت نشد!</h2>
            <p className="text-gray-600 mb-6">
              متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً فیلترها را تغییر دهید یا به صفحه اصلی بازگردید.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/"
                className="bg-[#d1182b] text-white px-6 py-2 rounded-md hover:bg-[#b31525] transition-colors duration-300"
              >
                صفحه اصلی
              </Link>
              <Link 
                href="/products"
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
              >
                حذف فیلترها
              </Link>
            </div>
          </div>
        </div>
      )}
      {products.length > 0 && (
        <div className="bg-[#f6f6f6] overflow-hidden py-10">
          <div className="xl:px-16">
            <div className="flex items-start flex-wrap">
              <FilterProduct />
              <BodyProductList products={products} layout={layout} />
            </div>
            <PaginationProduct total={products[0].total} />
          </div>
        </div>
      )}
    </>
  );
}
