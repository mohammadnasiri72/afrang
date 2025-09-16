"use client";

import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Divider, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";

// تابع chunkArray را خارج از کامپوننت تعریف کن
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function AccessoriesProduct({ product , relatedProducts}) {
  const [accessoriesProductId, setAccessoriesProductId] = useState(1);
  const productsSectionRef = useRef(null);

  

 

  // Get unique categories from relatedProducts
  const categories = [
    ...new Set(relatedProducts.map((item) => item.categoryTitle)),
  ];

  // Filter products based on selected category
  const filteredProducts = relatedProducts.filter(
    (item) => item.categoryTitle === categories[accessoriesProductId - 1]
  );

  // اسلایدر ستونی: هر اسلاید ۵ محصول زیر هم
  const groupSize = 5;
  const groupedProducts = chunkArray(filteredProducts, groupSize);
  const shouldUseSlider = filteredProducts.length > groupSize;

 

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-[#f3f3f3] p-8 rounded-lg text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <span className="text-2xl font-bold mb-4 text-gray-800">
            محصول مرتبطی یافت نشد!
          </span>
          <p className="text-gray-600">
            در حال حاضر محصول مرتبطی برای این کالا ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 flex flex-wrap items-start">
        <div className="md:w-1/4 w-full border rounded-lg border-[#0003] p-3">
          <span className="font-semibold text-[18px]">دسته بندی محصولات مرتبط</span>
          {categories.map((category, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  setAccessoriesProductId(index + 1);
                  if (window.innerWidth < 768 && productsSectionRef.current) {
                    const rect =
                      productsSectionRef.current.getBoundingClientRect();
                    const scrollTop =
                      window.pageYOffset || document.documentElement.scrollTop;
                    const top = rect.top + scrollTop - 150; // 100px بالاتر
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className={`flex items-center justify-between px-5 py-3 cursor-pointer mt-3 border rounded-sm ${
                  accessoriesProductId === index + 1
                    ? "bg-[#e8fbf9] border-[#18d1be]"
                    : "border-[#fff] hover:bg-gray-50"
                }`}
              >
                <span>{category}</span>
                <FaAngleLeft />
              </div>
              {index < categories.length - 1 && (
                <Divider style={{ margin: "0px", padding: "0px" }} />
              )}
            </div>
          ))}
        </div>

        <div ref={productsSectionRef} className="md:w-3/4 w-full md:px-5 mt-2">
          {shouldUseSlider ? (
            <>
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className} custom-swiper-bullet"></span>`,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="custom-swiper cursor-grab"
              >
                {groupedProducts.map((group, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col w-full min-h-[540px] pb-8 gap-2">
                      {group.map((item, index) => (
                        <div
                          key={index}
                          className="w-full border border-gray-200 rounded-lg"
                        >
                          <div className="flex  items-center gap-3 py-3   bg-white rounded-lg relative h-[120px] min-h-[96px] hover:bg-gray-50 transition-all">
                            <Link
                              href={item.url}
                              className="flex-shrink-0 w-20 h-20 relative overflow-hidden "
                            >
                              <img
                                className="object-contain w-20 h-20"
                                src={getImageUrl2(item.image)}
                                alt={item.title}
                              />
                            </Link>
                            <div className="flex-1  min-w-0 flex flex-col justify-between h-full">
                              <Link
                                href={item.url}
                                className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-3 text-sm mb-1"
                              >
                                {item.title}
                              </Link>
                              <div className="flex items-center gap-2 mt-auto">
                                {!item.callPriceButton &&
                                  item.finalPrice > 0 && (
                                    <>
                                      <span className="text-sm font-bold text-[#d1182b]">
                                        {item.finalPrice.toLocaleString()}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        تومان
                                      </span>
                                    </>
                                  )}
                                {item.callPriceButton && (
                                  <span className="text-sm font-bold text-[#d1182b]">
                                    تماس بگیرید
                                  </span>
                                )}
                                {!item.callPriceButton &&
                                  item.finalPrice === 0 && (
                                    <span className="text-sm font-bold text-[#d1182b]">
                                      بدون قیمت
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between h-full ml-2 ">
                              {item.discount !== 0 && !item.callPriceButton && (
                                <span className="bg-[#d1182b] text-white rounded-md px-2 py-0.5 text-xs mb-1">
                                  {item.discount}%
                                </span>
                              )}
                              {item.canAddCart && (
                                <div className="mt-auto sm:block hidden ">
                                  <AddToCartButtonCard
                                    productId={item.productId}
                                  />
                                </div>
                              )}
                              {!item.canAddCart && (
                                <div className="mt-auto flex items-center gap-1 text-xs text-[#666] bg-[#e1e1e1] px-2 py-1 rounded">
                                  <SlBasket className="text-base text-[#333]" />
                                  <span>{item.statusDesc}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {item.canAddCart && (
                            <div className="mt-auto sm:hidden block ">
                              <AddToCartButtonCard productId={item.productId} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <style jsx global>{`
                .custom-swiper {
                  cursor: grab;
                }
                .custom-swiper:active {
                  cursor: grabbing;
                }
                .custom-swiper .swiper-wrapper {
                  cursor: inherit;
                }
                .custom-swiper .swiper-pagination {
                  position: static;
                  margin-top: 24px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 8px;
                }
                .custom-swiper-bullet {
                  display: inline-block;
                  width: 12px;
                  height: 12px;
                  background: #000 !important;
                  border-radius: 999px;
                  transition: all 0.3s;
                  margin: 0 4px;
                  cursor: pointer;
                }
                .custom-swiper .swiper-pagination-bullet-active,
                .custom-swiper-bullet.swiper-pagination-bullet-active {
                  background: #d1182b !important;
                  width: 32px;
                  height: 12px;
                  border-radius: 999px;
                }
              `}</style>
            </>
          ) : (
            <div className="flex flex-col w-full gap-2">
              {filteredProducts.map((item, index) => (
                <div
                  key={index}
                  className="w-full border border-gray-200 rounded-lg"
                >
                  <div className="flex  items-center gap-3 py-3   bg-white rounded-lg relative h-[120px] min-h-[96px] hover:bg-gray-50 transition-all">
                    <Link
                      href={item.url}
                      className="flex-shrink-0 w-20 h-20 relative overflow-hidden "
                    >
                      <img
                        className="object-contain w-20 h-20"
                        src={getImageUrl2(item.image)}
                        alt={item.title}
                      />
                    </Link>
                    <div className="flex-1  min-w-0 flex flex-col justify-between h-full">
                      <Link
                        href={item.url}
                        className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-3 text-sm mb-1"
                      >
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-auto">
                        {!item.callPriceButton && item.finalPrice > 0 && (
                          <>
                            <span className="text-sm font-bold text-[#d1182b]">
                              {item.finalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">تومان</span>
                          </>
                        )}
                        {item.callPriceButton && (
                          <span className="text-sm font-bold text-[#d1182b]">
                            تماس بگیرید
                          </span>
                        )}
                        {!item.callPriceButton && item.finalPrice === 0 && (
                          <span className="text-sm font-bold text-[#d1182b]">
                            بدون قیمت
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full ml-2 ">
                      {item.discount !== 0 && !item.callPriceButton && (
                        <span className="bg-[#d1182b] text-white rounded-md px-2 py-0.5 text-xs mb-1">
                          {item.discount}%
                        </span>
                      )}
                      {item.canAddCart && (
                        <div className="mt-auto sm:block hidden ">
                          <AddToCartButtonCard productId={item.productId} />
                        </div>
                      )}
                      {!item.canAddCart && (
                        <div className="mt-auto flex items-center gap-1 text-xs text-[#333] bg-[#e1e1e1] px-2 py-1 rounded">
                          <SlBasket className="text-base text-[#333]" />
                          <span>{item.statusDesc}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {item.canAddCart && (
                    <div className="mt-auto sm:hidden block ">
                      <AddToCartButtonCard productId={item.productId} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AccessoriesProduct;
