"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";
import { getProducts } from "@/services/products/productService";
import Swal from "sweetalert2";

// اسکلتون لودینگ
const NewProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* اسکلتون عنوان */}
      <div className="lg:hidden flex justify-center items-center pb-10">
        <div className="flex items-center title-newProduct relative">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* اسکلتون عنوان در دسکتاپ */}
        <div className="lg:flex hidden items-center title-newProduct relative">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
        </div>

        {/* اسکلتون بخش موبایل */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max px-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  {item < 5 && <span className="mx-2">/</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* اسکلتون دسته‌بندی‌ها در دسکتاپ */}
        <div className="hidden lg:flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center">
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
              {item < 5 && <span className="mx-2">/</span>}
            </div>
          ))}
        </div>

        {/* اسکلتون دکمه نمایش همه در دسکتاپ */}
        <div className="hidden lg:flex">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* اسکلتون محصولات */}
      <div className="mt-10">
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white rounded-lg p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
          {/* اسکلتون دکمه‌های ناوبری */}
          <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NewProduct() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});



  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const newProducts = await getProducts({
          page: 1,
          pageSize: 12,
          orderBy: "8",
        });

        if (newProducts.type === 'error') {
          Toast.fire({
            icon: "error",
            text: newProducts.message,
          });
          return;
        } else {
          setProducts(newProducts);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
      }
      finally {
        setLoading(false);
      }
    }
    fetchNewProducts()
  }, [])



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

  if (loading) {
    return <NewProductSkeleton />;
  }

  return (
    <>
      <div className="lg:hidden flex justify-center items-center pb-10">
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
            <h3 className="text-lg font-semibold text-gray-700">دسته‌بندی‌ها</h3>
            <button
              onClick={() => {
                router.push(`/products?orderby=2`);
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
            router.push(`/products?orderby=2`);
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
    </>
  );
}

export default NewProduct;
