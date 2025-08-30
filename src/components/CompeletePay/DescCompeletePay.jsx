"use client";
import { setEstimateData } from "@/redux/slices/paymentSlice";
import { estimateOrder } from "@/services/order/orderService";
import { Switch } from "@headlessui/react";
import { message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function sumAmount(array) {
  return array.reduce((total, current) => total + current.amount, 0);
}

// کامپوننت اسکلتون برای نمایش در زمان لودینگ
const DescCompeletePaySkeleton = () => {
  return (
    <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
      <div className="bg-[#ececec] p-3 rounded-lg">
        {/* قیمت‌ها */}
        <div className="space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex justify-between items-center py-1">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          ))}
        </div>

        <hr className="border-[#6666] my-3" />

        {/* مبلغ نهایی */}
        <div className="bg-white p-3 rounded-lg mb-3">
          <div className="flex justify-center items-center flex-col gap-2">
            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
          </div>
        </div>

        {/* سوئیچ‌ها */}
        <div dir="ltr" className="space-y-3 mb-3">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-center justify-end gap-2">
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* دکمه پرداخت */}
        <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="mt-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
      </div>
    </div>
  );
};

export default function DescCompeletePay() {
  const { currentItems } = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedShipping = useSelector(
    (state) => state.shipping.selectedShipping
  );
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  const [amount, setAmount] = useState(0);
  const [needInvoice, setNeedInvoice] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [estimateData, setEstimateDataLocal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [stuckToBottom, setStuckToBottom] = useState(false);
  const [style, setStyle] = useState({});

  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setAmount(sumAmount(currentItems.filter((e) => e.parentId !== -1)));
  }, [currentItems]);

  const totalPrice =
    currentItems
      ?.filter((e) => e.parentId === -1)
      ?.reduce((sum, item) => {
        const price = item.price1 || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0) || 0;

  const totalDiscount =
    currentItems
      ?.filter((e) => e.parentId === -1)
      ?.reduce((sum, item) => {
        const oldPrice = item.price1 || 0;
        const price = item.finalPrice || 0;
        const quantity = item.quantity || 0;
        return sum + (oldPrice - price) * quantity;
      }, 0) || 0;

  const shippingCost = selectedShipping?.price
    ? parseInt(selectedShipping.price)
    : 0;
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
          paymentId: 0,
        };

        const response = await estimateOrder(data, token);
        if (response.type === "error") {
          message.error(response.message);
          setEstimateDataLocal(null);
          return;
        }
        setEstimateDataLocal(response);
      } catch (error) {
        message.error(
          error.response?.data ? error.response?.data : "خطای شبکه"
        );
        setEstimateDataLocal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [selectedAddress, selectedShipping, selectedLegal, token]);

  const handlePayment = () => {
    // چک کردن آدرس و روش ارسال قبل از رفتن به صفحه پرداخت
    if (!selectedAddress) {
      message.error("لطفاً ابتدا آدرس را انتخاب کنید");
      return;
    }

    if (!selectedShipping) {
      message.error("لطفاً ابتدا روش ارسال را انتخاب کنید");
      return;
    }

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

  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      // فقط در دسکتاپ فعال باشد
      if (window.innerWidth < 1024) return;
      if (!containerRef.current || !innerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const innerRect = innerRef.current.getBoundingClientRect();
      const stickyTop = 130; // مثل offsetTop قبلی Affix
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
      {loading ? (
        <DescCompeletePaySkeleton />
      ) : (
        <div ref={containerRef} className="relative lg:w-1/4 w-full z-50">
          <div
            ref={innerRef}
            style={fixed || stuckToBottom ? style : { position: "sticky" }}
            className="w-full lg:block hidden"
          >
            <div className="w-full lg:mt-0 mt-3">
              <div className="bg-[#ececec] p-3 rounded-lg ">
                <div className="flex justify-between text-[#444] py-1 font-bold">
                  <span>
                    قیمت کالاها (
                    {currentItems?.filter((e) => e.parentId === -1)?.length ||
                      0}
                    )
                  </span>
                  <span>
                    {estimateData?.productAmount
                      ? estimateData.productAmount.toLocaleString()
                      : (totalPrice + amount).toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#444] py-1 font-bold">
                    <span>سود شما از این خرید</span>
                    <span>
                      {estimateData?.discountAmount
                        ? estimateData.discountAmount.toLocaleString()
                        : totalDiscount.toLocaleString()}{" "}
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
                          : (finalPrice + amount).toLocaleString()}
                      </span>
                      <span className="mr-1">تومان</span>
                    </div>
                  </div>
                </div>

                {/* سوئیچ‌ها */}
                <div dir="ltr" className="space-y-3 mb-3">
                  <div className="flex items-center justify-end">
                    <span className="text-[#444] px-1">
                      درخواست فاکتور رسمی
                    </span>
                    <Switch
                      checked={needInvoice}
                      onChange={setNeedInvoice}
                      className={`${
                        needInvoice ? "bg-[#d1182b]" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
                    >
                      <span
                        className={`${
                          needInvoice ? "translate-x-1" : "translate-x-6"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-[#444] px-1">
                      قوانین و مقررات سایت را می‌پذیرم
                    </span>
                    <Switch
                      checked={acceptTerms}
                      onChange={setAcceptTerms}
                      className={`${
                        acceptTerms ? "bg-[#d1182b]" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
                    >
                      <span
                        className={`${
                          acceptTerms ? "translate-x-1" : "translate-x-6"
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
                  className={`w-full sm:flex hidden justify-center items-center gap-2 text-white ${
                    acceptTerms &&
                    selectedShipping &&
                    selectedAddress &&
                    !loading
                      ? "bg-[#d1182b] hover:bg-[#40768c] cursor-pointer"
                      : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
                  }  py-2 rounded-lg duration-300 mt-3`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaShoppingCart />
                      <span>تکمیل اطلاعات پرداخت</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[#444] mt-2">
                این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله رزرو
                آنها نمی‌باشد.
              </p>
            </div>
          </div>
          <div className="w-full lg:hidden block ">
            <div className="w-full lg:mt-0 mt-3">
              <div className="bg-[#ececec] p-3 rounded-lg ">
                <div className="flex justify-between text-[#444] py-1 font-bold">
                  <span>
                    قیمت کالاها (
                    {currentItems?.filter((e) => e.parentId === -1)?.length ||
                      0}
                    )
                  </span>
                  <span>
                    {estimateData?.productAmount
                      ? estimateData.productAmount.toLocaleString()
                      : (totalPrice + amount).toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#444] py-1 font-bold">
                    <span>سود شما از این خرید</span>
                    <span>
                      {estimateData?.discountAmount
                        ? estimateData.discountAmount.toLocaleString()
                        : totalDiscount.toLocaleString()}{" "}
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
                          : (finalPrice + amount).toLocaleString()}
                      </span>
                      <span className="mr-1">تومان</span>
                    </div>
                  </div>
                </div>

                {/* سوئیچ‌ها */}
                <div dir="ltr" className="space-y-3 mb-3">
                  <div className="flex items-center justify-end">
                    <span className="text-[#444] px-1">
                      درخواست فاکتور رسمی
                    </span>
                    <Switch
                      checked={needInvoice}
                      onChange={setNeedInvoice}
                      className={`${
                        needInvoice ? "bg-[#d1182b]" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
                    >
                      <span
                        className={`${
                          needInvoice ? "translate-x-1" : "translate-x-6"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-[#444] px-1">
                      قوانین و مقررات سایت را می‌پذیرم
                    </span>
                    <Switch
                      checked={acceptTerms}
                      onChange={setAcceptTerms}
                      className={`${
                        acceptTerms ? "bg-[#d1182b]" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
                    >
                      <span
                        className={`${
                          acceptTerms ? "translate-x-1" : "translate-x-6"
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
                  className={`w-full sm:flex hidden justify-center items-center gap-2 text-white ${
                    acceptTerms &&
                    selectedShipping &&
                    selectedAddress &&
                    !loading
                      ? "bg-[#d1182b] hover:bg-[#40768c] cursor-pointer"
                      : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
                  }  py-2 rounded-lg duration-300 mt-3`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaShoppingCart />
                      <span>تکمیل اطلاعات پرداخت</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[#444] mt-2">
                این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله رزرو
                آنها نمی‌باشد.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed sm:hidden block bottom-14 left-0 right-0 z-[50] bg-[#ececec]">
        {/* مبلغ نهایی */}
        <div className="bg-white p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">مبلغ قابل پرداخت:</span>
            <div className="flex items-center">
              <span className="font-bold text-2xl text-[#d1182b]">
                {estimateData?.finalAmount
                  ? estimateData.finalAmount.toLocaleString()
                  : finalPrice.toLocaleString()}
              </span>
              <span className="mr-1">تومان</span>
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
            className={`w-full flex justify-center items-center gap-2 text-white ${
              acceptTerms && selectedShipping && selectedAddress && !loading
                ? "bg-[#d1182b] hover:bg-[#40768c] cursor-pointer"
                : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
            }  py-2 rounded-lg duration-300 mt-3`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FaShoppingCart />
                <span>تکمیل اطلاعات پرداخت</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
