"use client";

import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "../Loading";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterProduct({ BannerProduct, id, resultFilter }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <div className="lg:w-1/4 w-full lg:min-w-[300px]">
        <div className="lg:block hidden p-3">
          {resultFilter && (
            <div className="bg-white rounded-lg p-3">
              <SelectCategoryFilter resultFilter={resultFilter} />
            </div>
          )}

          {BannerProduct &&
            BannerProduct.length > 0 &&
            BannerProduct.filter((e) => e.categoryKey === "banner_inner")
              .length > 0 &&
            BannerProduct.filter((e) => e.categoryKey === "banner_inner").map(
              (item) => (
                <div key={item.id}>
                  {(item?.productCats?.filter((ev) => ev === id).length > 0 ||
                    item?.productCats?.length <= 0) && (
                    <div className="mt-5 rounded-lg">
                      <Link
                        href={item.link || "#"}
                        onClick={(ev) => {
                          ev.preventDefault();
                          startTransition(() => {
                            router.push(item.link);
                          });
                        }}
                      >
                        <img
                          className="rounded-lg w-full"
                          src={getImageUrl(item.image)}
                          alt=""
                        />
                      </Link>
                    </div>
                  )}
                </div>
              )
            )}
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default FilterProduct;
