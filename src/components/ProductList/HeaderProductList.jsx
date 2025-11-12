"use client";
import { FaSortAmountUp } from "react-icons/fa";
import { FaList, FaTableCells } from "react-icons/fa6";
import FilterResponsive from "./FilterResponsive";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFilterLoading } from "@/redux/features/filterLoadingSlice";
import { setLayoutProducts } from "@/redux/slices/layoutProducts";

function HeaderProductList({resultFilter}) {
  //  const resultFilter = await getCategoryChild(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const currentOrderBy = searchParams.get("orderby");
  const layoutProducts = useSelector((state) => state.layoutProducts.layoutProducts);

   const params = new URLSearchParams(searchParams);

  const handleSort = (orderBy) => {
    dispatch(setFilterLoading(true));
    if (orderBy) {
      params.set("orderby", orderBy);
    } else {
      params.delete("orderby");
    }
    if (params.get("page") === "1") {
      params.delete("page");
    }
    router.push(`?${params.toString()}`);
  };

  const handleLayoutChange = (layout) => {
    dispatch(setLayoutProducts(layout));
  };



  const sortOptions = [
    { label: "گران ترین", value: "5" },
    { label: "جدیدترین", value: "2" },
    { label: "پرفروش ها", value: "3" },
    { label: "پربازدید ترین", value: "1" },
    { label: "ارزان‌ترین", value: "4" },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-5">
        <div className="flex justify-between items-center">
          <div className="flex lg:gap-7 gap-3 items-center lg:overflow-visible overflow-x-auto overflow-y-hidden pb-2 lg:pb-0 hide-scrollbar">
            <div className="lg:flex hidden items-center gap-2 whitespace-nowrap">
              <FaSortAmountUp />
              <span className="font-bold select-none">مرتب سازی : </span>
            </div>

            <div className="lg:hidden min-w-fit">
              <FilterResponsive resultFilter={resultFilter}/>
            </div>
            {sortOptions.map((option) => (
              <span
                key={option.value || "default"}
                onClick={() => handleSort(option.value)}
                className={`font-semibold cursor-pointer duration-300 text-[15px] whitespace-nowrap select-none hover:text-[#d1182b] min-w-fit ${
                  (currentOrderBy === option.value || (!currentOrderBy && option.value === "5"))
                    ? "text-[#d1182b] border-[#18d1be]"
                    : "text-[#444] border-[#d5d5d5]"
                } border lg:border-none rounded-lg lg:rounded-none px-[15px] lg:px-0 py-[5px] lg:py-0 flex lg:inline items-center justify-center gap-1 ${
                  option.label === "آرشیو" ? "lg:ml-0 ml-5" : ""
                }`}
              >
                <FaSortAmountUp className="lg:hidden" />
                {option.label}
              </span>
            ))}
          </div>
          <div className="lg:flex hidden items-center gap-4 pr-10 pl-2">
            <FaList
              onClick={() => handleLayoutChange("list")}
              className={`text-2xl cursor-pointer ${
                layoutProducts === "list" ? "text-[#d1182b]" : "text-gray-400"
              }`}
            />
            <FaTableCells
              onClick={() => handleLayoutChange("grid")}
              className={`text-2xl cursor-pointer ${
                layoutProducts === "grid" ? "text-[#d1182b]" : "text-gray-400"
              }`}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

export default HeaderProductList;
