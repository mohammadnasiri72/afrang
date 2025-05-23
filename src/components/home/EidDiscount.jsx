"use client";
import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState } from 'react';
import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";

export default function EidDiscount({ actionProducts, products }) {
  const defaultImage = "";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // استخراج دسته‌بندی‌های یکتا از محصولات و محدود کردن به 5 تا
  const categories = products
    ? [...new Set(products.map(product => product.categoryTitle))].slice(0, 5)
    : [];

  useEffect(() => {
    if (products) {
      if (selectedCategory) {
        const filtered = products.filter(product => product.categoryTitle === selectedCategory);
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [selectedCategory, products]);

 
  return (
    <>
      <div className="lg:hidden flex justify-center items-center pb-10">
        <div className="flex items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">{actionProducts.title}</h2>
          {
            actionProducts.image &&
            <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
          }
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="lg:flex hidden items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">{actionProducts.title}</h2>
          {
            actionProducts.image &&
            <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
          }
        </div>
        
        {/* بخش موبایل */}
        <div className="lg:hidden w-full">
          {/* هدر دسته‌بندی‌ها */}
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-lg font-semibold text-gray-700">دسته‌بندی‌ها</h3>
            <button
              onClick={() => setSelectedCategory(null)}
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
                    className={`text-base cursor-pointer duration-300 font-medium whitespace-nowrap ${
                      category === selectedCategory
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

        {/* دسته‌بندی‌ها در حالت دسکتاپ */}
        <div className="hidden lg:flex items-center gap-3">
          {categories.map((category, index) => (
            <div key={category} className="flex items-center">
              <span
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={`text-lg cursor-pointer duration-300 font-medium ${
                  category === selectedCategory
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
          onClick={() => setSelectedCategory(null)}
          className="hidden lg:flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
        >
          <span>نمایش همه</span>
          <FaCaretLeft />
        </div>
      </div>
      <div className="mt-10">
        <ProductMain products={filteredProducts} />
      </div>
    </>
  );
}
