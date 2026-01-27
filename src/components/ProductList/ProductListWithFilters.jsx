import { getItem } from "@/services/Item/item";
import { getProducts } from "@/services/products/productService";
import { getCategoryChild } from "@/services/Property/propertyService";
import dynamic from "next/dynamic";
import { FaBoxOpen } from "react-icons/fa6";

const FilterProduct = dynamic(() => import("./FilterProduct"));
const BodyProductList = dynamic(() => import("./BodyProductList"));
const PaginationProduct = dynamic(() => import("./PaginationProduct"));

export default async function ProductListWithFilters({
  searchParams,
  products,
  bannerProduct,
}) {
  // دریافت resultFilter با handle خطا و timeout
  let resultFilter = null;
  try {
    resultFilter = await getCategoryChild(-1);
    if (resultFilter && resultFilter.type === "error") {
      resultFilter = null;
    }
  } catch (error) {
    console.error("Error fetching resultFilter:", error);
    resultFilter = null;
  }

  const layout = searchParams?.layout ? searchParams.layout : "list";
 

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <FilterProduct
        BannerProduct={bannerProduct}
        resultFilter={resultFilter}
        id={-1}
      />
      {!products ||
      products.length === 0 ||
      products.type === "error" ||
      bannerProduct.type === "error" ? (
        <div className="flex justify-center w-full">
          <div className="bg-white p-8 rounded-lg mt-3 shadow-sm text-center max-w-lg mx-4 w-full">
            <div className="flex justify-center !mb-6">
              <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
            </div>
            <h2 className="text-2xl font-bold !mb-4 text-gray-800">
              محصولی یافت نشد!
            </h2>
            <p className="text-gray-600 !mb-6">
              متأسفانه با فیلترهای انتخاب شده محصولی پیدا نکردیم. لطفاً فیلترها
              را تغییر دهید.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <BodyProductList
            products={products}
            layout={layout}
            resultFilter={resultFilter}
          />
          <div className="flex justify-center mt-8">
            <PaginationProduct total={products[0].total} />
          </div>
        </div>
      )}
    </div>
  );
}
