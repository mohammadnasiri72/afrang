"use client";

import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Divider, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';

// تابع chunkArray را خارج از کامپوننت تعریف کن
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function AccessoriesProduct({ product }) {
  const [accessoriesProductId, setAccessoriesProductId] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        if (product?.product?.relatedId) {
          const result = await getRelatedProductsByIdString(
            product?.product?.relatedId
          );
          setRelatedProducts(result || []);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [product?.product?.relatedId]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) {
    return (
      <div className="p-5 flex flex-wrap items-start">
        <div className="md:w-1/4 w-full border rounded-lg border-[#0003] p-3">
          <h5 className="font-semibold text-[18px]">دسته بندی محصولات مرتبط</h5>
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
              <Skeleton.Button
                active
                size="large"
                block
                className="mt-3"
                style={{ height: "48px", borderRadius: "4px" }}
              />
            </div>
          ))}
        </div>

        <div className="md:w-3/4 w-full md:px-5">
          <div className="flex flex-wrap md:-mt-3 w-full">
            {[1, 2, 3].map((item) => (
              <div key={item} className="md:w-1/2 lg:w-1/3 w-full">
                <div className="w-full p-3 relative h-full">
                  <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#0001] h-full flex flex-col">
                    <Skeleton.Image active className="!w-full !h-48" />
                    <div className="p-3">
                      <Skeleton active paragraph={{ rows: 2 }} />
                      <div className="mt-3">
                        <Skeleton.Button active block />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-[#f3f3f3] p-8 rounded-lg text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            محصول مرتبطی یافت نشد!
          </h2>
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
          <h5 className="font-semibold text-[18px]">دسته بندی محصولات مرتبط</h5>
          {categories.map((category, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  setAccessoriesProductId(index + 1);
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

        <div className="md:w-3/4 w-full md:px-5">
          {shouldUseSlider ? (
            <>
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className} custom-swiper-bullet"></span>`
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="custom-swiper cursor-grab"
              >
                {groupedProducts.map((group, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col w-full gap-2 min-h-[540px] pb-8">
                      {group.map((item, index) => (
                        <div key={index} className="w-full">
                          <div className="flex items-center gap-3 p-3 border border-gray-100 bg-white rounded-lg relative h-[96px] min-h-[96px] hover:bg-gray-50 transition-all">
                            <Link href={item.url} className="flex-shrink-0 w-20 h-20 relative overflow-hidden">
                              <img
                                className="object-contain w-20 h-20"
                                src={getImageUrl2(item.image)}
                                alt={item.title}
                              />
                            </Link>
                            <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                              <Link
                                href={item.url}
                                className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-2 text-sm mb-1"
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
                                  <span className="text-sm font-bold text-[#d1182b]">تماس بگیرید</span>
                                )}
                                {!item.callPriceButton && item.finalPrice === 0 && (
                                  <span className="text-sm font-bold text-[#d1182b]">بدون قیمت</span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between h-full ml-2">
                              {item.discount !== 0 && !item.callPriceButton && (
                                <span className="bg-[#d1182b] text-white rounded-md px-2 py-0.5 text-xs mb-1">
                                  {item.discount}%
                                </span>
                              )}
                              {item.canAddCart && (
                                <div className="mt-auto">
                                  <AddToCartButtonCard productId={item.productId} />
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
                <div key={index} className="w-full">
                  <div className="flex items-center gap-3 p-3 border border-gray-100 bg-white rounded-lg relative h-[96px] min-h-[96px] hover:bg-gray-50 transition-all">
                    <Link href={item.url} className="flex-shrink-0 w-20 h-20 relative overflow-hidden">
                      <img
                        className="object-contain w-20 h-20"
                        src={getImageUrl2(item.image)}
                        alt={item.title}
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                      <Link
                        href={item.url}
                        className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-2 text-sm mb-1"
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
                          <span className="text-sm font-bold text-[#d1182b]">تماس بگیرید</span>
                        )}
                        {!item.callPriceButton && item.finalPrice === 0 && (
                          <span className="text-sm font-bold text-[#d1182b]">بدون قیمت</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full ml-2">
                      {item.discount !== 0 && !item.callPriceButton && (
                        <span className="bg-[#d1182b] text-white rounded-md px-2 py-0.5 text-xs mb-1">
                          {item.discount}%
                        </span>
                      )}
                      {item.canAddCart && (
                        <div className="mt-auto">
                          <AddToCartButtonCard productId={item.productId} />
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
