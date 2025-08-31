"use client";
import { setSelectedColorMode } from "@/redux/slices/productColorSlice";
import { getItemById } from "@/services/Item/item";
import { addToRecentViews } from "@/utils/recentViews";
import { Alert } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SelectColorProduct from "./SelectColorProduct";
import SelectProductMokamel from "./SelectProductMokamel";
import SelectedInsurance from "./SelectedInsurance";

function DescProductDetails({ product }) {
  const [brand, setBrand] = useState({});

  const { settings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // Check if product exists and has required data
  if (!product || !product.product) {
    return (
      <div className="px-3">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="text-gray-500 text-lg mb-4">
            اطلاعات محصول در دسترس نیست
          </div>
          <p className="text-gray-400">
            متأسفانه اطلاعات این محصول در حال حاضر در دسترس نیست.
          </p>
        </div>
      </div>
    );
  }

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
        setBrand({});
      }
    };

    fetchBrand();
  }, [product?.product?.brandId]);

  useEffect(() => {
    if (!product?.productModes || product?.productModes.length === 0) {
      dispatch(setSelectedColorMode(null));
    }
  }, [product]);

  return (
    <>
      <div className="px-3">
        <div className="flex items-center justify-between flex-wrap ">
          <h1 className="py-[15px] font-semibold text-lg">
            {product.product.title || 'محصول'}
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
                message={
                  <span className="text-cyan-700">
                    این محصول از طرف تیم افرنگ به شما پیشنهاد شده است.
                  </span>
                }
                description={
                  <span className="text-cyan-600">
                    این محصول به صورت دست دوم و با کیفیت تضمین شده ارائه می‌شود.
                  </span>
                }
                type="info"
                showIcon
                className="border-cyan-200 bg-cyan-50"
              />
            </div>
            <div className="mt-2">
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
        {
          product?.insurance && product?.insurance?.insuranceWays?.length > 0 &&
          <div>
            <SelectedInsurance product={product}/>
          </div>
        }
        {product?.product?.optionalId && (
          <SelectProductMokamel product={product} />
        )}
      </div>
    </>
  );
}

export default DescProductDetails;
