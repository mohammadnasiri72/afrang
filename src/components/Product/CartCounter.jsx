"use client";

import { fetchCurrentCart, fetchNextCart } from "@/redux/slices/cartSlice";
import { updateCart } from "@/services/cart/cartService";
import { getUserId } from "@/utils/cookieUtils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DeleteProductModal from "./DeleteProductModal";

const CartCounter = ({ quantity, cartId,compare }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { cartType } = useSelector((store) => store.cart);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  const handleIncrement = async () => {   
setLoading(true)
    try {
      await updateCart(cartId, 1, userId);
      if (cartType === "current") {
        dispatch(fetchCurrentCart());
      } else {
        dispatch(fetchNextCart());
      }
    } catch (error) {
      console.error("Failed to increment:", error);
    }finally{
      setLoading(false)
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      setLoading2(true)
      try {
        await updateCart(cartId, -1, userId);
        if (cartType === "current") {
          dispatch(fetchCurrentCart());
        } else {
          dispatch(fetchNextCart());
        }
      } catch (error) {
        console.error("Failed to decrement:", error);
      }finally{
        setLoading2(false)
      }
    }
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-3  w-full">
      <div className="flex items-center gap-2">
        <div className="flex gap-2 w-full">
          {
            <div className="flex items-center border border-[#d1182b] w-28 rounded-lg">
              <div className="w-1/3">
                <button
                  disabled={loading}
                  onClick={handleIncrement}
                  className={`text-xl font-semibold mx-auto flex justify-center w-full transition-colors ${
                    loading
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#d1182b] cursor-pointer hover:text-red-700"
                  }`}
                >
                  +
                </button>
              </div>
              <div className="w-1/3">
                <span className="text-lg font-bold text-center flex justify-center">
                  {quantity}
                </span>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                {quantity === 1 ? (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="!text-[#d1182b] cursor-pointer hover:!text-red-700 p-0.5"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                ) : (
                  <button
                    onClick={handleDecrement}
                    disabled={loading2}
                    className={`text-xl font-semibold mx-auto flex justify-center w-full transition-colors ${
                      loading2
                        ? "!text-gray-300 cursor-not-allowed"
                        : "!text-[#d1182b] cursor-pointer hover:!text-red-700"
                    }`}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          }
          {pathname !== "/cart" && !compare && (
            <button
              onClick={handleGoToCart}
              className="flex items-center justify-center gap-2 bg-[#d1182b] hover:bg-[#40768c] !text-white py-2 px-4 rounded-sm transition-colors w-full cursor-pointer"
            >
              <FaShoppingCart />
              <span className="line-clamp-1"> سبد خرید</span>
            </button>
          )}
        </div>
      </div>

      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        cartId={cartId}
        cartType={cartType}
      />
    </div>
  );
};

export default CartCounter;
