"use client";

import AddProductToCompareModal from "@/components/compare/AddProductToCompareModal";
import Loading from "@/components/Loading";
import AddToCartButton from "@/components/ProductList/AddToCartButton";
import { getProductListId } from "@/services/products/productService";
import { getPropertyItem } from "@/services/Property/propertyService";
import { getImageUrl } from "@/utils/mainDomain";
import { Affix, Divider, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { FaTimes } from "react-icons/fa";
import ComparePageSkeleton from "./ComparePageSkeleton";

const DynamicComparePage = () => {
  const router = useRouter();
  const params = useParams();
  const [compareProducts, setCompareProducts] = useState([]);
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catIds, setCatIds] = useState(0);
  const [columnsCount, setColumnsCount] = useState(4);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (compareProducts.length > 0) {
      setCatIds(compareProducts[0].categoryId);
    }
  }, [compareProducts]);

  const parentRef = useRef(null);

  // دریافت ID های محصولات از URL و decode کردن
  const productIds = params.ids
    ? decodeURIComponent(params.ids)
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id))
    : [];

  const uniqueTitles = [...new Set(property.map((item) => item.title))];

  // تابع برای محاسبه تعداد ستون‌ها بر اساس عرض صفحه
  const updateColumnsCount = () => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    if (width < 768) {
      setColumnsCount(2); // موبایل: 2 ستون
    } else if (width < 1024) {
      setColumnsCount(3); // تبلت: 3 ستون
    } else {
      setColumnsCount(4); // دسکتاپ: 4 ستون
    }
  };

  useEffect(() => {
    updateColumnsCount();
    window.addEventListener("resize", updateColumnsCount);

    return () => {
      window.removeEventListener("resize", updateColumnsCount);
    };
  }, []);

  // به روز رسانی محصولات قابل نمایش بر اساس تعداد ستون‌ها
  useEffect(() => {
    setVisibleProducts(compareProducts.slice(0, columnsCount));
  }, [compareProducts, columnsCount]);

  // دریافت محصولات از API
  useEffect(() => {
    const fetchProducts = async () => {
      if (productIds.length > 0) {
        setLoading(true);
        setError(null);

        try {
          // گرفتن لیست محصولات
          const response = await getProductListId({ ids: productIds });
          if (Array.isArray(response)) {
            setCompareProducts(response);
            // بعد از گرفتن محصولات، اگر productIdها با URL فرق داشت، URL را اصلاح کن
            if (response.length !== productIds.length) {
              const fetchedIds = response
                .map((p) => p.productId)
                .filter(Boolean);
              const sortedFetchedIds = [...new Set(fetchedIds)].sort(
                (a, b) => a - b
              );
              const urlIds = [...new Set(productIds)].sort((a, b) => a - b);
              if (sortedFetchedIds.join(",") !== urlIds.join(",")) {
                const newUrl =
                  sortedFetchedIds.length > 0
                    ? `/compare/${sortedFetchedIds.join(",")}`
                    : "/compare";
                    router.push(newUrl);
                
              }
            }
          } else {
            setCompareProducts([]);
          }

          // گرفتن property ها
          const response2 = await getPropertyItem(productIds.join(","));
          if (Array.isArray(response2)) {
            setProperty(
              response2.filter((ev) => ev.propertyKey !== "related_videos")
            );
          } else {
            setProperty([]);
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

  // حذف محصول از URL
  const handleRemoveItem = (productId) => {
    const updatedIds = productIds.filter((id) => id !== productId);
    const newUrl =
      updatedIds.length > 0 ? `/compare/${updatedIds.join(",")}` : "/compare";

      router.push(newUrl);
   
    message.success("محصول از مقایسه حذف شد");
  };

  // کاستوم استیت برای کنترل فیکس بودن Affix
  const [affixActive, setAffixActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parentRef?.current?.clientHeight) {
        if (scrollY <= parentRef?.current?.clientHeight - 200) {
          setAffixActive(true);
        } else {
          setAffixActive(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // محاسبه تعداد ستون‌های مورد نیاز
  const showAddButton = visibleProducts.length < columnsCount;

  if (loading) {
    return <ComparePageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center overflow-hidden max-w-[1600px] mx-auto">
        <div className="text-center">
          <div className="text-6xl text-red-300 !mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-700 !mb-2">
            خطا در بارگذاری
          </h1>
          <p className="text-gray-500 !mb-6">{error}</p>
          <Link
            href="/products"
           
            className="bg-blue-500 !text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            بازگشت به محصولات
          </Link>
        </div>
      </div>
    );
  }

  if (!productIds || productIds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center z-50 relative">
        <div className="text-center">
          <div className="text-6xl text-gray-300 !mb-4">⚖️</div>
          <h1 className="text-2xl font-bold text-gray-700 !mb-2">
            محصولی برای مقایسه یافت نشد
          </h1>
          <p className="text-gray-500 !mb-6">
            محصولاتی را برای مقایسه انتخاب کنید
          </p>
          <Link
            href="/products"
            
            className="bg-blue-500 !text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  const handleAddProduct = () => {
    setIsModalVisible(true);
  };

  // محاسبه عرض هر ستون
  const columnWidth = `calc(${100 / columnsCount}% - 12px)`;

  return (
    <>
      <div
        ref={parentRef}
        className="min-h-screen bg-gray-50 py-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 z-50 relative">
          {/* اسکرول افقی واحد برای همه محصولات و ویژگی‌ها */}
          {affixActive && (
            <Affix offsetTop={0}>
              <div
                className={`flex gap-3 pb-2 bg-white ${
                  affixActive ? "items-end" : "items-start"
                }`}
              >
                {/* محصولات قابل نمایش */}
                {visibleProducts.map((item, idx) => (
                  <div
                    key={`${item.productId || item.id}-${idx}`}
                    className="bg-white rounded-lg shadow-lg flex flex-col items-center relative border border-gray-100 transition-all duration-200"
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                      flex: `0 0 ${columnWidth}`,
                    }}
                  >
                    {/* دکمه حذف */}
                    {compareProducts.length > 1 && (
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="absolute cursor-pointer top-2 left-2 !text-gray-400 hover:text-red-500 transition-colors z-10 bg-white rounded-full p-1 shadow-sm"
                        title="حذف از مقایسه"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    )}

                    {/* عکس و عنوان */}
                    <div className="w-full ">
                      <div className="flex flex-col items-center w-full p-3">
                        <Link
                          href={`/product/${item.productId}`}
                         
                          className="block w-full "
                        >
                          <div className="relative aspect-square w-full max-w-[100px] mx-auto ">
                            <Image
                              src={
                                getImageUrl(item.image) ||
                                "/images/placeholder.jpg"
                              }
                              alt={item.title}
                              fill
                              className="rounded-lg object-cover"
                              priority={false}
                              unoptimized
                            />
                          </div>
                        </Link>

                        <div
                          className="bg-white w-full mt-3"
                          style={{
                            position: affixActive ? "" : "static",
                            top: affixActive ? 0 : "auto",
                            width: "100%",
                            zIndex: 10,
                          }}
                        >
                          <Link
                            href={`/product/${item.productId}`}
                           
                          >
                            <div className="font-bold text-center text-xs sm:text-sm !line-clamp-2 min-h-[40px] flex items-center justify-center text-black leading-tight">
                              {item.title}
                            </div>
                          </Link>
                          <div className="font-bold text-center text-xs sm:text-sm line-clamp-2 min-h-[30px] flex items-center justify-center text-green-600 mt-1">
                            {item?.finalPrice?.toLocaleString()} تومان
                          </div>
                          <div className="mt-2 scale-90 transform origin-center h-10 overflow-hidden">
                            <AddToCartButton
                              productId={item.productId}
                              compare={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* دکمه اضافه کردن محصول */}
                {showAddButton && (
                  <div
                    className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors relative"
                    onClick={handleAddProduct}
                    title="اضافه کردن محصول به مقایسه"
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                      flex: `0 0 ${columnWidth}`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full py-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-100 !mb-2">
                        <span className="text-xl sm:text-2xl text-blue-500">
                          +
                        </span>
                      </div>
                      <div className="text-blue-600 font-bold text-xs text-center">
                        اضافه کردن محصول
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Affix>
          )}
          <AddProductToCompareModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            catIds={catIds}
          />
        </div>

        {/* ویژگی‌ها */}
        <div className="w-full mt-4 max-w-7xl mx-auto px-4">
          {uniqueTitles.map((title) => (
            <div className="w-full" key={title}>
              <h4 className="text-base sm:text-lg pb-2 pr-5 text-teal-500 font-semibold">
                {title}
              </h4>
              <div className="w-full flex gap-3 pb-2">
                {/* مقادیر ویژگی‌ها برای محصولات قابل نمایش */}
                {visibleProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0"
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                    }}
                  >
                    <span className="bg-white min-h-12 shadow-lg border p-2 sm:p-3 flex flex-col items-center justify-center border-gray-200 rounded-lg w-full text-center text-xs sm:text-sm break-words">
                      {property?.find(
                        (ev) =>
                          ev.title === title && ev.itemId === item.productId
                      )?.propertyValue || "---"}
                    </span>
                  </div>
                ))}

                {/* جای خالی برای دکمه اضافه کردن در صورت نیاز */}
                {showAddButton && (
                  <div
                    className="flex-shrink-0"
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                    }}
                  >
                    <div className="bg-transparent min-h-12 border-2 border-dashed border-gray-300 rounded-lg w-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        ---
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <Divider style={{ margin: 5, padding: 5 }} />
            </div>
          ))}
        </div>

        {/* نمایش تعداد محصولات hidden شده */}
        {compareProducts.length > visibleProducts.length && (
          <div className="w-full mt-6 max-w-7xl mx-auto px-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700 text-sm">
                <span className="font-bold">
                  {compareProducts.length - visibleProducts.length} محصول
                </span>{" "}
                دیگر برای مقایسه وجود دارد. برای مشاهده همه محصولات از دستگاه با
                صفحه بزرگتر استفاده کنید.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DynamicComparePage;
