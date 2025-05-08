"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

function DescCompeletePay() {
  const { items } = useSelector((state) => state.cart);
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
  return (
    <>
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
            // onClick={compeletePay}
            className="w-full flex justify-center items-center gap-2 text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
          >
            <FaShoppingCart />
            <span>پرداخت و تکمیل خرید</span>
          </button>
        </div>
        <p className="text-[#444]">
          این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله رزرو آنها
          نمی‌باشد.
        </p>
      </div>
    </>
  );
}

export default DescCompeletePay;
