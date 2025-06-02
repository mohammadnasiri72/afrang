'use client';

import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addToCart } from '../../services/cart/cartService';
import { fetchCurrentCart } from '@/redux/slices/cartSlice';
import CartCounter from './CartCounter';
import SuccessModal from './SuccessModal';
import Cookies from "js-cookie";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import { getUserCookie, getUserId } from "@/utils/cookieUtils";
import { Spin } from 'antd';

function CartActions({ product, selectedWarranty }) {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.cart);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartItem = currentItems?.find(item => item.productId === product?.product?.productId);

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
      Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
    }

    const userId = JSON.parse(Cookies.get("user"))?.userId;

    try {
      setIsLoading(true);
      await addToCart(product?.product?.productId, selectedWarranty, userId);
      dispatch(fetchCurrentCart());
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        {product.canAddCart ? (
          cartItem ? (
            <div className="flex flex-col justify-center items-center">
              {/* <Link 
                href="/cart" 
                className="h-full flex items-center bg-[#40768c] text-white rounded-sm hover:bg-[#2f5a6a] transition-all duration-300 group px-5 py-2"
              >
                <div className="flex items-center gap-2">
                  <FaShoppingBasket className="text-lg group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">سبد خرید</span>
                </div>
              </Link> */}
              <CartCounter 
                quantity={cartItem.quantity} 
                cartId={cartItem.id}
                ctrl={product?.inventory?.inventorySetting?.showQtyControl ? false : true}
              />
              
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex items-center bg-[#d1182b] text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
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
            <span className="text-[#666]">{product?.product?.statusDesc}</span>
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