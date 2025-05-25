"use client";

import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Divider, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";

function AccessoriesProduct({ product }) {
  const [accessoriesProductId, setAccessoriesProductId] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        if (product?.product?.relatedId) {
          const result = await getRelatedProductsByIdString(product?.product?.relatedId);
          setRelatedProducts(result || []);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product?.product?.relatedId]);

  // Get unique categories from relatedProducts
  const categories = [...new Set(relatedProducts.map(item => item.categoryTitle))];

  // Filter products based on selected category
  const filteredProducts = relatedProducts.filter(
    item => item.categoryTitle === categories[accessoriesProductId - 1]
  );



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
                style={{ height: '48px', borderRadius: '4px' }}
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">محصول مرتبطی یافت نشد!</h2>
          <p className="text-gray-600">
            در حال حاضر محصول مرتبطی برای این کالا ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-wrap items-start">
      <div className="md:w-1/4 w-full border rounded-lg border-[#0003] p-3">
        <h5 className="font-semibold text-[18px]">دسته بندی محصولات مرتبط</h5>
        {categories.map((category, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setAccessoriesProductId(index + 1);
              }}
              className={`flex items-center justify-between px-5 py-3 cursor-pointer mt-3 border rounded-sm ${accessoriesProductId === index + 1
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
        <div className="flex flex-wrap md:-mt-3 w-full">
          {filteredProducts.map((item, index) => (
            <div key={index} className="md:w-1/2 lg:w-1/3 w-full">
              <div className="w-full p-3 relative h-full">
                {item.discount !== 0 && !item.callPriceButton && (
                  <div className="absolute top-5 left-5 z-50 duration-300">
                    <span className="bg-[#d1182b] text-white rounded-md px-3 py-1">
                      {item.discount}%
                    </span>
                  </div>
                )}
                <div className="relative rounded-lg group overflow-hidden shadow-lg border border-[#0001] rounded-lg h-full flex flex-col">
                  <Link href={item.url} className="flex-grow-0">
                    <img
                      className="group-hover:scale-110 scale-100 duration-1000 w-full h-48 object-contain"
                      style={{ filter: " brightness(0.95)" }}
                      src={getImageUrl2(item.image)}
                      alt={item.title}
                    />
                  </Link>

                  <div className="flex-grow flex flex-col justify-between p-3">
                    <Link href={item.url} className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-2">
                      {item.title}
                    </Link>
                    <div>
                      {!item.callPriceButton && (
                        <div>
                          <div className="sm:flex hidden justify-between items-center mt-3 opacity-100 group-hover:opacity-0 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              {item.finalPrice} تومان
                            </span>
                            {item.discount !== 0 && (
                              <span className="text-[#333a] font-semibold text-lg line-through">
                                {item.price1}
                              </span>
                            )}
                          </div>
                          <div className="sm:hidden flex justify-between items-center mt-3 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              {item.finalPrice} تومان
                            </span>
                            {item.discount !== 0 && (
                              <span className="text-[#333a] font-semibold text-lg line-through">
                                {item.price1}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {!item.callPriceButton && item.finalPrice === 0 && (
                        <div>
                          <div className="sm:flex hidden justify-between items-center mt-3 opacity-100 group-hover:opacity-0 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              بدون قیمت
                            </span>
                          </div>
                          <div className="sm:hidden flex justify-between items-center mt-3 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              بدون قیمت
                            </span>
                          </div>
                        </div>
                      )}
                      {item.callPriceButton && (
                        <div>
                          <div className="sm:flex hidden justify-between items-center mt-3 opacity-100 group-hover:opacity-0 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              تماس بگیرید
                            </span>
                          </div>
                          <div className="sm:hidden flex justify-between items-center mt-3 duration-300">
                            <span className="font-bold text-lg text-[#333]">
                              تماس بگیرید
                            </span>
                          </div>
                        </div>
                      )}
                      {item.canAddCart && (
                        <div>
                          <div className="bg-teal-500 bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute cursor-pointer hover:bg-[#d1182b] font-bold">
                            <SlBasket className="text-xl" />
                            <span className="px-1">افزودن به سبد خرید</span>
                          </div>
                          <div className="bg-teal-500 bottom-0 left-0 right-0 overflow-hidden sm:hidden flex justify-center items-center py-2 text-white rounded-b-lg duration-300 cursor-pointer hover:bg-[#d1182b] font-bold">
                            <SlBasket className="text-xl" />
                            <span className="px-1">افزودن به سبد خرید</span>
                          </div>
                        </div>
                      )}
                      {!item.canAddCart && (
                        <div>
                          <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:flex hidden justify-center items-center py-2 text-white rounded-b-lg translate-y-[90%] group-hover:translate-y-0 duration-300 absolute font-bold cursor-default select-none">
                            <SlBasket className="text-xl text-[#333]" />
                            <span className="px-1 text-[#666]">موجود نیست</span>
                          </div>
                          <div className="bg-[#e1e1e1] bottom-0 left-0 right-0 overflow-hidden sm:hidden flex justify-center items-center py-2 text-white rounded-b-lg duration-300 font-bold cursor-default select-none">
                            <SlBasket className="text-xl text-[#333]" />
                            <span className="px-1 text-[#666]">موجود نیست</span>
                          </div>
                        </div>
                      )}
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

export default AccessoriesProduct;
