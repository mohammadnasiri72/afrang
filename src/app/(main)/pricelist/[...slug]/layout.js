import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import {
  getCategory,
  getCategoryById,
} from "@/services/Category/categoryService";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import CategorySlider from "./CategorySlider";

export async function generateMetadata({ params }) {
  const id = Number(params.slug[0]);
  const categories = await getCategoryById(id);

  if (categories.type === "error") {
    return {
      title: "صفحه پیدا نشد",
      description: "صفحه مورد نظر یافت نشد",
    };
  }

  return {
    title: `افرنگ | قیمت محصولات ${categories?.title}`,
  };
}

export default async function PriceListLayout({ children, params }) {
  const id = Number(params.slug[0]);
  const title = decodeURIComponent(params.slug[1]);
  const categories = await getCategory({
    TypeId: 4,
    LangCode: "fa",
    IsHome: 1,
  });
  const selectedCategory = categories?.find((category) => category.id === id);

  return (
    <>
      <BreadcrumbMain
        breadcrumb={[
          { href: "/pricelist", title: "لیست قیمت محصولات", format: "type" },
          { title: title, format: "type" },
        ]}
      />
      <Container>
        <div className="pb-8">
          <div className="!mb-8">
            <CategorySlider categories={categories} currentId={id} />
          </div>
          <div className="flex flex-col items-center gap-2 !mb-8">
            <div className="flex justify-center items-start gap-4">
              <TbArrowBadgeLeftFilled className="text-[#d1182b] text-2xl" />
              <h4 className="font-bold text-xl text-[#0a1d39]">
                لیست قیمت محصولات
              </h4>
              <TbArrowBadgeRightFilled className="text-[#d1182b] text-2xl" />
            </div>
            {selectedCategory && (
              <h5 className="text-lg text-[#18d1be] font-medium">
                {selectedCategory.title}
              </h5>
            )}
          </div>
          {children}
        </div>
      </Container>
    </>
  );
}
