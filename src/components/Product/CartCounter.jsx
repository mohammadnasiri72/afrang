'use client';

import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import { updateCart } from '@/services/cart/cartService';
import { fetchCartData } from '@/redux/slices/cartSlice';
import Cookies from "js-cookie";
import { useRouter, usePathname } from 'next/navigation';

const CartCounter = ({ quantity, cartId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { cartType } = useSelector((store) => store.cart);
  const userId = JSON.parse(Cookies.get("user"))?.userId;

  const handleIncrement = async () => {
    try {
      await updateCart(cartId, 1, userId);
      dispatch(fetchCartData(cartType));
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      try {
        await updateCart(cartId, -1, userId);
        dispatch(fetchCartData(cartType));
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
        <div className="flex items-center border border-[#d1182b] w-36 rounded-lg">
          <div className="w-1/3">
            <button
              onClick={handleIncrement}
              className="text-2xl text-[#d1182b] cursor-pointer font-semibold mx-auto flex justify-center w-full hover:text-red-700 transition-colors"
            >
              +
            </button>
          </div>
          <div className="w-1/3">
            <span className="text-xl font-bold text-center flex justify-center">{quantity}</span>
          </div>
          <div className="w-1/3">
            <button
              onClick={handleDecrement}
              disabled={quantity === 1}
              className={`text-2xl font-semibold mx-auto flex justify-center w-full transition-colors ${
                quantity === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#d1182b] cursor-pointer hover:text-red-700'
              }`}
            >
              -
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-2 text-[#d1182b] hover:bg-red-50 rounded-lg transition-colors cursor-pointer group relative"
        >
          <FaTrash className="text-lg" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
            <div className="bg-white text-gray-800 text-sm py-1.5 px-3 rounded-md shadow-lg border border-gray-100 whitespace-nowrap">
              حذف محصول
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
            </div>
          </div>
        </button>
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