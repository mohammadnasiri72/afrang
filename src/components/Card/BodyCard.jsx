"use client";

import { updateCart } from "@/redux/slices/cartSlice";
import { addToCartNext, getCart, getNextCart, moveToCurrentCart } from "@/services/cart/cartService";
import { getImageUrl } from "@/utils/mainDomain";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArchive } from "react-icons/bs";
import { FaAngleLeft, FaShoppingCart } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { LuMailbox } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import CartCounter from "../Product/CartCounter";

const BodyCard = () => {
  const dispatch = useDispatch();
  const { items, cartType } = useSelector((state) => state.cart);
  const token = JSON.parse(Cookies.get("user"))?.token;
  const router = useRouter();
  const [loadingItemId, setLoadingItemId] = useState(null);

  // محاسبه قیمت‌ها با چک کردن وجود فیلدها
  const totalPrice =
    items?.reduce((sum, item) => {
      const price = item.price1 || 0;
      const quantity = item.quantity || 0;
      return sum + price * quantity;
    }, 0) || 0;

  const totalDiscount =
    items?.reduce((sum, item) => {
      const oldPrice = item.price1 || 0;
      const price = item.finalPrice || 0;
      const quantity = item.quantity || 0;
      return sum + (oldPrice - price) * quantity;
    }, 0) || 0;

  const compeletePay = () => {
    if (!token) {
      router.push("/login?from=card");
    } else {
      router.push("/cart/infosend");
    }
  };

  const handleAddToNextCart = async (id) => {
    try {
      setLoadingItemId(id);
      await addToCartNext(id);
      const userId = JSON.parse(Cookies.get("user"))?.userId;
      const response = await getCart(userId);
      dispatch(updateCart({ items: response, cartType }));
    } catch (error) {
      console.error("Error adding to next cart:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleMoveToCurrentCart = async (id) => {
    try {
      setLoadingItemId(id);
      await moveToCurrentCart(id);
      const userId = JSON.parse(Cookies.get("user"))?.userId;
      const response = cartType === 'next'
        ? await getNextCart(userId)
        : await getCart(userId);
      dispatch(updateCart({ items: response, cartType }));
    } catch (error) {
      console.error("Error moving to current cart:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const renderCartCounter = (item) => {
    if (cartType === 'next') {
      return (
        <div className="flex items-center justify-center mt-2 text-gray-600">
          <span className="text-sm">تعداد: {item.quantity}</span>
        </div>
      );
    }

    return (
      <CartCounter
        quantity={item.quantity}
        productId={item.productId}
        cartId={item.id}
      />
    );
  };

  const renderActionButton = (item) => {
    const isLoading = loadingItemId === item.id;
    const buttonProps = cartType === 'next'
      ? {
        onClick: () => !isLoading && handleMoveToCurrentCart(item.id),
        text: isLoading ? "در حال انتقال..." : "برگشت به سبد خرید",
      }
      : {
        onClick: () => !isLoading && handleAddToNextCart(item.id),
        text: isLoading ? "در حال افزودن..." : "افزودن به سبد خرید بعدی",
      };

    return (
      <div
        onClick={buttonProps.onClick}
        className={`cursor-pointer text-[#d1182b] text-xs font-semibold flex items-center gap-2 whitespace-nowrap ${isLoading ? 'opacity-50' : 'hover:opacity-80'}`}
      >
        {isLoading ? (
          <>
            <Spin className="custom-spin" size="small" />
            <span>{buttonProps.text}</span>
          </>
        ) : (
          <>
            <span>{buttonProps.text}</span>
            <FaAngleLeft />
          </>
        )}
      </div>
    );
  };



  return (
    <div className="flex flex-wrap">
      {items?.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className="text-4xl text-[#d1182b] mb-4">
            <FaShoppingCart />
          </div>
          <h2 className="text-2xl font-semibold text-[#333] mb-2">
            {cartType === 'next' ? 'لیست خرید بعدی' : 'سبد خرید'} شما خالی است
          </h2>
          <p className="text-[#666]">
            برای مشاهده محصولات به صفحه اصلی مراجعه کنید
          </p>
        </div>
      ) : (
        <>
          <div className="lg:w-3/4 w-full">
            <div className="flex flex-col gap-5">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-sm p-3 flex flex-wrap border-b-4 border-[#d1182b] relative z-50"
                >
                  <div className="sm:w-1/4 w-full flex flex-col justify-between">
                    <img
                      style={{ filter: " brightness(0.8)" }}
                      className="w-full rounded-lg min-h-32 object-contain"
                      src={getImageUrl(item.image)}
                      alt={item?.title}
                    />
                    <div className="mt-5">

                      {renderCartCounter(item)}
                    </div>
                  </div>
                  <div className="sm:w-3/4 w-full px-4 py-2 relative flex flex-col justify-between">


                    <div>

                      <h3 className="font-semibold text-lg text-[#333] mb-3">
                        {item.title}
                      </h3>
                      {item.warranty && (
                        <div className="flex items-center mt-2">
                          <BsArchive className="text-[#666]" />
                          <span className="px-2 text-[13px]">
                            {item.warranty}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center mt-2">
                        <GoShieldCheck className="text-[#666]" />
                        <span className="px-2 text-[13px]">
                          ضمانت اصل بودن کالا
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <LuMailbox className="text-[#666]" />
                        <span className="px-2 text-[13px]">
                          ارسال از 3 روز کاری دیگر
                        </span>
                      </div>
                    </div>
                    <div>

                      {item.discount !== 0 && (
                        <div className="mt-3">
                          <span className="bg-[#d1182b] px-3 py-1 rounded-sm text-white font-bold">
                            {item.discount}٪
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          {item.discount !== 0 && (
                            <div className="flex items-center">
                              <span className="font-semibold text-[#666] text-lg line-through">
                                {item.price1.toLocaleString()}
                              </span>
                              <span className="px-2 text-xs text-[#666]">
                                قیمت قبل ازتخفیف
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="font-semibold text-xl">
                              {item.finalPrice.toLocaleString()}
                            </span>
                            <span className="px-2 text-xs">تومان </span>
                          </div>
                        </div>
                        {renderActionButton(item)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {cartType === 'current' && (
            <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
              <div className="bg-[#ececec] p-3 rounded-lg">
                <div className="flex justify-between text-[#444] py-1">
                  <span>قیمت کالاها ({items?.length || 0})</span>
                  <span>{totalPrice.toLocaleString()}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#444] py-1">
                    <span>سود شما از این خرید</span>
                    <span>{totalDiscount.toLocaleString()}</span>
                  </div>
                )}
                <hr className="border-[#6666] my-3" />
                <div className="flex justify-between py-1">
                  <span className="font-semibold">جمع سبد خرید</span>
                  <div className="flex items-center">
                    <span className="font-semibold px-1 text-xl">
                      {(totalPrice - totalDiscount).toLocaleString()}
                    </span>
                    <span>تومان</span>
                  </div>
                </div>
                <button
                  onClick={compeletePay}
                  className="w-full flex justify-center items-center gap-2 text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
                >
                  <FaShoppingCart />
                  <span>پرداخت و تکمیل خرید</span>
                </button>
              </div>
              <p className="text-[#444]">
                این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله رزرو
                آنها نمی‌باشد.
              </p>
            </div>
          )}
        </>
      )}
      <style jsx global>{`
        .custom-spin .ant-spin-dot-item {
          background-color: #d1182b !important;
        }
      `}</style>
    </div>
  );
};

export default BodyCard;
