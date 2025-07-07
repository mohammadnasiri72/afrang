"use client";

import { fetchCartData } from "@/redux/slices/cartSlice";
import { addToCartNext, moveToCurrentCart } from "@/services/cart/CartServices";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArchive } from "react-icons/bs";
import { FaAngleLeft, FaRecycle, FaShoppingCart } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CartCounter from "../Product/CartCounter";

// کامپوننت اسکلتون برای نمایش در زمان لودینگ
const BodyCardSkeleton = () => {
  return (
    <div className="flex flex-wrap">
      <div className="lg:w-3/4 w-full">
        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-sm p-3 flex flex-wrap border-b-4 border-[#d1182b] relative z-50 animate-pulse"
            >
              <div className="sm:w-1/5 w-2/5 flex flex-col justify-between">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg" />
                </div>
                <div className="mt-5">
                  <div className="h-6 bg-gray-200 rounded w-20 mx-auto" />
                </div>
              </div>
              <div className="sm:w-4/5 w-3/5 px-4 py-2 relative flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
                <div>
                  <div className="flex justify-between items-center flex-wrap mt-4">
                    <div className="flex flex-col gap-2">
                      <div className="h-5 bg-gray-200 rounded w-24" />
                      <div className="h-7 bg-gray-200 rounded w-32" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
        <div className="bg-[#ececec] p-3 rounded-lg animate-pulse">
          <div className="flex justify-between py-1">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex justify-between py-1 mt-2">
            <div className="h-5 bg-gray-200 rounded w-28" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>
          <hr className="border-[#6666] my-3" />
          <div className="bg-white p-3 rounded-lg mb-3">
            <div className="flex justify-center items-center flex-col gap-2">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-8 bg-gray-200 rounded w-40" />
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg mt-3" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mt-3" />
      </div>
    </div>
  );
};

const BodyCard = () => {
  const dispatch = useDispatch();
  const { currentItems, nextItems, cartType, loading } = useSelector((state) => state.cart);
  const items = cartType === 'current' ? currentItems : nextItems;

  

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });


  const router = useRouter();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = getUserCookie();
    setToken(userData?.token || null);
  }, []);

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
      // ذخیره مسیر فعلی در localStorage
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push("/login");
    } else {
      router.push("/cart/infosend");
    }
  };

  const handleAddToNextCart = async (id) => {
    try {
      setLoadingItemId(id);
      const res = await addToCartNext(id);
      if (res.type === "error") {
        Toast.fire({
          icon: "error",
          text: res.message,
        });
        return;
      }
      dispatch(fetchCartData());
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response.data ? error.response.data : "خطای شبکه",
      });
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleMoveToCurrentCart = async (id) => {
    try {
      setLoadingItemId(id);
      const res = await moveToCurrentCart(id);
      if (res.type === "error") {
        Toast.fire({
          icon: "error",
          text: res.message,
        });
        return;
      }
      dispatch(fetchCartData());
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response.data ? error.response.data : "خطای شبکه",
      });
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

  if (loading) {
    return <BodyCardSkeleton />;
  }

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
                  <div className="sm:w-1/5 w-2/5 flex flex-col justify-between">
                    <div className="relative rounded-lg overflow-hidden">
                      <Link href={item.url}>
                        <Image
                          style={{ filter: " brightness(0.8)" }}
                          className="w-full h-full object-contain"
                          src={getImageUrl2(item.image)}
                          alt={item?.title}
                          width={150}
                          height={150}
                          unoptimized
                        />
                      </Link>
                      {item.discount !== 0 && (
                        <span className="absolute top-2 right-2 bg-[#d1182b] px-2 py-0.5 rounded-sm text-white text-xs font-bold">
                          {item.discount}٪
                        </span>
                      )}
                    </div>
                    <div className="mt-5">
                      {renderCartCounter(item)}
                    </div>
                  </div>
                  <div className="sm:w-4/5 w-3/5 px-4 py-2 relative flex flex-col justify-between">
                    <div>
                      <Link href={item.url}>
                        <h3 className="sm:font-semibold font-bold sm:text-lg text-sm text-[#333] mb-3 hover:text-[#d1182b] transition-colors duration-300">
                          {item.title}
                        </h3>
                      </Link>
                      {item.warranty && (
                        <div className="flex items-center mt-2">
                          <BsArchive className="text-[#666]" />
                          <span className="px-2 sm:text-[13px] text-xs">
                            {item.warranty}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center mt-2">
                        <GoShieldCheck className="text-[#666]" />
                        <span className="px-2 sm:text-[13px] text-xs">
                          ضمانت اصل بودن کالا
                        </span>
                      </div>
                      {item.conditionId === 20 && (
                        <div className="flex items-center text-sm text-[#d1182b] mt-2">
                          <FaRecycle className="ml-1.5" />
                          <span className="font-semibold">کالای کارکرده</span>
                        </div>
                      )}
                      {/* <div className="flex items-center mt-2">
                        <LuMailbox className="text-[#666]" />
                        <span className="px-2 sm:text-[13px] text-xs">
                          ارسال از 3 روز کاری دیگر
                        </span>
                      </div> */}
                    </div>
                    <div>
                      <div className="flex justify-between items-center flex-wrap">
                        <div className="flex flex-col py-3">
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
                <div className="bg-white p-3 rounded-lg mb-3">
                  <div className="flex justify-center items-center flex-col">
                    <span className="font-bold text-lg">جمع سبد خرید:</span>
                    <div className="flex items-center">
                      <span className="font-bold text-2xl text-[#d1182b]">
                        {(totalPrice - totalDiscount).toLocaleString()}
                      </span>
                      <span className="mr-1">تومان</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={compeletePay}
                  className="w-full flex justify-center items-center gap-2 text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
                >
                  <FaShoppingCart />
                  <span>تسویه حساب</span>
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

















