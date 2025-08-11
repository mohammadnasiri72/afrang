"use client";
import { getItemById } from "@/services/Item/item";
import { addToRecentViews } from "@/utils/recentViews";
import { Alert } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import SelectColorProduct from "./SelectColorProduct";
import SelectProductMokamel from "./SelectProductMokamel";
import { useSelector } from "react-redux";

function DescProductDetails({ product }) {
  const [brand, setBrand] = useState({});

  const { settings } = useSelector((state) => state.settings);

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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 flex-wrap ">
            {product?.product?.categoryTitle && (
              <div className="flex items-center gap-2 my-2 px-1 font-medium text-[#333a]">
                <span className="text-xs">دسته بندی : </span>
                <span className="text-xs">
                  {product?.product?.categoryTitle}
                </span>
              </div>
            )}
            {brand?.title && (
              <div className="flex items-center gap-2 my-2 px-1 font-medium text-[#333a]">
                <span className="text-xs">برند : </span>
                <span className="text-xs">{brand.title}</span>
              </div>
            )}
          </div>
          {/* <div className="flex items-center gap-1 font-medium text-[#333a] hover:text-[#d1182b] duration-300 cursor-pointer">
            <MdLocalPrintshop />
            <span className="text-xs">چاپ</span>
          </div> */}
        </div>
        {product?.product?.conditionId === 20 && (
          <div className="mb-5 mt-1">
            <div>
              <Alert
                message=" لطفا قبل از انجام هرگونه معامله، قوانین خرید و فروش را مطالعه نمایید "
                description={
                  <div className="flex flex-col items-start justify-center">
                    <Link
                      className="!text-cyan-700 font-semibold hover:!text-cyan-600 duration-300"
                      href="/usedrules"
                    >
                      مشاهده قوانین خرید و فروش تجهیزات کارکرده و دست دوم.
                    </Link>
                  </div>
                }
                type="warning"
                className="text-justify !py-2 !px-4"
              />
            </div>
            <div className="mt-2">
              <Alert
                message={
                  <span className="text-cyan-700">
                    این محصول از طرف تیم افرنگ به شما پیشنهاد شده است.
                  </span>
                }
                description={
                  <div className="flex flex-col items-start justify-center">
                    <div>
                      <span>مشاوره تلفنی : </span>
                      <a
                        className="!text-cyan-700 font-bold hover:!text-cyan-600 duration-300"
                        href={`tel:${
                          settings?.find(
                            (item) => item.propertyKey === "site_tel"
                          )?.value || "02177615546"
                        }`}
                      >
                        {settings?.find(
                          (item) => item.propertyKey === "site_tel"
                        )?.value || "77615546"}
                      </a>
                    </div>
                  </div>
                }
                type="info"
                className="text-justify !py-2 !px-4"
              />
            </div>
          </div>
        )}

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
