"use client";
import { setOrderData } from "@/redux/slices/orderSlice";
import { estimateOrderSave } from "@/services/order/orderService";
import { message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../Loading";

function DescPayment({ estimateData }) {
  const { currentItems, cartType } = useSelector((store) => store.cart);
  const descShipping = useSelector((state) => state.shipping.descShipping);
  const [loading, setLoading] = useState(false);
  const selectedPayment = useSelector(
    (state) => state.paymentWay.selectedPayment
  );
  const selectedShipping = useSelector(
    (state) => state.shipping.selectedShipping
  );
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

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
        paymentId: selectedPayment.id,
      };

      const response = await estimateOrderSave(data, token);

      if (response) {
        dispatch(setOrderData(response));
        startTransition(() => {
          router.push(`/profile/orders?trackCode=${response}`);
        });
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

  const [fixed, setFixed] = useState(false);
  const [stuckToBottom, setStuckToBottom] = useState(false);
  const [style, setStyle] = useState({});
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current || !innerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const innerRect = innerRef.current.getBoundingClientRect();
      const stickyTop = 130;
      if (containerRect.bottom <= stickyTop) {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      } else if (containerRect.bottom <= innerRect.height + stickyTop) {
        setFixed(false);
        setStuckToBottom(true);
        setStyle({
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: containerRect.width,
          zIndex: 100,
        });
      } else if (containerRect.top <= stickyTop) {
        setFixed(true);
        setStuckToBottom(false);
        setStyle({
          position: "fixed",
          top: stickyTop,
          left: containerRect.left,
          width: containerRect.width,
          zIndex: 100,
        });
      } else {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      }
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative lg:w-1/4 w-full z-50">
        <div
          ref={innerRef}
          style={fixed || stuckToBottom ? style : { position: "sticky" }}
          className="w-full lg:block hidden"
        >
          <div className="bg-[#ececec] p-3 rounded-lg">
            <div className="flex justify-between text-[#444] py-1 font-bold">
              <span>
                قیمت کالاها (
                {currentItems?.filter((e) => e.parentId === -1)?.length || 0})
              </span>
              <span>
                {estimateData?.productAmount
                  ? estimateData.productAmount.toLocaleString()
                  : 0}{" "}
                تومان
              </span>
            </div>
            {estimateData?.discountAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>سود شما از این خرید</span>
                <span>
                  {estimateData?.discountAmount
                    ? estimateData.discountAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.discountCodeAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>کد تخفیف</span>
                <span>
                  {estimateData?.discountCodeAmount
                    ? estimateData.discountCodeAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.walletIsActive && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>موجودی کیف پول</span>
                <span>
                  {estimateData?.walletAmount
                    ? estimateData.walletAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.taxAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>مالیات({estimateData?.taxPercent}%)</span>
                <span>
                  {estimateData?.taxAmount
                    ? estimateData.taxAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.shipmentAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>هزینه ارسال</span>
                <span>
                  {estimateData?.shipmentAmount
                    ? estimateData.shipmentAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {!estimateData?.shipmentAmount && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>هزینه ارسال</span>
                <span>رایگان</span>
              </div>
            )}

            {selectedShipping && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>روش ارسال</span>
                {selectedShipping ? (
                  <span className="text-sm">{selectedShipping.title}</span>
                ) : (
                  <span className="text-sm">
                    لطفاً یک روش ارسال انتخاب کنید
                  </span>
                )}
              </div>
            )}

            {/* {estimateData?.shipmentDesc && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>توضیحات ارسال</span>
                <span>{estimateData?.shipmentDesc}</span>
              </div>
            )} */}
            {descShipping?.freeShippingDesc && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span className="whitespace-nowrap">توضیحات ارسال</span>
                <span className="text-end">
                  {descShipping?.freeShippingDesc}
                </span>
              </div>
            )}

            <hr className="border-[#6666] my-3" />

            {/* مبلغ نهایی */}
            <div className="bg-white p-3 rounded-lg mb-3 sm:block hidden">
              <div className="flex justify-center items-center flex-col">
                <span className="font-bold text-lg">مبلغ قابل پرداخت:</span>
                <div className="flex items-center">
                  <span className="font-bold text-2xl text-[#d1182b]">
                    {estimateData?.finalAmount
                      ? estimateData.finalAmount.toLocaleString()
                      : 0}
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
              className={`w-full sm:flex hidden justify-center items-center gap-2 text-white ${
                !loading && selectedPayment
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
        <div className="w-full lg:hidden block p-4">
          <div className="bg-[#ececec] p-3 rounded-lg">
            <div className="flex justify-between text-[#444] py-1 font-bold">
              <span>
                قیمت کالاها (
                {currentItems?.filter((e) => e.parentId === -1)?.length || 0})
              </span>
              <span>
                {estimateData?.productAmount
                  ? estimateData.productAmount.toLocaleString()
                  : 0}{" "}
                تومان
              </span>
            </div>
            {estimateData?.discountAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>سود شما از این خرید</span>
                <span>
                  {estimateData?.discountAmount
                    ? estimateData.discountAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.discountCodeAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>کد تخفیف</span>
                <span>
                  {estimateData?.discountCodeAmount
                    ? estimateData.discountCodeAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.walletIsActive && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>موجودی کیف پول</span>
                <span>
                  {estimateData?.walletAmount
                    ? estimateData.walletAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.taxAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>مالیات({estimateData?.taxPercent}%)</span>
                <span>
                  {estimateData?.taxAmount
                    ? estimateData.taxAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {estimateData?.shipmentAmount > 0 && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>هزینه ارسال</span>
                <span>
                  {estimateData?.shipmentAmount
                    ? estimateData.shipmentAmount.toLocaleString()
                    : 0}{" "}
                  تومان
                </span>
              </div>
            )}
            {!estimateData?.shipmentAmount && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>هزینه ارسال</span>
                <span>رایگان</span>
              </div>
            )}

            {selectedShipping && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>روش ارسال</span>
                {selectedShipping ? (
                  <span className="text-sm">{selectedShipping.title}</span>
                ) : (
                  <span className="text-sm">
                    لطفاً یک روش ارسال انتخاب کنید
                  </span>
                )}
              </div>
            )}

            {estimateData?.shipmentDesc && (
              <div className="flex justify-between text-[#444] py-1 font-bold">
                <span>توضیحات ارسال</span>
                <span>{estimateData?.shipmentDesc}</span>
              </div>
            )}

            <hr className="border-[#6666] my-3" />

            {/* مبلغ نهایی */}
            <div className="bg-white p-3 rounded-lg mb-3 sm:block hidden">
              <div className="flex justify-center items-center flex-col">
                <span className="font-bold text-lg">مبلغ قابل پرداخت:</span>
                <div className="flex items-center">
                  <span className="font-bold text-2xl text-[#d1182b]">
                    {estimateData?.finalAmount
                      ? estimateData.finalAmount.toLocaleString()
                      : 0}
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
              className={`w-full sm:flex hidden justify-center items-center gap-2 text-white ${
                !loading && selectedPayment
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
        {/* نسخه موبایل */}
        <div className="fixed sm:hidden block bottom-10 left-0 right-0 z-[50] bg-[#ececec]">
          {/* مبلغ نهایی */}
          <div className="bg-white p-3 rounded-lg mb-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">مبلغ قابل پرداخت:</span>
              <div className="flex items-center">
                <span className="font-bold text-2xl text-[#d1182b]">
                  {estimateData?.finalAmount
                    ? estimateData.finalAmount.toLocaleString()
                    : 0}
                </span>
                <span className="mr-1">تومان</span>
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
              className={`w-full flex justify-center items-center gap-2 text-white ${
                !loading && selectedPayment
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
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default DescPayment;
