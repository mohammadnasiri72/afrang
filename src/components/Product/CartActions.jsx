'use client';

import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addToCart } from '../../services/cart/cartService';
import { fetchCart } from '@/redux/slices/cartSlice';
import CartCounter from './CartCounter';
import SuccessModal from './SuccessModal';
import Cookies from "js-cookie";

function CartActions({ product, selectedWarranty }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItem = items?.find(item => item.productId === product.id);
  console.log('Cart Items:', items);
  console.log('Current Product:', product.id);
  console.log('Found Cart Item:', cartItem);

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
      dispatch(fetchCart());
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
            <CartCounter 
              quantity={cartItem.quantity} 
              productId={product.id} 
              cartId={cartItem.id}
              onSuccess={() => {
                dispatch(fetchCart());
                setShowSuccessModal(true);
              }}
            />
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