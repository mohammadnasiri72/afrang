'use client';

import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import DeleteProductModal from './DeleteProductModal';
import { updateCart } from '@/services/cart/cartService';
import { fetchCurrentCart, fetchNextCart } from '@/redux/slices/cartSlice';
import Cookies from "js-cookie";
import { useRouter, usePathname } from 'next/navigation';
import { getUserId } from "@/utils/cookieUtils";

const CartCounter = ({ quantity, cartId, ctrl }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { cartType } = useSelector((store) => store.cart);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  const handleIncrement = async () => {
    try {
      await updateCart(cartId, 1, userId);
      if (cartType === 'current') {
        dispatch(fetchCurrentCart());
      } else {
        dispatch(fetchNextCart());
      }
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      try {
        await updateCart(cartId, -1, userId);
        if (cartType === 'current') {
          dispatch(fetchCurrentCart());
        } else {
          dispatch(fetchNextCart());
        }
      } catch (error) {
        console.error('Failed to decrement:', error);
      }
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {
            <div className="flex items-center border border-[#d1182b] w-28 rounded-lg">
              <div className="w-1/3">
                <button disabled={ctrl}
                  onClick={handleIncrement}
                  className={`text-xl font-semibold mx-auto flex justify-center w-full transition-colors ${ctrl ? 'text-gray-300 cursor-not-allowed' : 'text-[#d1182b] cursor-pointer hover:text-red-700'}`}
                >
                  +
                </button>
              </div>
              <div className="w-1/3">
                <span className="text-lg font-bold text-center flex justify-center">{quantity}</span>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                {quantity === 1 ? (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-[#d1182b] cursor-pointer hover:text-red-700 p-0.5"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                ) : (
                  <button
                    onClick={handleDecrement}
                    disabled={ctrl}
                    className={`text-xl font-semibold mx-auto flex justify-center w-full transition-colors ${ctrl
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#d1182b] cursor-pointer hover:text-red-700'
                      }`}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          }
        </div>
      </div>
      {pathname !== '/cart' && (
        <button
          onClick={handleGoToCart}
          className="flex items-center justify-center gap-2 bg-[#d1182b] text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors w-full cursor-pointer"
        >
          <FaShoppingCart />
          <span>مشاهده سبد خرید</span>
        </button>
      )}

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