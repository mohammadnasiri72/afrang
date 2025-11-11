import { getProductPricing } from "@/services/products/productService";
import PriceListClient from "./PriceListClient";
import { getCategory } from "@/services/Category/categoryService";


export const revalidate = 60; 

export default async function PriceListPage({ params }) {
  try {
    const id = Number(params.slug[0]);

    const pricing = await getProductPricing(id);
    
     const categoriesChilds = await getCategory({
        TypeId: 4,
        LangCode: "fa",
        IsActive: 1,
        ParentIdArray: id,
      });      

    if (!pricing || pricing.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 overflow-hidden max-w-[2000px] mx-auto">
          <div className="w-24 h-24 !mb-4">
            <svg
              className="w-full h-full text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 !mb-2">
            محصولی یافت نشد
          </h3>
          <p className="text-gray-500 text-center">
            در حال حاضر محصولی در این دسته‌بندی موجود نیست.
          </p>
        </div>
      );
    }

    return <PriceListClient pricing={pricing} categoriesChilds={categoriesChilds} id={id}/>;
  } catch (error) {
    console.error("Error in PriceListPage:", error);
    throw error; // Let error.js handle it
  }
}
