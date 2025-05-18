"use client";
import { useEffect } from "react";
import { addToRecentViews } from "@/utils/recentViews";
import ExpandableText from "./ExpandableText";
import SelectColorProduct from "./SelectColorProduct";
import SelectProductMokamel from "./SelectProductMokamel";

function DescProductDetails({ product }) {
  
  useEffect(() => {
    // ذخیره بازدید محصول در localStorage
    if (product && product.productId) {
      addToRecentViews(product.productId);
    }
  }, [product]);

  return (
    <>
      <div className="px-3">
        <h1 className="py-[15px] font-semibold text-lg">{product.title}</h1>
        <div className="mb-4">
          <ExpandableText text={product.product.summary} />
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">رنگ محصول : </span>
          <SelectColorProduct product={product} />
        </div>
        <SelectProductMokamel product={product} />
      </div>
    </>
  );
}

export default DescProductDetails;
