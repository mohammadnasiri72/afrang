"use client";

import { Divider } from "antd";
import PriceProduct from "../ProductList/PriceProduct";
import CartActions from "./CartActions";
import Warranties from "./Warranties";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { FaTruck, FaTruckFast, FaRecycle } from "react-icons/fa6";

function BasketBox({ product }) {
  const { items } = useSelector((state) => state.cart);
  const isInCart = items?.some(item => item.productId === product.id);

  const warrantiesArray = Object.entries(product.warranties).map(
    ([value, label]) => ({ value: Number(value), label })
  );
  const [selectedWarranty, setSelectedWarranty] = useState(
    warrantiesArray[0]?.value || null
  );


  return (
    <div className="p-2 h-full">
      <div className="bg-[#f9f9f9] h-full rounded-lg p-7">
        <h4 className="font-bold text-[#333]">سبد خرید</h4>
        {warrantiesArray && warrantiesArray.length > 0 && (
          <Warranties
            selectedWarranty={selectedWarranty}
            setSelectedWarranty={setSelectedWarranty}
            warrantiesArray={warrantiesArray}
            disabled={isInCart}
          />
        )}

        <Divider />
        <div className="flex items-center gap-3 mt-3">
          <img src="/images/icons/benchmark.png" alt="" />
          <span className="text-sm text-[#333]"> مقایسه محصول </span>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <img src="/images/icons/fast-delivery-2.png" alt="" />
          <span className="text-sm text-[#333]"> ضمانت اصل بودن کالا </span>
        </div>

        {product.product.conditionId === 20 && (
          <div className="flex items-center gap-3 mt-6 text-[#888]">
            <FaRecycle className="text-xl " />
            <span className="text-sm font-bold"> کالای کارکرده</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {product.product.fastShipping && (
            <div className="flex items-center gap-3 mt-6 text-[#d1182b]">
              <FaTruckFast className="text-xl" />
              <span className="text-sm font-semibold"> ارسال سریع </span>
            </div>
          )}
          {product.product.freeShipping && (
            <div className="flex items-center gap-3 mt-6 text-[#d1182b]">
              <FaTruck className="text-xl" />
              <span className="text-sm font-semibold"> ارسال رایگان </span>
            </div>
          )}

        </div>



        <PriceProduct product={product.product} />
        {
          product?.inventory?.inventorySetting?.showInventory &&
          <div className="p-4">
            {(
              <span className="text-[#d1182b] font-semibold whitespace-nowrap">
                تنها <span className="text-lg font-bold px-1">{product?.inventory?.inventoryQtyForView}</span> عدد در انبار افرنگ
                باقی مانده
              </span>
            )}
          </div>
        }
        <CartActions product={product} selectedWarranty={selectedWarranty} />
      </div>
    </div>
  );
}

export default BasketBox;
