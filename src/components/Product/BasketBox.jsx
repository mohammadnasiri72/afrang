"use client";

import { Divider } from "antd";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FaRecycle, FaTruck, FaTruckFast } from "react-icons/fa6";
import { IoIosUmbrella } from "react-icons/io";
import { useSelector } from "react-redux";
import CompareButton from "../common/CompareButton";
import PriceProduct from "../ProductList/PriceProduct";
import CartActions from "./CartActions";
import LikeProduct from "./LikeProduct";
import NotifyAvailable from "./NotifyAvailable";
import Warranties from "./Warranties";

function BasketBox({ product }) {
  
  const { currentItems } = useSelector((state) => state.cart);
  const isInCart = currentItems?.some(
    (item) => item.productId === product?.product?.productId
  );
  const [insuranceSelected, setInsuranceSelected] = useState([]);
  const [warrantySelected, setWarrantySelected] = useState(
    product?.warranty?.warrantyWays?.length > 0
      ? product.warranty.warrantyWays[0]
      : {}
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  let filteredArray = [];

  useEffect(() => {
    filteredArray = currentItems.filter((item1) =>
      product.insurance.insuranceWays.some(
        (item2) => item2.id === item1.productId
      )
    );
  }, [currentItems, product]);

  useEffect(() => {
    const childCurrentItems = currentItems.filter(
      (e) => e.parentId === product?.product?.productId
    );
    if (childCurrentItems.length > 0) {
      setInsuranceSelected(filteredArray);
    } else {
      setInsuranceSelected([]);
    }
  }, [product, currentItems]);

  const insur = currentItems.find(
    (e) => e.parentId === product?.product?.productId
  );

  const selectedColor = useSelector(
    (state) => state.productColor.selectedColorMode
  );

  return (
    <div className="px-2 h-full">
      <div className="bg-[#f6f6f6] h-full rounded-lg p-2">
        <h4 className="font-bold text-[#333]">اطلاعات محصول</h4>
        {product.warranty.warrantyWays &&
          mounted &&
          product.warranty.warrantyWays.length > 0 && (
            <Warranties
              warrantiesArray={product.warranty.warrantyWays}
              disabled={isInCart}
              warrantySelected={warrantySelected}
              setWarrantySelected={setWarrantySelected}
            />
          )}

        <Divider style={{ padding: 0, margin: "10px" }} />
        <div className="flex items-center gap-1 flex-wrap w-full">
          <div className="w-full">
            <CompareButton id={product?.product?.productId} />
          </div>
          <div className="w-full">
            <LikeProduct productId={product?.product?.productId} />
          </div>
        </div>
        {/* افزودن بیمه */}
        {insuranceSelected?.length > 0 &&
          insuranceSelected.map((insurance) => (
            <div
              key={insurance.id}
              className="flex justify-between px-1 mt-1 items-center bg-blue-50 rounded-md py-2 text-blue-700 border border-blue-200"
            >
              <div className="flex items-center gap-1  ">
                <IoIosUmbrella className="text-blue-500 text-base" />
                <span className="text-xs font-semibold">{insurance.title}</span>
              </div>
              <div className="font-semibold text-xs flex items-center gap-1">
                <span>{insurance.finalPrice.toLocaleString()}</span>
                <span>تومان</span>
              </div>
            </div>
          ))}
        {/* قابلیت خرید قسطی */}
        {product?.product?.isInstallmentSale && (
          <div className="flex items-center gap-2 px-1 mt-1 bg-blue-50 rounded-md py-1 pr-2 text-blue-700 border border-blue-200">
            <FaCreditCard className="text-blue-500 text-base" />
            <span className="text-xs font-semibold">
              امکان خرید قسطی این محصول فعال است
            </span>
          </div>
        )}
        <div className="flex items-center gap-3 px-1 mt-3">
          {product?.product?.fastShipping && (
            <div className="flex items-center gap-2  text-[#d1182b]">
              <FaTruckFast className="" />
              <span className="text-xs font-semibold"> ارسال سریع </span>
            </div>
          )}
          {product?.product?.freeShipping && (
            <div className="flex items-center gap-2  text-[#d1182b]">
              <FaTruck className="" />
              <span className="text-xs font-semibold"> ارسال رایگان </span>
            </div>
          )}
          {product?.product.conditionId === 20 && (
            <div className="flex items-center gap-2 px-1 text-[#d1182b]">
              <FaRecycle className=" " />
              <span className="text-xs font-semibold"> کالای کارکرده</span>
            </div>
          )}
        </div>

        {/* نمایش رنگ انتخاب شده */}
        {selectedColor && (
          <div className="flex items-center gap-2 my-2 px-1">
            <span
              className="w-6 h-6 rounded-full border border-gray-300 inline-block"
              style={{
                backgroundColor: (() => {
                  try {
                    return (
                      JSON.parse(selectedColor.files || "{}").Color || "#eee"
                    );
                  } catch {
                    return "#eee";
                  }
                })(),
              }}
            ></span>
            <span className="text-xs font-semibold text-gray-700">
              {selectedColor.propertyValue}
            </span>
          </div>
        )}

        <PriceProduct product={product?.product} />
        {product?.inventory?.inventorySetting?.showInventory && (
          <div>
            {
              <span className="text-[#d1182b] font-semibold whitespace-nowrap">
                تنها{" "}
                <span className="text-lg font-bold px-1">
                  {product?.inventory?.inventoryQtyForView}
                </span>{" "}
                عدد در انبار افرنگ باقی مانده
              </span>
            }
          </div>
        )}
        <div className="sm:block hidden">
          {mounted && (
            <CartActions
              product={product}
              warrantySelected={warrantySelected}
            />
          )}
        </div>
        {product?.product?.statusId !== 1 &&
          product?.product?.conditionId !== 20 && (
            <NotifyAvailable id={product?.product?.productId} />
          )}
      </div>
    </div>
  );
}

export default BasketBox;
