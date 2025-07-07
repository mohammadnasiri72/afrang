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

  console.log(compareProducts);

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
      } else {
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

  // تعداد ستون‌های مقایسه (حداکثر ۴)
  const maxCompareColumns = 4;
  const columnsToShow =
    compareProducts.length < maxCompareColumns
      ? maxCompareColumns
      : compareProducts.length;

  // هندل افزودن محصول جدید (می‌توانید این را به دلخواه خود پیاده‌سازی کنید)
  const handleAddProduct = () => {
    router.push("/products"); // یا یک modal باز کنید یا هر رفتار دلخواه
  };

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
        <div className="flex gap-6 overflow-x-auto">
          {/* ستون‌های محصولات و ستون‌های خالی */}
          {Array.from({ length: columnsToShow }).map((_, idx) => {
            const item = compareProducts[idx];
            if (item) {
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg p-4 w-1/4 flex flex-col items-center relative border border-gray-100"
                >
                  {/* دکمه حذف */}
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="absolute top-2 left-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="حذف از مقایسه"
                  >
                    <FaTimes className="text-base" />
                  </button>
                  {/* باکس عکس و عنوان */}
                  <Link href={`/product/${item.productId}`} className="w-full">
                    <div className="flex flex-col items-center cursor-pointer">
                      <Image
                        src={
                          getImageUrl2(item.image) || "/images/placeholder.jpg"
                        }
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                        priority={false}
                        unoptimized
                      />
                      <div className="font-bold mt-2 text-center text-sm line-clamp-2 h-10 flex items-center justify-center">
                        {item.title}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            } else {
              // ستون خالی برای افزودن محصول جدید
              return (
                <div
                  key={`empty-${idx}`}
                  className="bg-white rounded-lg shadow-lg p-4 min-w-[260px] flex flex-col items-center justify-center border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors relative"
                  onClick={handleAddProduct}
                  title="اضافه کردن محصول به مقایسه"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                      <span className="text-3xl text-blue-500">+</span>
                    </div>
                    <div className="text-blue-600 font-bold text-sm">
                      اضافه کردن محصول
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {comparisonFields.map((e) => (
          <div key={e.key} className="w-full ">
            <h4 className="text-lg text-teal-500 font-semibold">{e.label}</h4>
            <div className="w-full flex gap-6 ">
              {compareProducts.map((ev) => (
                <div
                  key={ev.id}
                  className="w-1/4 p-4 flex flex-col items-center relative font-semibold"
                >
                  {e.key === "price1"
                    ? ev.price1.toLocaleString() + " تومان "
                    : e.key === "finalPrice"
                    ? ev.finalPrice.toLocaleString() + " تومان "
                    : e.key === "discount"
                    ? " % " + ev.discount
                    : e.key === "categoryTitle"
                    ? ev.categoryTitle
                    : e.key === "summary"
                    ? ev.summary || "---"
                    : e.key === "statusDesc"
                    ? ev.statusDesc || "---"
                    : e.key === "inventoryQty"
                    ? ev.inventoryQty + " عدد " || "---"
                    : e.key === "fastShipping"
                    ? ev.fastShipping
                      ? "دارد"
                      : "ندارد"
                    : e.key === "freeShipping"
                    ? ev.freeShipping
                      ? "دارد"
                      : "ندارد"
                    : e.key === "conditionId"
                    ? ev.conditionId === 10
                      ? "نو"
                      : ev.conditionId === 20
                      ? "دسته دوم"
                      : ""
                    : e.key === "visit"
                    ? ev.visit + ' بازدید '
                    :  e.key === "comment"
                    ? ev.comment + ' نظر '
                    : ""}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicComparePage;
