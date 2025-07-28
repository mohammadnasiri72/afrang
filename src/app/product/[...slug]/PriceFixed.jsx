"use client";
import SuccessModal from '@/components/Product/SuccessModal';
import PriceProduct from '@/components/ProductList/PriceProduct';
import { fetchCurrentCart } from '@/redux/slices/cartSlice';
import { addToCart } from '@/services/cart/cartService';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

export default function PriceFixed({product}) {
    const { items, currentItems } = useSelector((state) => state.cart);
    const itemsArray = Array.isArray(currentItems) ? currentItems : [];
    const cartItem = itemsArray.find(item => item.productId === product?.product?.productId);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const warrantiesArray = Object.entries(product.warranties).map(
        ([value, label]) => ({ value: Number(value), label })
      );
      const [selectedWarranty, setSelectedWarranty] = useState(
        warrantiesArray[0]?.value || null
      );
    const dispatch = useDispatch();

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
    <div className="sm:hidden block fixed bottom-14 right-0 left-0 w-full !z-[50]">
            <div className="flex items-center justify-between bg-white shadow-lg rounded-xl px-3 border border-[#eee]">
              <div className="flex flex-col items-start">
                <span className=" font-bold text-[#d1182b]">
                  {product?.product?.price?.toLocaleString() || <PriceProduct product={product?.product} />}
                </span>
              </div>
              {product.canAddCart ? (
                cartItem ? (
                  <button
                    className="flex items-center bg-[#e1e1e1] text-[#666] px-5 py-2 rounded-lg font-semibold cursor-not-allowed opacity-70"
                    disabled
                  >
                    <FaCartShopping className="ml-2" />
                    در سبد خرید
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCartMobile}
                    disabled={isLoading}
                    className="flex !text-xs items-center bg-gradient-to-l from-[#d1182b] to-[#ff4d6d] text-white p-3 cursor-pointer rounded-lg font-bold shadow-md hover:scale-105 transition-all duration-200 gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                <button className="flex items-center bg-[#e1e1e1] text-[#666] px-5 py-2 rounded-lg font-semibold cursor-not-allowed">
                  <FaCartShopping className="ml-2" />
                  {product?.product?.statusDesc}
                </button>
              )}
            </div>
            <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
            <style jsx global>{`
            .custom-spin .ant-spin-dot-item {
              background-color: white !important;
            }
          `}</style>

          </div>
   </>
  );
} 