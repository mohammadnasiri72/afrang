import Container from "@/components/container";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import BreadCrumbUseds from "@/components/UserAdd/BreadCrumbUseds";
import FilterSec from "@/components/UserAdd/FilterSec";
import { Suspense } from "react";
import BodyUserAddSkeleton from "@/components/skeletons/BodyUserAddSkeleton";
import FilterSecSkeleton from "@/components/skeletons/FilterSecSkeleton";
import BreadCrumbSkeleton from "@/components/skeletons/BreadCrumbSkeleton";

export default async function UserAdd() {
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
              <BodyUserAdd />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
