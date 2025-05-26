"use client";
import { setOrderData } from '@/redux/slices/orderSlice';
import { estimateOrderSave } from '@/services/order/orderService';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { clearLegalState } from '@/redux/slices/legalIdSlice';
import { clearAddressState } from '@/redux/slices/addressSlice';
import { clearShippingState } from '@/redux/slices/shippingSlice';
import { clearPaymentState } from '@/redux/slices/paymentWaySlice';
import { fetchCartData } from '@/redux/slices/cartSlice';
import { message } from "antd";

function DescPayment({estimateData}) {
  const { currentItems, cartType } = useSelector((store) => store.cart);
  const [loading, setLoading] = useState(false);
  const selectedPayment = useSelector((state) => state.paymentWay.selectedPayment);
  const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  const router = useRouter();
  const dispatch = useDispatch();

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      const data = {
        langCode: "fa",
        addressId: selectedAddress.id,
        legalInfoId: selectedLegal?.id || 0,
        shipmentId: selectedShipping.id,
        discountCode: estimateData?.discountCode || "",
        paymentId: selectedPayment.id
      };

      const response = await estimateOrderSave(data, token);
      
      if (response) {
        dispatch(setOrderData(response));
        router.push(`/profile/orders?trackCode=${response}`);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.message || "خطا در ثبت سفارش",
        customClass: { container: "toast-modal" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
        <div className="bg-[#ececec] p-3 rounded-lg">
          <div className="flex justify-between text-[#444] py-1">
            <span>قیمت کالاها ({currentItems?.length || 0})</span>
            <span>{estimateData?.productAmount ? estimateData.productAmount.toLocaleString() : 0} تومان</span>
          </div>
          {estimateData?.discountAmount > 0 && (
            <div className="flex justify-between text-[#444] py-1">
              <span>سود شما از این خرید</span>
              <span>{estimateData?.discountAmount ? estimateData.discountAmount.toLocaleString() : 0} تومان</span>
            </div>
          )}
          {estimateData?.discountCodeAmount > 0 && (
            <div className="flex justify-between text-[#444] py-1">
              <span>کد تخفیف</span>
              <span>{estimateData?.discountCodeAmount ? estimateData.discountCodeAmount.toLocaleString() : 0} تومان</span>
            </div>
          )}
          {
            estimateData?.taxAmount > 0 &&
            <div className="flex justify-between text-[#444] py-1">
              <span>مالیات({estimateData?.taxPercent}%)</span>
              <span>{estimateData?.taxAmount ? estimateData.taxAmount.toLocaleString() : 0} تومان</span>
            </div>
          }
          {
            estimateData?.shipmentAmount > 0 &&
            <div className="flex justify-between text-[#444] py-1">
              <span>هزینه ارسال</span>
              <span>{estimateData?.shipmentAmount ? estimateData.shipmentAmount.toLocaleString() : 0} تومان</span>
            </div>
          }
          {
            !estimateData?.shipmentAmount &&
            <div className="flex justify-between text-[#444] py-1">
              <span>هزینه ارسال</span>
              <span>رایگان</span>
            </div>
          }

          {
            selectedShipping &&
            <div className="flex justify-between text-[#444] py-1">
              <span>روش ارسال</span>
              {selectedShipping ? (
                <span className="text-sm">
                  {selectedShipping.title}
                </span>
              ) : (
                <span className="text-sm">لطفاً یک روش ارسال انتخاب کنید</span>
              )}
            </div>
          }

          {
            estimateData?.shipmentDesc &&
            <div className="flex justify-between text-[#444] py-1">
              <span>توضیحات ارسال</span>
              <span>{estimateData?.shipmentDesc}</span>
            </div>
          }
         

          <hr className="border-[#6666] my-3" />

          {/* مبلغ نهایی */}
          <div className="bg-white p-3 rounded-lg mb-3">
            <div className="flex justify-center items-center flex-col">
              <span className="font-bold text-lg">مبلغ قابل پرداخت:</span>
              <div className="flex items-center">
                <span className="font-bold text-2xl text-[#d1182b]">
                  {estimateData?.finalAmount ? estimateData.finalAmount.toLocaleString() : 0}
                </span>
                <span className="mr-1">تومان</span>
              </div>
            </div>
          </div>

        
          <button
            onClick={() => {
              if (!selectedPayment) {
                message.warning("لطفاً روش پرداخت را انتخاب کنید");
              } else {
                handlePayment();
              }
            }}
            className={`w-full flex justify-center items-center gap-2 text-white ${!loading && selectedPayment
                ? "bg-[#d1182b] hover:bg-[#40768c] cursor-pointer"
                : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
              }  py-2 rounded-lg duration-300 mt-3`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FaShoppingCart />
                <span>پرداخت و تکمیل خرید</span>
              </>
            )}
          </button>
        </div>
        <p className="text-[#444] mt-2">
          این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله رزرو آنها
          نمی‌باشد.
        </p>
      </div>
    </>
  );
}

export default DescPayment;
