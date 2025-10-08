"use client";
import { getImageUrl } from "@/utils/mainDomain";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";

function NewProduct({ products }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const router = useRouter();

  // استخراج دسته‌بندی‌های یکتا از محصولات و محدود کردن به 5 تا
  const categories = products
    ? [...new Set(products.map((product) => product.categoryTitle))].slice(0, 5)
    : [];

  useEffect(() => {
    if (products) {
      if (selectedCategory) {
        const filtered = products.filter(
          (product) => product.categoryTitle === selectedCategory
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [selectedCategory, products]);

  return (
    <>
      <div className="lg:hidden flex justify-center items-center pb-3">
        <div className="flex items-center title-newProduct relative">
          <h2 className="font-semibold text-xl">جدیدترین ها</h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="lg:flex hidden items-center title-newProduct relative">
          <h2 className="font-semibold text-xl">جدیدترین ها</h2>
        </div>

        {/* بخش موبایل */}
        <div className="lg:hidden w-full">
          {/* هدر دسته‌بندی‌ها */}
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold text-gray-700">
              دسته‌بندی‌ها
            </h3>
            <button
              onClick={() => {
                router.push(`/products?orderby=2`);
              }}
              className="flex items-center gap-1 !text-[#d1182b] hover:!text-[#d1182b]/80 transition-colors cursor-pointer"
            >
              <span className="text-sm">نمایش همه</span>
              <FaCaretLeft className="text-sm" />
            </button>
          </div>

          {/* لیست دسته‌بندی‌ها */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-0 min-w-max px-2">
              {categories.map((category, index) => (
                <div key={`${category}-${index}`} className="flex items-center">
                  <span
                    onClick={() =>
                      setSelectedCategory(
                        category === selectedCategory ? null : category
                      )
                    }
                    className={`text-xs cursor-pointer duration-300 font-medium whitespace-nowrap ${
                      category === selectedCategory
                        ? "text-[#d1182b] font-bold"
                        : "text-[#333] hover:text-[#000]"
                    }`}
                  >
                    {category}
                  </span>
                  {index < categories.length - 1 && (
                    <span className="mx-1">/</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* دسته‌بندی‌ها در حالت دسکتاپ */}
        <div className="hidden lg:flex items-center gap-3">
          {categories.map((category, index) => (
            <div key={`${category}-${index}`} className="flex items-center">
              <span
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? null : category
                  )
                }
                className={`text-sm cursor-pointer duration-300 font-medium ${
                  category === selectedCategory
                    ? "text-[#d1182b] font-bold"
                    : "text-[#333] hover:text-[#000]"
                }`}
              >
                {category}
              </span>
              {index < categories.length - 1 && <span className="mx-2">/</span>}
            </div>
          ))}
        </div>

        {/* دکمه نمایش همه در دسکتاپ */}
        <div
          onClick={() => {
            router.push(`/products?orderby=2`);
          }}
          className="hidden lg:flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
        >
          <span>نمایش همه</span>
          <FaCaretLeft />
        </div>
      </div>
      <div className="mt-5">
        <ProductMain products={filteredProducts} />
      </div>

      <div className="hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className=" relative group w-full sm:min-h-[22rem] overflow-hidden rounded-xl bg-white shadow-md"
          >
            {/* تصویر */}
            <Link
              href={product.url}
              className="w-full min-h-40 sm:min-h-56 flex items-center justify-center bg-[#fff] overflow-hidden relative"
            >
              <Image
                className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-contain ${
                  product?.statusId !== 1 && product?.conditionId === 20
                    ? "blur-xs"
                    : ""
                }`}
                src={getImageUrl(product.image)}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                unoptimized
              />
              {/* لیبل کالای کارکرده */}
              {product.conditionId === 20 && (
                <div className="absolute top-2 right-2 bg-[#fff] border border-[#d1182b] text-[#d1182b] px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold z-10 animate-fade-in">
                  {/* <FaRecycle className="ml-1 text-base" /> */}
                  کالای کارکرده
                </div>
              )}
              {/* فروخته شد*/}
              {product?.statusId !== 1 && product?.conditionId === 20 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full select-none z-10">
                  <img
                    draggable="false"
                    className="w-36"
                    src="/public/images/soldout.png"
                    alt=""
                  />
                </div>
              )}
            </Link>
            {/* محتوا */}
            <div className="flex flex-col flex-1 justify-between mt-2">
              {/* عنوان */}
              <Link
                href={product.url}
                className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer min-h-[70px] flex items-start"
              >
                <h3 className="text-justify line-clamp-3 w-full">
                  {product.title}
                </h3>
              </Link>
              <Divider style={{ margin: 5, padding: 0 }} />

              {/* قیمت */}
              <div className="h-[4.5rem] px-2 duration-300">
                {!product.callPriceButton && product.finalPrice !== 0 && (
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300 group-hover:text-lg ">
                      {product.finalPrice.toLocaleString()} تومان
                    </span>
                    {product.discount !== 0 && (
                      <span className="text-[#333a] font-semibold text-sm line-through">
                        {product.price1.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
                {!product.callPriceButton && product.finalPrice === 0 && (
                  <span className="font-bold text-base text-[#333]">
                    بدون قیمت
                  </span>
                )}
                {product.callPriceButton && (
                  <span className="font-bold text-base text-[#333]">
                    تماس بگیرید
                  </span>
                )}
              </div>
            </div>
            {/* تخفیف */}
            {product.discount !== 0 && (
              <div className="absolute top-3 left-3 z-50 duration-300">
                <span className="bg-[#d1182b] !text-white rounded-md px-3 py-1 ">
                  {product.discount}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default NewProduct;
