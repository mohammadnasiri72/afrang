"use client";
import { setFilterLoading } from "@/redux/features/filterLoadingSlice";
import { Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import GridProductCard from "./GridProductCard";
import ProductCard from "./ProductCard";

function Products({ products }) {
  const layoutProducts = useSelector(
    (state) => state.layoutProducts.layoutProducts
  );

  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();
  const isFilterLoading = useSelector(
    (state) => state.filterLoading.isFilterLoading
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (products) {
      dispatch(setFilterLoading(false));
    }
  }, [products, searchParams, dispatch]);

  if (isFilterLoading) {
    if (layoutProducts === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {[
            ...Array(
              searchParams.get("pageSize")
                ? Number(searchParams.get("pageSize"))
                : 20
            ),
          ].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm h-full"
            >
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-center mb-4">
                  <Skeleton.Image active className="w-40 h-40" />
                </div>
                <Skeleton
                  active
                  paragraph={{ rows: 2 }}
                  className="w-full mb-4"
                />
                <div className="w-full space-y-2">
                  <Skeleton.Button active block size="large" />
                  <Skeleton.Button active block size="large" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-5 mt-5">
        {[
          ...Array(
            searchParams.get("pageSize")
              ? Number(searchParams.get("pageSize"))
              : 20
          ),
        ].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 h-52 overflow-hidden z-50 relative"
          >
            <div className="flex flex-wrap">
              <div className="p-3 lg:w-1/3 w-full">
                <Skeleton.Image active className="w-48 h-48" />
              </div>
              <div className="sm:px-5 sm:py-5 px-5 lg:w-1/3 w-full">
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
              <div className="lg:w-1/3 w-full bg-[#f9f9f9] lg:px-8">
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        className={
          layoutProducts === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
            : "space-y-5 mt-5"
        }
      >
        {products.map((product, i) => (
          <div key={i} className={layoutProducts === "grid" ? "h-full" : ""}>
            {layoutProducts === "grid" ? (
              <GridProductCard
                product={product}
                startTransition={startTransition}
              />
            ) : (
              <ProductCard
                product={product}
                startTransition={startTransition}
              />
            )}
          </div>
        ))}
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default Products;
