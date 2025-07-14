"use client";

import { Divider } from "antd";
import PriceProduct from "../ProductList/PriceProduct";
import CartActions from "./CartActions";
import Warranties from "./Warranties";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTruck, FaTruckFast, FaRecycle } from "react-icons/fa6";
import CompareButton from "../common/CompareButton";
import { addToCart } from "../../services/cart/cartService";
import { fetchCurrentCart } from "@/redux/slices/cartSlice";
import SuccessModal from "./SuccessModal";
import Cookies from "js-cookie";
import { Spin } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import LikeProduct from "./LikeProduct";

function BasketBox({ product }) {
  const dispatch = useDispatch();
  const { items, currentItems } = useSelector((state) => state.cart);
  const isInCart = items?.some(
    (item) => item.productId === product?.product?.productId
  );
  const cartItem = currentItems?.find(
    (item) => item.productId === product?.product?.productId
  );

  const warrantiesArray = Object.entries(product.warranties).map(
    ([value, label]) => ({ value: Number(value), label })
  );
  const [selectedWarranty, setSelectedWarranty] = useState(
    warrantiesArray[0]?.value || null
  );

  // Mobile add to cart states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCartMobile = async () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      const initialData = {
        token: "",
        refreshToken: "",
        expiration: "",
        userId: null,
        displayName: "",
        roles: [],
      };
      Cookies.set("user", JSON.stringify(initialData), {
        expires: 7,
        path: "/",
      });
    }
    const userId = JSON.parse(Cookies.get("user"))?.userId;
    try {
      setIsLoading(true);
      await addToCart(product?.product?.productId, selectedWarranty, userId);
      dispatch(fetchCurrentCart());
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 h-full">
      <div className="bg-[#f6f6f6] h-full rounded-lg p-2">
        <h4 className="font-bold text-[#333]">سبد خرید</h4>
        {warrantiesArray && warrantiesArray.length > 0 && (
          <Warranties
            selectedWarranty={selectedWarranty}
            setSelectedWarranty={setSelectedWarranty}
            warrantiesArray={warrantiesArray}
            disabled={isInCart}
          />
        )}

        <Divider style={{ padding: 0, margin: "10px" }} />
        {/* <div className="flex items-center gap-3 mt-3">
          <img src="/images/icons/benchmark.png" alt="" />
          <span className="text-sm text-[#333]"> مقایسه محصول </span>
        </div> */}
        <div className="my-1">
          <CompareButton product={product?.product} />
        </div>
        <div className="my-1">
          <LikeProduct productId={product?.product?.productId} />
        </div>
        {/* <div className="flex items-center gap-3 mt-6">
          <img src="/images/icons/fast-delivery-2.png" alt="" />
          <span className="text-sm text-[#333]"> ضمانت اصل بودن کالا </span>
        </div> */}

        {product?.product.conditionId === 20 && (
          <div className="flex items-center gap-2 my-2 px-1 text-[#888]">
            <FaRecycle className=" " />
            <span className="text-xs font-bold"> کالای کارکرده</span>
          </div>
        )}

        <div className="flex items-center gap-3 px-1">
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
        </div>

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
          <CartActions product={product} selectedWarranty={selectedWarranty} />
        </div>
      </div>
    </div>
  );
}

export default BasketBox;
