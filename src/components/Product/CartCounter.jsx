'use client';

import { FaTrash } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { fetchCart } from '@/redux/slices/cartSlice';
import { updateCart, deleteCartItem } from '@/services/cart/cartService';
import { useState } from 'react';
import SuccessModal from './SuccessModal';
import Cookies from "js-cookie";

const CartCounter = ({ quantity, productId, cartId }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const userId = JSON.parse(Cookies.get("user"))?.userId
  const handleIncrement = async () => {
    try {
      await updateCart(cartId, 1 , userId);
      dispatch(fetchCart());
      // setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      try {
        await updateCart(cartId, -1 , userId);
        dispatch(fetchCart());
      } catch (error) {
        console.error('Failed to decrement:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCartItem(cartId , userId);
      dispatch(fetchCart());
    } catch (error) {
      console.error('خطا در حذف محصول:', error);
    }
  };

  return (
    <>
      <div className="flex items-center mt-2 border mx-auto border-[#d1182b] w-36 rounded-lg">
        <div className="w-1/3">
          <button
            onClick={handleIncrement}
            className="text-3xl text-[#d1182b] cursor-pointer font-semibold mx-auto flex justify-center w-full"
          >
            +
          </button>
        </div>
        <div className="w-1/3">
          <span className="text-2xl font-bold text-center flex justify-center">{quantity}</span>
        </div>
        <div className="w-1/3">
          {quantity === 1 ? (
            <button
              onClick={handleDelete}
              className="text-[#d1182b] flex justify-center items-center mx-auto cursor-pointer w-full"
            >
              <FaTrash />
            </button>
          ) : (
            <button
              onClick={handleDecrement}
              className="text-3xl text-[#d1182b] cursor-pointer font-semibold mx-auto flex justify-center w-full"
            >
              -
            </button>
          )}
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </>
  );
};

export default CartCounter; 