import Container from "@/components/container";
import BodyUserAddSkeleton from "@/components/skeletons/BodyUserAddSkeleton";
import BreadCrumbSkeleton from "@/components/skeletons/BreadCrumbSkeleton";
import FilterSecSkeleton from "@/components/skeletons/FilterSecSkeleton";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import BreadCrumbUseds from "@/components/UserAdd/BreadCrumbUseds";
import FilterSec from "@/components/UserAdd/FilterSec";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import { Suspense } from "react";

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
    IsArchive: searchParams.archived ? 1 : 0,
  };

  const productsData = await getUserAdSell(data);

  return (
    <>
      <Container>
        <Suspense fallback={<BreadCrumbSkeleton />}>
          <BreadCrumbUseds />
        </Suspense>
        <div className="flex items-start">
          <div className="w-1/4 lg:block hidden px-3">
            <Suspense fallback={<FilterSecSkeleton />}>
              <FilterSec />
            </Suspense>
          </div>
          <div className="lg:w-3/4 w-full">
            <Suspense fallback={<BodyUserAddSkeleton />}>
              <BodyUserAdd
                productList={productsData}
                pathname={"useds"}
                archived={searchParams.archived ? true : false}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
