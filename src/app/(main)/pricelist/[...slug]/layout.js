import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getCategory } from "@/services/Category/categoryService";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";



export default async function PriceListLayout({ children, params }) {
  const id = Number(params.slug[0]);
  const title = decodeURIComponent(params.slug[1]);
  const selectedCategory = await getCategory({
    TypeId: 4,
    LangCode: "fa",
     IsActive: 1,
    ParentIdArray: id,
  });
  if (!selectedCategory || selectedCategory.length===0) {
    return(
      <>
     <div className="flex flex-col items-center justify-center py-12">
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
        دسته‌بندی یافت نشد
      </h3>
      <p className="text-gray-500 text-center">
        در حال حاضر محصولی در این دسته‌بندی موجود نیست.
      </p>
    </div>
      </>
    )
  }
  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain
            breadcrumb={[
              {
                href: "/pricelist",
                title: "لیست قیمت محصولات",
                format: "type",
              },
              { title: title, format: "type" },
            ]}
          />
        </div>
      </div>
      <Container>
        <div className="">
          <div className="flex flex-col items-center gap-2 !mt-8">
            <div className="flex justify-center items-start gap-4">
              <TbArrowBadgeLeftFilled className="text-[#d1182b] text-2xl" />
              <h4 className="font-bold text-xl text-[#0a1d39]">
                لیست قیمت محصولات{" "}
                {selectedCategory[0].parentTitle && (
                  <span className="font-bold text-xl text-[#18d1be] pr-1">
                    {selectedCategory[0].parentTitle}
                  </span>
                )}
              </h4>
              <TbArrowBadgeRightFilled className="text-[#d1182b] text-2xl" />
            </div>
          </div>
          {children}
        </div>
      </Container>
    </>
  );
}
