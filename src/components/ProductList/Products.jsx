import { getImageUrl2 } from "@/utils/mainDomain";
import Link from "next/link";
import Image from "next/image";
import {
  FaCartShopping,
  FaRecycle,
  FaTruck,
  FaTruckFast,
} from "react-icons/fa6";
import { Tooltip, Skeleton } from "antd";
import ExpandableText from "../Product/ExpandableText";
import AddToCartButton from "./AddToCartButton";
import PriceProduct from "./PriceProduct";
import CompareButton from "../common/CompareButton";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setFilterLoading } from "@/redux/features/filterLoadingSlice";

function Products({ products, layout = "list" }) {
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
    if (layout === "grid") {
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

  const ProductCard = ({ product }) => (
    <>
      <div className="bg-white rounded-lg relative z-50">
        <div className="flex w-full flex-wrap items-start">
          {/* موبایل: چیدمان افقی */}
          <div className="lg:hidden w-full">
            <div className="flex gap-3 p-3">
              {/* تصویر محصول */}
              <div className="relative flex-shrink-0">
                <Link href={product.url} className="relative">
                  <div className="relative overflow-hidden rounded-lg group">
                    <Image
                      className="object-contain rounded-lg w-24 h-24 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                      src={getImageUrl2(product.image)}
                      alt={product.title}
                      width={96}
                      height={96}
                      priority={false}
                      unoptimized
                    />
                    {product.discount !== 0 && (
                      <span className="absolute top-1 right-1 bg-[#d1182b] px-1.5 py-0.5 rounded-sm text-white text-xs font-bold">
                        {product.discount}٪
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              {/* اطلاعات محصول */}
              <div className="flex-grow">
                <Link
                  href={product.url}
                  className="hover:text-[#d1182b] duration-300"
                >
                  <h2 className="font-semibold text-sm line-clamp-3 mb-1 text-justify">
                    {product.title}
                  </h2>
                </Link>
                <PriceProduct product={product} />
                <div className="flex items-center gap-2 mt-1">
                  {product.fastShipping && (
                    <div className="flex items-center text-xs">
                      <FaTruckFast className="text-[#898989] ml-1" />
                      <span className="text-[#666]">ارسال سریع</span>
                    </div>
                  )}
                  {product.freeShipping && (
                    <div className="flex items-center text-xs">
                      <FaTruck className="text-[#898989] ml-1" />
                      <span className="text-[#666]">ارسال رایگان</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="px-3 pb-3">
              {!product.canAddCart ? (
                <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm text-sm">
                  <FaCartShopping className="text-[#333]" />
                  <span className="text-[#666]">{product.statusDesc}</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <AddToCartButton productId={product.productId} />
                  <CompareButton product={product} />
                </div>
              )}
            </div>
          </div>

          {/* دسکتاپ: چیدمان اصلی */}
          <div className="hidden lg:flex w-full h-64 overflow-hidden">
            <div className=" min-w-52 max-w-52 relative flex items-start justify-center pt-5">
              <Link href={product.url} className="relative ">
                <div className="relative overflow-hidden rounded-lg group">
                  <Image
                    className="object-contain rounded-lg w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    src={getImageUrl2(product.image)}
                    alt={product.title}
                    width={200}
                    height={200}
                    priority={false}
                    unoptimized
                  />
                  {product.discount !== 0 && (
                    <span className="absolute top-2 right-2 bg-[#d1182b] px-2 py-0.5 rounded-sm text-white text-xs font-bold">
                      {product.discount}٪
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <div className="w-full flex ">

            <div className="sm:px-5 sm:py-5 px-5 w-7/12 relative flex flex-col h-full">
              <Link
                href={product.url}
                className="hover:text-[#d1182b] duration-300"
              >
                <h2 className="font-semibold sm:text-lg text-sm text-justify">
                  {product.title}
                </h2>
              </Link>
              {/* {product.summary && <ExpandableText text={product.summary} />} */}
              {product.summary && <p className="text-justify flex-1 overflow-hidden text-ellipsis summary-clamp">{product.summary}</p>}
            </div>
            <div className=" w-5/12 bg-[#f9f9f9] lg:px-8">
              <div className="flex flex-col w-full h-full">
                <PriceProduct product={product} />
                {/* دکمه مقایسه */}
                <div className="mb-3">
                  <CompareButton product={product} />
                </div>
                {/* <div className="flex items-center py-2">
                  <img src="/images/icons/fast-delivery-2.png" alt="" />
                  <span className="px-1"> ضمانت اصل بودن کالا </span>
                </div> */}
                <div className="flex flex-wrap items-center gap-3">
                  {product.fastShipping && (
                    <div className="flex items-center ">
                      <FaTruckFast className="text-lg text-[#898989]" />
                      <span className="px-1 font-semibold"> ارسال سریع </span>
                    </div>
                  )}
                  {product.freeShipping && (
                    <div className="flex items-center ">
                      <FaTruck className="text-lg text-[#898989]" />
                      <span className="px-1 font-semibold"> ارسال رایگان </span>
                    </div>
                  )}
                  {product.conditionId === 20 && (
                  <div className="flex items-center text-sm text-[#d1182b] mb-1 px-1">
                    <FaRecycle className="ml-1.5" />
                    <span className="font-semibold px-1">کالای کارکرده</span>
                  </div>
                )}
                </div>
                

                {!product.canAddCart && (
                  <div className="mt-2">
                    <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm">
                      <FaCartShopping className="text-[#333]" />
                      <span className="text-[#666]">{product.statusDesc}</span>
                    </button>
                  </div>
                )}
                {product.canAddCart && (
                  <div className="mt-2 flex flex-col gap-2">
                    <AddToCartButton productId={product.productId} />
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const GridProductCard = ({ product }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex flex-col items-center flex-grow">
        <div className="relative w-full flex justify-center items-center">
          <Link href={`${product.url}`}>
            <Image
              className="w-40 h-40 object-contain rounded-lg mb-4"
              src={getImageUrl2(product.image)}
              alt={product.title}
              width={160}
              height={160}
              priority={false}
              unoptimized
            />
          </Link>
          {product.conditionId === 20 && (
            <div className="absolute top-0 right-0 bg-[#40768c] text-white px-3 py-1 rounded-sm transform shadow-md">
              کارکرده
            </div>
          )}
        </div>
        <Link
          href={`${product.url}`}
          className="font-semibold text-lg text-center mb-2 line-clamp-3 hover:text-[#d1182b] duration-300"
        >
          <h2 className="text-justify">{product.title}</h2>
        </Link>
        <div className="flex items-center justify-center gap-3 mb-2">
          {product.fastShipping && (
            <Tooltip title="ارسال سریع" placement="top">
              <FaTruckFast className="text-2xl text-[#d1182b] cursor-pointer" />
            </Tooltip>
          )}
          {product.freeShipping && (
            <Tooltip title="ارسال رایگان" placement="top">
              <FaTruck className="text-2xl text-[#40768c] cursor-pointer" />
            </Tooltip>
          )}
        </div>
        {product.statusId === 1 && product.discount > 0 && (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl text-[#d1182b]">
                {product?.finalPrice?.toLocaleString()}
              </span>
              <span className="text-[#555]">تومان</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-[#888]">
                {product?.price1?.toLocaleString()}
              </span>
              <span className="text-white bg-[#d1182b] px-2 py-0.5 rounded-sm text-sm">
                {product.discount}%
              </span>
            </div>
          </div>
        )}
        <div className="mt-auto w-full space-y-2 flex flex-col justify-center items-center">
          {product.statusId === 1 && product.discount === 0 && (
            <div className="flex items-center gap-2 mb-4">
              {product?.price1 !== 0 && (
                <div>
                  <span className="font-semibold text-xl">
                    {product?.price1?.toLocaleString()}
                  </span>
                  <span className="text-[#555] px-1">تومان</span>
                </div>
              )}
              {product?.price1 === 0 && (
                <div>
                  <span className="text-[#555]">بدون قیمت</span>
                </div>
              )}
            </div>
          )}
          {product.canAddCart ? (
            <>
              <AddToCartButton productId={product.productId} />
              <CompareButton product={product} />
            </>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 bg-[#e1e1e1] text-[#666] py-2 rounded-sm">
              <FaCartShopping />
              <span>{product.statusDesc}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
          : "space-y-5 mt-5"
      }
    >
      {products.map((product) => (
        <div key={product.id} className={layout === "grid" ? "h-full" : ""}>
          {layout === "grid" ? (
            <GridProductCard product={product} />
          ) : (
            <ProductCard product={product} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Products;
