"use client";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

function BoxSellSec() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  console.log(productList);

  // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    const fetchProductsSec = async () => {
      setLoading(true);
      const data = {
        LangCode: "fa",
        CategoryIdArray: [],
        // Amount1: "",
        // Amount2: "",
        // IsActive: true,
        OrderBy: 1,
        OrderOn: 1,
        PageSize: 20,
        PageIndex: 1,
      };
      try {
        const productsData = await getUserAdSell(data);
        if (productsData.type === "error") {
          Toast.fire({
            icon: "error",
            title: productsData.message,
          });
          return;
        }
        setProductList(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsSec();
  }, []);

  // تابع تبدیل قیمت به فرمت قابل خواندن
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // کامپوننت محصول برای حالت لیست
  const ProductListItem = ({ product }) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            <Link href={product.url} className="hover:text-blue-600 transition-colors">
              {product.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.categoryTitle}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.price)} تومان
            </span>
            {product.appearance && (
              <span className="text-sm text-gray-500">{product.appearance}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // کامپوننت محصول برای حالت گرید
  const ProductGridItem = ({ product }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
        <Link href={product.url} className="hover:text-blue-600 transition-colors">
          {product.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 mb-2">{product.categoryTitle}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-green-600">
          {formatPrice(product.price)} تومان
        </span>
        {product.appearance && (
          <span className="text-xs text-gray-500">{product.appearance}</span>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with view toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">محصولات دست دوم</h2>
        
        {/* View toggle buttons */}
        <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="نمایش لیستی"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="نمایش گرید"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products container */}
      {productList.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">محصولی یافت نشد</h3>
          <p className="text-gray-600">در حال حاضر محصول دست دومی برای نمایش وجود ندارد.</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}>
          {productList.map((product) => (
            <div key={product.id}>
              {viewMode === "list" ? (
                <ProductListItem product={product} />
              ) : (
                <ProductGridItem product={product} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BoxSellSec;
