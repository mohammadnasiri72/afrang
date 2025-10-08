"use client";

import { fetchCurrentCart } from "@/redux/slices/cartSlice";
import { getUserCookie } from "@/utils/cookieUtils";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../services/cart/cartService";
import CartCounter from "./CartCounter";
import SuccessModal from "./SuccessModal";

function CartActions({ product, warrantySelected }) {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.cart);
  const selectedColor = useSelector(
    (state) => state.productColor.selectedColorMode
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure currentItems is always an array
  const itemsArray = Array.isArray(currentItems) ? currentItems : [];
  const cartItem = itemsArray.filter(
    (item) => item.productId === product?.product?.productId
    // &&
    //   (item.colorId === selectedColor?.id || !selectedColor)
  );

  useEffect(() => {
    const userData = getUserCookie();
    setUserId(userData?.userId || null);
  }, []);

  const handleAddToCart = async () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      const initialData = {
        token: "",
        refreshToken: "",
        expiration: "",
        userId,
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
      const response = await addToCart(
        product?.product?.productId,
        warrantySelected?.id ? warrantySelected?.id : -1,
        userId,
        1,
        selectedColor?.id
      );
      if (response) {
        dispatch(fetchCurrentCart());
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        {product.canAddCart ? (
          cartItem &&
          cartItem.length > 0 &&
          cartItem.filter((e) =>
            selectedColor ? e.colorId === selectedColor?.id : e
          ).length > 0 ? (
            <div className="flex flex-col justify-center items-center">
              <CartCounter
                quantity={
                 cartItem.filter((e) =>
            selectedColor ? e.colorId === selectedColor?.id : e
          )[0]
                    .quantity
                }
                cartId={
                 cartItem.filter((e) =>
            selectedColor ? e.colorId === selectedColor?.id : e
          )[0].id
                }
                ctrl={
                  product?.inventory?.inventorySetting?.showQtyControl
                    ? false
                    : true
                }
              />
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex items-center bg-[#d1182b] !text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spin className="custom-spin" size="small" />
                  <span>در حال افزودن...</span>
                </>
              ) : (
                <>
                  <FaCartShopping />
                  <span>افزودن به سبد خرید</span>
                </>
              )}
            </button>
          )
        ) : (
          <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm">
            <FaCartShopping className="text-[#333]" />
            <span className="!text-[#333]">{product?.product?.statusDesc}</span>
          </button>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <style jsx global>{`
        .custom-spin .ant-spin-dot-item {
          background-color: white !important;
        }
      `}</style>
    </>
  );
}

export default CartActions;
