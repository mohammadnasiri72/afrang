"use client";
import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState } from 'react';
import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";
import { useRouter } from "next/navigation";
import { getProductAction, getProductListId } from "@/services/products/productService";
import Swal from "sweetalert2";


// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

// اسکلتون لودینگ
const EidDiscountSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* اسکلتون عنوان */}
      <div className="lg:hidden flex justify-center items-center pb-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* اسکلتون عنوان در دسکتاپ */}
        <div className="lg:flex hidden items-center gap-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
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
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
    </div>
  );
};

export default function EidDiscount() {
  const [actionProducts, setActionProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();



  useEffect(() => {
    const fetchActionProducts = async () => {
      try {
        const actionProducts = await getProductAction();

        if (actionProducts.type === 'error') {
          Toast.fire({
            icon: "error",
            text: actionProducts.message,
          });
          return;
        } else if (actionProducts && actionProducts.length > 0) {
          setActionProducts(actionProducts[0]);
          const productList = await getProductListId({
            ids: actionProducts[0]?.productIds || []
          });
          setProducts(productList);
        } else {
          // اگر actionProducts خالی باشد، محصولات را خالی نگه می‌داریم
          setActionProducts({});
          setProducts([]);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
        // در صورت خطا، مقادیر پیش‌فرض تنظیم می‌کنیم
        setActionProducts({});
        setProducts([]);
      }
      finally {
        setLoading(false);
      }
    }
    fetchActionProducts()
  }, [])





  // استخراج دسته‌بندی‌های یکتا از محصولات و محدود کردن به 5 تا
  const categories = products.length > 0
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
    return <EidDiscountSkeleton />;
  }

  

  return (
    <>
      {
        filteredProducts.length>0 &&
        <div className="mt-5">
          <div className="lg:hidden flex justify-center items-center pb-3">
            <div className="flex items-center title-newProduct relative">
              <h2 className="font-semibold text-xl ">{actionProducts?.title || 'فروش ویژه'}</h2>
              {
                actionProducts?.image &&
                <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
              }
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="lg:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl ">{actionProducts?.title || 'محصولات ویژه'}</h2>
              {
                actionProducts?.image &&
                <img src={getImageUrl(actionProducts.image)} alt={actionProducts.id} />
              }
            </div>

            {/* بخش موبایل */}
            <div className="lg:hidden w-full">
              {/* هدر دسته‌بندی‌ها */}
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-lg font-semibold text-gray-700">دسته‌بندی‌ها</h3>
                <button
                  onClick={() => {
                    router.push(`/products?onlyfest=1&orderby=2`);
                  }}
                  className="flex items-center gap-1 text-[#d1182b] hover:text-[#d1182b]/80 transition-colors cursor-pointer"
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
                        onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        className={`text-xs cursor-pointer duration-300 font-medium whitespace-nowrap ${category === selectedCategory
                          ? 'text-[#d1182b] font-bold'
                          : 'text-[#0008] hover:text-[#000]'
                          }`}
                      >
                        {category}
                      </span>
                      {index < categories.length - 1 && <span className="mx-1">/</span>}
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
                router.push(`/products?onlyfest=1&orderby=2`);
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
      }

    </>

  );
}
