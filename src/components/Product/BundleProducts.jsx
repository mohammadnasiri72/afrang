"use client";

import { getImageUrl2, mainDomainImg } from "@/utils/mainDomain";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { useEffect, useState } from "react";
import { getRelatedProductsByIdString } from "@/services/products/productService";
import { Skeleton } from "antd";
import { FaBoxOpen } from "react-icons/fa";

function BundleProducts({ product }) {
  const [bundleProducts, setBundleProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchBundleProducts = async () => {
      setLoading(true);
      if (product?.bundle?.products?.length) {
        // تبدیل آرایه productId ها به یک رشته با جداکننده کاما
        const productIds = product.bundle.products.map(item => item.productId).join(',');
        const products = await getRelatedProductsByIdString(productIds);
        setBundleProducts(products);
      }
      setLoading(false);
    };

    fetchBundleProducts();
  }, [product]);

  if (loading) {
    return (
      <div className="p-5">
        <div className="flex flex-wrap md:-mt-3 w-full">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="md:w-1/3 lg:w-1/4 w-full">
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
    );
  }

  if (!bundleProducts.length) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">محصولات مرتبطی یافت نشد!</h2>
          <p className="text-gray-600">
            در حال حاضر محصول مرتبطی برای این کالا وجود ندارد.
          </p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="p-5">
      <div className="flex flex-wrap md:-mt-3 w-full">
        {bundleProducts.map((item) => (
          <div key={item.id} className="md:w-1/3 lg:w-1/4 w-full">
            <div className="w-full p-3 relative h-full">
              {item.discount !== 0 && (
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
                    style={{ filter: "brightness(0.95)" }}
                    // src={`${mainDomainImg}/${item.image}`}
                    src={getImageUrl2(item.image)}
                    alt={'🚫'}
                  />
                </Link>

                <div className="flex-grow flex flex-col justify-between p-3">
                  <Link
                    href={item.url}
                    className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div>
                    {product.bundle.itemPricing && (
                      <div>
                        <div className="sm:flex hidden justify-between items-center mt-3 opacity-100 group-hover:opacity-0 duration-300">
                          <span className="font-bold text-lg text-[#333]">
                            {item.finalPrice?.toLocaleString()} تومان
                          </span>
                          {item.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through">
                              {item.price1?.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden flex justify-between items-center mt-3 duration-300">
                          <span className="font-bold text-lg text-[#333]">
                            {item.finalPrice?.toLocaleString()} تومان
                          </span>
                          {item.discount !== 0 && (
                            <span className="text-[#333a] font-semibold text-lg line-through">
                              {item.price1?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {product.bundle.itemCart && (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BundleProducts;
