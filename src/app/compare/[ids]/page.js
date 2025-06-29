"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCompare, clearCompare } from "@/redux/features/compareSlice";
import { getImageUrl, getImageUrl2 } from "@/utils/mainDomain";
import { getProductListId } from "@/services/products/productService";
import { message } from "antd";
import { FaTrash, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const DynamicComparePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { compareItems } = useSelector((state) => state.compare);

  
  // State معمولی برای محصولات مقایسه
  const [compareProducts, setCompareProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // دریافت ID های محصولات از URL و decode کردن
  const productIds = params.ids
    ? decodeURIComponent(params.ids)
        .split(",")
        .map((id) => parseInt(id.trim()))
    : [];

  // دریافت محصولات از API
  useEffect(() => {
    
    const fetchProducts = async () => {
      if (productIds.length > 0) {
        setLoading(true);
        setError(null);

        try {
          const response = await getProductListId({ ids: productIds });
          if (response && response.length > 0) {
            setCompareProducts(response);
          } else {
            setCompareProducts([]);
          }
        } catch (err) {
          setError("خطا در دریافت محصولات");
        } finally {
          setLoading(false);
        }
      }else{
        setCompareProducts([]);
      }
    };

    fetchProducts();
  }, [params.ids]);

  const handleRemoveItem = (productId) => {
    // حذف از Redux
    dispatch(
      removeFromCompare(
        compareItems.find((ev) => ev.productId === productId)?.id
      )
    );

    // به‌روزرسانی URL
    const updatedIds = productIds.filter((id) => id !== productId);
    if (updatedIds) {
      const newUrl = `/compare/${updatedIds.join(",")}`;
      router.push(newUrl);
    }

    message.success("محصول از مقایسه حذف شد");
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    setCompareProducts([]);
    message.success("تمام محصولات از مقایسه حذف شدند");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-red-300 mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            خطا در بارگذاری
          </h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            href="/products"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            بازگشت به محصولات
          </Link>
        </div>
      </div>
    );
  }

  if (!compareProducts || compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center z-50 relative">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">⚖️</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            محصولی برای مقایسه یافت نشد
          </h1>
          <p className="text-gray-500 mb-6">
            محصولاتی را برای مقایسه انتخاب کنید
          </p>
          <Link
            href="/products"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  // ویژگی‌های قابل مقایسه بر اساس ساختار واقعی داده
  const comparisonFields = [
    { key: "image", label: "تصویر", type: "image" },
    { key: "title", label: "نام محصول", type: "text" },
    { key: "price1", label: "قیمت", type: "price" },
    { key: "finalPrice", label: "قیمت نهایی", type: "price" },
    { key: "discount", label: "تخفیف", type: "discount" },
    { key: "categoryTitle", label: "دسته‌بندی", type: "text" },
    { key: "summary", label: "توضیحات", type: "text" },
    { key: "statusDesc", label: "وضعیت", type: "status" },
    { key: "inventoryQty", label: "موجودی", type: "inventory" },
    { key: "fastShipping", label: "ارسال سریع", type: "boolean" },
    { key: "freeShipping", label: "ارسال رایگان", type: "boolean" },
    { key: "conditionId", label: "نوع کالا", type: "condition" },
    { key: "visit", label: "تعداد بازدید", type: "number" },
    { key: "comment", label: "تعداد نظرات", type: "number" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">مقایسه محصولات</h1>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash className="text-sm" />
            حذف همه
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    ویژگی
                  </th>
                  {compareProducts.map((item, index) => (
                    <th
                      key={item.id}
                      className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b relative"
                    >
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="absolute top-2 left-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                      <div className="text-xs text-gray-500 mb-2">
                        محصول {index + 1}
                      </div>
                      <div className="font-medium text-sm">{item.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">
                      {field.label}
                    </td>
                    {compareProducts.map((item) => (
                      <td
                        key={`${item.id}-${field.key}`}
                        className="px-4 py-3 text-center"
                      >
                        {field.type === "image" ? (
                          <div className="flex justify-center">
                            <Image
                              src={
                                getImageUrl2(item.image) ||
                                "/images/placeholder.jpg"
                              }
                              alt={item.title}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                              priority={false}
                              unoptimized
                            />
                          </div>
                        ) : field.type === "price" ? (
                          <div className="text-lg font-bold text-green-600">
                            {item[field.key]
                              ? `${item[field.key].toLocaleString()} تومان`
                              : "نامشخص"}
                          </div>
                        ) : field.type === "discount" ? (
                          <div className="text-sm">
                            {item.discount > 0 ? (
                              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                                {item.discount}%
                              </span>
                            ) : (
                              <span className="text-gray-500">بدون تخفیف</span>
                            )}
                          </div>
                        ) : field.type === "status" ? (
                          <div className="text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                item.statusId === 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.statusDesc}
                            </span>
                          </div>
                        ) : field.type === "inventory" ? (
                          <div className="text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                item.inventoryQty > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.inventoryQty} {item.inventoryUnit}
                            </span>
                          </div>
                        ) : field.type === "boolean" ? (
                          <div className="text-sm">
                            {item[field.key] ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">✗</span>
                            )}
                          </div>
                        ) : field.type === "condition" ? (
                          <div className="text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                item.conditionId === 20
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {item.conditionId === 20 ? "کارکرده" : "نو"}
                            </span>
                          </div>
                        ) : field.type === "number" ? (
                          <div className="text-sm text-gray-600">
                            {item[field.key] || 0}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            {item[field.key] || "نامشخص"}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicComparePage;
