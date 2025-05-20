"use client";
import { useEffect } from "react";
import { addToRecentViews } from "@/utils/recentViews";
import ExpandableText from "./ExpandableText";
import SelectColorProduct from "./SelectColorProduct";
import SelectProductMokamel from "./SelectProductMokamel";

function DescProductDetails({ product }) {
  

  useEffect(() => {
    // ذخیره بازدید محصول در localStorage
    if (product?.product?.productId) {
      addToRecentViews(product.product.productId);
    }
  }, [product]);

  return (
    <>
      <div className="px-3">
        <h1 className="py-[15px] font-semibold text-lg">{product.product.title}</h1>
        {
          product?.product?.summary &&
          <div className="mb-4">
            <ExpandableText text={product.product.summary} />
          </div>
        }
        {/* <div className="flex gap-2 items-center">
          <span className="font-semibold">رنگ محصول : </span>
          <SelectColorProduct product={product} />
        </div> */}
        {
          product?.product?.optionalId &&
          <SelectProductMokamel product={product} />
        }
      </div>
    </>
  );
}

export default DescProductDetails;
