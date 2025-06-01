"use client";
import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

function SecondHandProduct({ oldProducts }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  // استخراج دسته‌بندی‌های یکتا از محصولات و محدود کردن به 5 تا
  const categories = oldProducts
    ? [...new Set(oldProducts.map(product => product.categoryTitle))].slice(0, 5)
    : [];

  useEffect(() => {
    if (oldProducts) {
      if (selectedCategory) {
        const filtered = oldProducts.filter(product => product.categoryTitle === selectedCategory);
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(oldProducts);
      }
    }
  }, [selectedCategory, oldProducts]);

  return (
    <>
      <div className="sm:px-16 px-2">
        {/* بخش موبایل */}
        <div className="lg:hidden w-full">
          {/* هدر دسته‌بندی‌ها */}
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold text-gray-700">دسته‌بندی‌ها</h3>
            <button
              onClick={() => {
                router.push(`/products?conditionId=20&orderby=2`);
              }}
              className="flex items-center gap-1 text-[#d1182b] hover:text-[#d1182b]/80 transition-colors cursor-pointer"
            >
              <span className="text-sm">نمایش همه</span>
              <FaCaretLeft className="text-sm" />
            </button>
          </div>

          {/* لیست دسته‌بندی‌ها */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max px-2">
              {categories.map((category, index) => (
                <div key={category} className="flex items-center">
                  <span
                    onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    className={`text-sm cursor-pointer duration-300 font-medium whitespace-nowrap ${category === selectedCategory
                        ? 'text-[#d1182b] font-bold'
                        : 'text-[#0008] hover:text-[#000]'
                      }`}
                  >
                    {category}
                  </span>
                  {index < categories.length - 1 && <span className="mx-2">/</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center sm:px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="title-SecondHand relative text-[#222] duration-300 text-lg font-semibold">
              دست دوم های پیشنهاد افــــرنـــــگ
            </button>
          </div>

          {/* دسته‌بندی‌ها در حالت دسکتاپ */}
          <div className="hidden lg:flex items-center gap-3">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center">
                <span
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`text-sm cursor-pointer duration-300 font-medium ${category === selectedCategory
                      ? 'text-[#d1182b] font-bold'
                      : 'text-[#0008] hover:text-[#000]'
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
              router.push(`/products?conditionId=20&orderby=2`);
            }}
            className="hidden lg:flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
        </div>
        <div className="mt-10">
          <ProductMain products={filteredProducts} />
        </div>
      </div>
    </>
  );
}

export default SecondHandProduct;
