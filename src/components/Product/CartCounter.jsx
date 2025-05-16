'use client';

import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import { updateCart } from '@/services/cart/cartService';
import { fetchCart } from '@/redux/slices/cartSlice';
import Cookies from "js-cookie";

const CartCounter = ({ quantity, productId, cartId }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { cartType } = useSelector((store) => store.cart);
  const userId = JSON.parse(Cookies.get("user"))?.userId;

  const handleIncrement = async () => {
    try {
      await updateCart(cartId, 1, userId);
      dispatch(fetchCart(cartType));
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      try {
        await updateCart(cartId, -1, userId);
        dispatch(fetchCart(cartType));
      } catch (error) {
        console.error('Failed to decrement:', error);
      }
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
              onClick={() => setShowDeleteModal(true)}
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

      <DeleteProductModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        cartId={cartId}
        cartType={cartType}
      />
    </>
  );
};

export default CartCounter; 