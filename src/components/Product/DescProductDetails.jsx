"use client";
import { useEffect, useState } from "react";
import { addToRecentViews } from "@/utils/recentViews";
import ExpandableText from "./ExpandableText";
import SelectColorProduct from "./SelectColorProduct";
import SelectProductMokamel from "./SelectProductMokamel";
import { getItemById } from "@/services/Item/item";
import { FaRegEye } from "react-icons/fa";

function DescProductDetails({ product }) {
  const [brand, setBrand] = useState({});

  useEffect(() => {
    // ذخیره بازدید محصول در localStorage
    if (product?.product?.productId) {
      addToRecentViews(product.product.productId);
    }
  }, [product]);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        if (product?.product?.brandId) {
          const brandId = await getItemById(product?.product?.brandId);
          setBrand(brandId || {});
        }
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    fetchBrand();
  }, [product?.product?.brandId]);

  return (
    <>
      <div className="px-3">
        <div className="flex items-center justify-between flex-wrap ">
          <h1 className="py-[15px] font-semibold text-lg">
            {product.product.title}
          </h1>
          {product?.product?.visit && (
            <div className="flex items-center gap-2 my-2 px-1 font-medium text-[#333a]">
              <FaRegEye className="text-sm" />
              <span className="text-xs">{product?.product?.visit}</span>
            </div>
          )}
          
        </div>
        {product?.product?.summary && (
          <div className="mb-4">
            {/* <ExpandableText text={product.product.summary} /> */}
            <p className="text-justify">{product.product.summary}</p>
          </div>
        )}

        <div className="flex items-center gap-1 flex-wrap ">
          {product?.product?.categoryTitle && (
            <div className="flex items-center gap-2 my-2 px-1 font-medium text-[#333a]">
              <span className="text-xs">دسته بندی : </span>
              <span className="text-xs">{product?.product?.categoryTitle}</span>
            </div>
          )}
          {brand?.title && (
            <div className="flex items-center gap-2 my-2 px-1 font-medium text-[#333a]">
              <span className="text-xs">برند : </span>
              <span className="text-xs">{brand.title}</span>
            </div>
          )}
        </div>

        {product?.productModes && product?.productModes.length > 0 && (
          <div className="flex gap-5 items-center">
            <span className="font-semibold whitespace-nowrap">
              رنگ محصول :{" "}
            </span>
            <SelectColorProduct product={product} />
          </div>
        )}
        {product?.product?.optionalId && (
          <SelectProductMokamel product={product} />
        )}
      </div>
    </>
  );
}

export default DescProductDetails;
