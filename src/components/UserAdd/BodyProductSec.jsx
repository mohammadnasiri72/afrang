import { Alert } from "antd";
import Link from "next/link";
import { FaCalendarDays } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import BoxTabDetailsProduct from "./BoxTabDetailsProduct";

function BodyProductSec({ product }) {
  // تابع تبدیل قیمت به فرمت قابل خواندن
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // تابع تبدیل تاریخ شمسی به فرمت بهتر
  const formatDate = (dateString) => {
    if (!dateString) return "نامشخص";
    return dateString;
  };

  console.log(product?.modifiedFa?.split(" ")[0]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center flex-wrap justify-between mb-2">
            <h1 className="sm:text-2xl text-lg font-bold text-gray-900 line-clamp-1">
              {product.title}
            </h1>
            <span className="sm:text-sm text-xs text-gray-500 bg-gray-100 sm:px-3 px-2 py-1 rounded-full whitespace-nowrap">
              {product.categoryTitle}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            {(!product.price || product.price === 0) && (
              <span className="sm:text-2xl font-bold text-[#d1182b] whitespace-nowrap">
                توافقی (تماس بگیرید)
              </span>
            )}
            {product.price !== 0 && (
              <span className="sm:text-2xl font-bold text-[#d1182b] whitespace-nowrap">
                {formatPrice(product.price)} تومان
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-1">
            {product?.modifiedFa?.split(" ").length > 0 && (
              <div className="flex items-center gap-1 ">
                <FaCalendarDays className="text-[#555a]" />
                <span className="font-bold text-[#555a] text-xs">
                  {product?.modifiedFa?.split(" ")[0]}
                </span>
              </div>
            )}
            {product?.modifiedFa?.split(" ").length > 1 && (
              <div className="flex items-center gap-1">
                <MdTimer className="text-[#555a]" />
                <span className="font-bold text-[#555a] text-xs">
                  {product?.modifiedFa?.split(" ")[1]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              اطلاعات پایه
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">شماره سریال :</span>
                <span className="text-gray-900 font-semibold">
                  {product.serialNumber || "نامشخص"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">نوع محصول :</span>
                <span className="text-gray-900 font-semibold">
                  {product.type || "نامشخص"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">تاریخ خرید :</span>
                <span className="text-gray-900 font-semibold">
                  {formatDate(product.purchaseDate)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  تاریخ بروزرسانی آگهی :
                </span>
                <span className="text-gray-900 font-semibold">
                  {product?.modifiedFa?.split(" ").length > 0 &&
                   formatDate(product?.modifiedFa?.split(" ")[0])
                  }
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">مدت استفاده :</span>
                <span className="text-gray-900 font-semibold">
                  {product.usageTime || "نامشخص"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  کارکرد شاتر (فقط دوربین SLR) :
                </span>
                <span className="text-gray-900 font-semibold">
                  {product.usageCount || "نامشخص"}
                </span>
              </div>
            </div>
          </div>

          {/* Warranty & Insurance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              گارانتی و بیمه
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">گارانتی :</span>
                <span className="text-gray-900 font-semibold">
                  {product.warranty ? `${product.warranty} ماه` : "ندارد"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">بیمه :</span>
                <span className="text-gray-900 font-semibold">
                  {product.insurance ? `${product.insurance} ماه` : "ندارد"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Alert
          message=" لطفا قبل از انجام هرگونه معامله، قوانین خرید و فروش را مطالعه نمایید "
          description={
            <Link href="/usedrules">
              مشاهده قوانین خرید و فروش تجهیزات کارکرده و دست دوم.
            </Link>
          }
          type="warning"
          className="text-justify"
        />
        <BoxTabDetailsProduct product={product} />
      </div>
    </>
  );
}

export default BodyProductSec;
