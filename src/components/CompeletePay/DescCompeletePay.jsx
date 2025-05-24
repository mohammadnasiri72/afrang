"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { estimateOrder } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setEstimateData } from "@/redux/slices/paymentSlice";
import { message } from "antd";

export default function DescCompeletePay() {
  const { items } = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  
  const [needInvoice, setNeedInvoice] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [estimateData, setEstimateDataLocal] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  const router = useRouter();
  const dispatch = useDispatch();

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

  const shippingCost = selectedShipping?.price ? parseInt(selectedShipping.price) : 0;
  const finalPrice = totalPrice - totalDiscount + shippingCost;

  useEffect(() => {
    const fetchEstimate = async () => {
      if (!selectedAddress || !selectedShipping) {
        setEstimateDataLocal(null);
        return;
      }

      setLoading(true);
      try {
        const data = {
          langCode: "fa",
          addressId: selectedAddress.id,
          legalInfoId: selectedLegal?.id || 0,
          shipmentId: selectedShipping.id,
          discountCode: "",
          paymentId: 0
        };

        const response = await estimateOrder(data, token);
        setEstimateDataLocal(response);
      } catch (error) {
        console.error("Error fetching estimate:", error);
        setEstimateDataLocal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [selectedAddress, selectedShipping, selectedLegal, token]);

  const handlePayment = () => {
    if (estimateData) {
      try {
        const action = setEstimateData(estimateData);
        if (action) {
          dispatch(action);
          router.push("/cart/infopay");
        } else {
          console.error("Action is undefined");
        }
      } catch (error) {
        console.error("Error dispatching estimate data:", error);
      }
    } else {
      router.push("/cart/infopay");
    }
  };

  return (
    <>
      <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
        <div className="bg-[#ececec] p-3 rounded-lg">
          <div className="flex justify-between text-[#444] py-1">
            <span>قیمت کالاها ({items?.length || 0})</span>
            <span>{estimateData?.productAmount ? estimateData.productAmount.toLocaleString() : totalPrice.toLocaleString()} تومان</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between text-[#444] py-1">
              <span>سود شما از این خرید</span>
              <span>{estimateData?.discountAmount ? estimateData.discountAmount.toLocaleString() : totalDiscount.toLocaleString()} تومان</span>
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
                  {estimateData?.finalAmount ? estimateData.finalAmount.toLocaleString() : finalPrice.toLocaleString()}
                </span>
                <span className="mr-1">تومان</span>
              </div>
            </div>
          </div>

          {/* سوئیچ‌ها */}
          <div dir="ltr" className="space-y-3 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-[#444]">درخواست فاکتور رسمی</span>
              <Switch
                checked={needInvoice}
                onChange={setNeedInvoice}
                className={`${needInvoice ? 'bg-[#d1182b]' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
              >
                <span
                  className={`${needInvoice ? 'translate-x-1' : 'translate-x-6'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#444]">قوانین و مقررات سایت را می‌پذیرم</span>
              <Switch
                checked={acceptTerms}
                onChange={setAcceptTerms}
                className={`${acceptTerms ? 'bg-[#d1182b]' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
              >
                <span
                  className={`${acceptTerms ? 'translate-x-1' : 'translate-x-6'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          <button
            onClick={() => {
              if (!acceptTerms) {
                message.warning("لطفاً قوانین و مقررات سایت را بپذیرید");
              } else if (!selectedAddress) {
                message.warning("لطفاً آدرس خود را انتخاب کنید");
              } else if (!selectedShipping) {
                message.warning("لطفاً روش ارسال را انتخاب کنید");
              } else {
                handlePayment();
              }
            }}
            className={`w-full flex justify-center items-center gap-2 text-white ${acceptTerms && selectedShipping && selectedAddress && !loading
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
