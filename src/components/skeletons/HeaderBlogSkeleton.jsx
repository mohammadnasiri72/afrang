import Container from "../container";
import { SelectOrderSkeleton, SelectCategorySkeleton } from "./SelectSkeleton";

export default function HeaderBlogSkeleton() {
  return (
    <Container>
      <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full h-full">
          <div className="align-middle w-full">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
          <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
            <SelectOrderSkeleton />
            <SelectCategorySkeleton />
          </div>
        </div>
      </div>
    </Container>
  );
}
