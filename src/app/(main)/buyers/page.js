import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import BodyUserAddSkeleton from "@/components/skeletons/BodyUserAddSkeleton";
import FilterSecSkeleton from "@/components/skeletons/FilterSecSkeleton";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import FilterSec from "@/components/UserAdd/FilterSec";
import { getUserAdBuy } from "@/services/UserAd/UserAdServices";
import { Suspense } from "react";

export default async function UserAdd(props) {
  const prop = await props;
  const searchParams = await prop.searchParams;

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
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto overflow-hidden">
          <BreadcrumbMain
            breadcrumb={[{ title: "کالای دسته دوم", format: "type" }]}
          />
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto overflow-hidden">
        <Container>
          <div className="flex items-start">
            <div className="w-1/4 lg:block hidden px-3">
              <Suspense fallback={<FilterSecSkeleton />}>
                <FilterSec />
              </Suspense>
            </div>
            <div className="lg:w-3/4 w-full">
              <Suspense fallback={<BodyUserAddSkeleton />}>
                <BodyUserAdd productList={productsData} pathname={"buyers"} />
              </Suspense>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
