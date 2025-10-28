import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import FilterSec from "@/components/UserAdd/FilterSec";
import { getUserAdBuy } from "@/services/UserAd/UserAdServices";

export default async function UserAddDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const searchParams = await prop.searchParams;
  const slug = await params;
  const id = Number(slug.slug[0]);

  const data = {
    LangCode: "fa",
    CategoryIdArray:
      typeof searchParams.category === "object"
        ? searchParams.category.join(",")
        : typeof searchParams.category === "string"
        ? searchParams.category
        : undefined,
    ...(searchParams.price1 && { Amount1: searchParams.price1 }),
    ...(searchParams.price2 && { Amount2: searchParams.price2 }),
    // IsActive: 1,
    OrderBy: Number(searchParams.orderby) || "1",
    // OrderOn: 1,
    PageSize: Number(searchParams.pageSize) || "20",
    PageIndex: Number(searchParams.page) || "1",
  };

  const productsData = await getUserAdBuy(data);
  return (
    <>
      <BreadcrumbMain
        breadcrumb={[{ title: "کالای دسته دوم", format: "type" }]}
      />
      <div className="max-w-[2000px] mx-auto overflow-hidden">
        <Container>
          <div className="flex items-start">
            <div className="w-1/4 lg:block hidden px-3">
              <FilterSec />
            </div>
            <div className="lg:w-3/4 w-full">
              <BodyUserAdd productList={productsData} pathname={"buyers"} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
