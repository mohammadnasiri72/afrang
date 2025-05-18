"use client";
import { FaCaretLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { mainDomainImg } from "@/utils/mainDomain";
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

  const getImageUrl = (image) => {
    if (!image) return defaultImage;
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^\.\.\//, '')}`;
    } catch (error) {
      return defaultImage;
    }
  };

  return (
    <>
      <div className="sm:hidden flex justify-center items-center pb-10">
        <div className="flex items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">{actionProducts.title}</h2>
          {
            actionProducts.image &&
            <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
          }
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="sm:flex hidden items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">{actionProducts.title}</h2>
          {
            actionProducts.image &&
            <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
          }
        </div>
        <div className="flex items-center gap-3">
          {categories.map((category, index) => (
            <div key={category} className="flex items-center">
              <span
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={`text-lg cursor-pointer duration-300 font-medium ${category === selectedCategory
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
        <div
          onClick={() => setSelectedCategory(null)}
          className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
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
