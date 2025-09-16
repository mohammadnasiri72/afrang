"use client";

import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import AddToCartButtonCard from "../ProductList/AddToCartButtonCard";

async function BundleProducts({ product }) {

  const bundleProducts = await getRelatedProductsByIdString(product.bundle.products)



 

 

  if (!bundleProducts.length) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <FaBoxOpen className="text-8xl text-[#d1182b] opacity-80" />
          </div>
          <span className="text-2xl font-bold mb-4 text-gray-800">
            محصولات مرتبطی یافت نشد!
          </span>
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
              <div className="relative group overflow-hidden shadow-lg border border-[#0001] rounded-lg h-full flex flex-col">
                <Link href={item.url} className="flex-grow-0">
                  <img
                    className="group-hover:scale-110 scale-100 duration-1000 w-full h-48 object-contain"
                    style={{ filter: "brightness(0.95)" }}
                    // src={`${mainDomainImg}/${item.image}`}
                    src={getImageUrl2(item.image)}
                    alt={item.title}
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
                   

                    <div className="bg-[#d1182b] left-0 right-0 w-full flex justify-center items-center text-white cursor-pointer hover:bg-[#40768c] font-bold duration-300 sm:absolute relative bottom-0 sm:translate-y-[90%] group-hover:translate-y-[0%]">
                      <AddToCartButtonCard productId={item.productId} />
                    </div>
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
