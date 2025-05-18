'use client';

import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../../services/cart/cartService';
import { fetchCartData } from '@/redux/slices/cartSlice';
import CartCounter from './CartCounter';
import SuccessModal from './SuccessModal';
import Cookies from "js-cookie";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

function CartActions({ product, selectedWarranty }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cartItem = items?.find(item => item.productId === product.id);

  const handleAddToCart = async () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      const initialData = {
        token: "",
        refreshToken: "",
        expiration: "",
        userId: generateRandomUserId(),
        displayName: "",
        roles: [],
      };
      Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
    }

    const userId = JSON.parse(Cookies.get("user"))?.userId;

    try {
      await addToCart(product.id, selectedWarranty, userId);
      dispatch(fetchCartData());
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        {product.canAddCart ? (
          cartItem ? (
            <div className="flex flex-col justify-center items-center">
              <Link 
                href="/cart" 
                className="h-full flex items-center bg-[#40768c] text-white rounded-sm hover:bg-[#2f5a6a] transition-all duration-300 group px-5 py-2"
              >
                <div className="flex items-center gap-2">
                  <FaShoppingBasket className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">سبد خرید</span>
                </div>
              </Link>
              <CartCounter 
                quantity={cartItem.quantity} 
                productId={product.id} 
                cartId={cartItem.id}
                onSuccess={() => {
                  dispatch(fetchCartData());
                  setShowSuccessModal(true);
                }}
              />
              
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="flex items-center bg-[#d1182b] text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm"
            >
              <FaCartShopping className="" />
              <span className="">افزودن به سبد خرید</span>
            </button>
          )
        ) : (
          <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm">
            <FaCartShopping className="text-[#333]" />
            <span className="text-[#666]">موجود نیست</span>
          </button>
        )}
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </>
  );
}

export default CartActions; 