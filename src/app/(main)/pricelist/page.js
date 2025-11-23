import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyPriceList from "@/components/priceList/bodyPriceList";
import { getCategory } from "@/services/Category/categoryService";

export default async function PriceList() {
  let categories = [];

  try {
    const result = await getCategory({
      TypeId: 4,
      LangCode: "fa",
      IsHome: 1,
    });

    // Check if result is an error object or valid array
    if (result && !result.type && Array.isArray(result)) {
      categories = result;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain breadcrumb={[{ title: "لیست قیمت محصولات" }]} />
        </div>
      </div>
      <Container>
        <BodyPriceList categories={categories} />
      </Container>
    </>
  );
}
