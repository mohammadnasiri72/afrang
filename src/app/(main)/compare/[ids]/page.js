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
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

const DynamicComparePage = () => {
  const router = useRouter();
  const params = useParams();
  const [compareProducts, setCompareProducts] = useState([]);
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catIds, setCatIds] = useState(0);


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
      if (scrollY <= parentRef?.current?.clientHeight - 200) {
        setAffixActive(true);
      } else {
        setAffixActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
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
          <div className="text-6xl text-gray-300 mb-4">⚖️</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            محصولی برای مقایسه یافت نشد
          </h1>
          <p className="text-gray-500 mb-6">
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

  // تعداد ستون‌های مقایسه (حداکثر ۴)
  const maxCompareColumns = 4;
  const columnsToShow =
    productIds.length < maxCompareColumns
      ? maxCompareColumns
      : productIds.length;

  const handleAddProduct = () => {
    setIsModalVisible(true);
  };

  return (
    <div
      ref={parentRef}
      className="min-h-screen bg-gray-50 py-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 z-50 relative">
        {/* اسکرول افقی واحد برای همه محصولات و ویژگی‌ها */}
        {affixActive && (
          <Affix offsetTop={0}>
            <div
              className={`flex  gap-6 pb-2 bg-white ${
                affixActive ? "items-end" : "items-start"
              }`}
            >
              {(() => {
                let addBoxRendered = false;
                const arr = Array.from({ length: columnsToShow }).map(
                  (_, idx) => {
                    const item = compareProducts[idx];
                    if (item) {
                      return (
                        <div
                          key={`${item.productId || item.id}-${idx}`}
                          className="bg-white rounded-lg shadow-lg w-72 min-w-[260px] flex flex-col items-center relative border border-gray-100"
                        >
                          {/* دکمه حذف */}
                          {compareProducts.length > 1 && (
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="absolute cursor-pointer top-2 left-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="حذف از مقایسه"
                            >
                              <FaTimes className="text-base" />
                            </button>
                          )}

                          {/* عکس و عنوان */}
                          <div className="w-full ">
                            <div className="flex flex-col items-center w-full">
                              <Link href={`/product/${item.productId}`}>
                                <Image
                                  src={
                                    getImageUrl(item.image) ||
                                    "/images/placeholder.jpg"
                                  }
                                  alt={item.title}
                                  width={100}
                                  height={100}
                                  className="rounded-lg object-cover"
                                  priority={false}
                                  unoptimized
                                />
                              </Link>
                              {/* <div className="w-full  ">
                          {affixActive ? (
                            <Affix offsetTop={105}>
                              <div
                                className="bg-white w-full p-3"
                                style={{
                                  position: affixActive ? "" : "static",
                                  top: affixActive ? 105 : "auto",
                                  width: "100%",
                                  zIndex: 10,
                                }}
                              >
                                <Link href={`/product/${item.productId}`}>
                                  <div className="font-bold mt-2 text-center text-sm !line-clamp-2 h-10 flex items-center justify-center text-black">
                                    {item.title}
                                  </div>
                                </Link>
                                <div className="font-bold text-center text-sm line-clamp-2 h-10 flex items-center justify-center">
                                  {item?.finalPrice?.toLocaleString()} تومان
                                </div>
                                <AddToCartButton productId={item.productId} />
                              </div>
                            </Affix>
                          ) : (
                            <div
                              className="bg-white w-full p-3"
                              style={{
                                position: affixActive ? "" : "static",
                                top: affixActive ? 105 : "auto",
                                width: "100%",
                                zIndex: 10,
                              }}
                            >
                              <Link href={`/product/${item.productId}`}>
                                <div className="font-bold mt-2 text-center text-sm !line-clamp-2 h-10 flex items-center justify-center text-black">
                                  {item.title}
                                </div>
                              </Link>
                              <div className="font-bold text-center text-sm line-clamp-2 h-10 flex items-center justify-center">
                                {item?.finalPrice?.toLocaleString()} تومان
                              </div>
                              <AddToCartButton productId={item.productId} />
                            </div>
                          )}
                        </div> */}
                              <div
                                className="bg-white w-full p-3"
                                style={{
                                  position: affixActive ? "" : "static",
                                  top: affixActive ? 0 : "auto",
                                  width: "100%",
                                  zIndex: 10,
                                }}
                              >
                                <Link href={`/product/${item.productId}`}>
                                  <div className="font-bold mt-2 text-center text-sm !line-clamp-2 h-10 flex items-center justify-center text-black">
                                    {item.title}
                                  </div>
                                </Link>
                                <div className="font-bold text-center text-sm line-clamp-2 h-10 flex items-center justify-center">
                                  {item?.finalPrice?.toLocaleString()} تومان
                                </div>
                                <AddToCartButton productId={item.productId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (
                      !addBoxRendered &&
                      productIds.length < maxCompareColumns
                    ) {
                      addBoxRendered = true;
                      return (
                        <div
                          key={`empty-add-box`}
                          className="bg-white rounded-lg shadow-lg p-4 w-72 min-w-[260px] flex flex-col items-center justify-center border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors relative"
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
                    } else {
                      return null;
                    }
                  }
                );
                return arr;
              })()}
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
          <div className="w-full " key={title}>
            <h4 className="text-lg pb-2 pr-5 text-teal-500 font-semibold">
              {title}
            </h4>
            <div className="w-full flex items-start gap-6  pb-2">
              {compareProducts.length > 0 &&
                compareProducts.map((item) => (
                  <span
                    key={item.id}
                    className=" h-10 w-72 px-3 min-w-[260px]  font-bold text-[#000c] relative"
                  >
                    <span className="bg-white shadow-lg border flex flex-col items-center justify-center border-gray-200 rounded-lg w-full h-full">
                      {
                        property?.filter(
                          (ev) =>
                            ev.title === title && ev.itemId === item.productId
                        )[0]?.propertyValue
                      }
                    </span>
                  </span>
                ))}
            </div>
            <Divider style={{ margin: 5, padding: 5 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicComparePage;
