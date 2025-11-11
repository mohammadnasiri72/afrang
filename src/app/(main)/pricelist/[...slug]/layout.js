import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getCategory } from "@/services/Category/categoryService";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";

export async function generateMetadata({ params }) {
  const id = Number(params.slug[0]);
  const selectedCategory = await getCategory({
    TypeId: 4,
    LangCode: "fa",
     IsActive: 1,
    ParentIdArray: id,
  });
 
  

  if (!selectedCategory[0].parentTitle) {
    return {
      title: "محصولی موجود نیست",
      description: "محصولی در صفحه مورد نظر یافت نشد",
    };
  }

  return {
    title: `افرنگ | قیمت محصولات ${selectedCategory[0].parentTitle}`,
  };
}

export default async function PriceListLayout({ children, params }) {
  const id = Number(params.slug[0]);
  const title = decodeURIComponent(params.slug[1]);
  const selectedCategory = await getCategory({
    TypeId: 4,
    LangCode: "fa",
     IsActive: 1,
    ParentIdArray: id,
  });
  return (
    <>
      <div className="bg-white">
        <div className="max-w-[2000px] mx-auto overflow-hidden">
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
