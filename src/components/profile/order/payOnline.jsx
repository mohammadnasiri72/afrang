"use client";
import { changePayment, getWayPayment } from "@/services/order/orderService";
import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaCreditCard, FaExchangeAlt, FaTimes } from "react-icons/fa";

import Swal from "sweetalert2";

const redirectWithToken = (token, targetUrl) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = targetUrl;
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "token";
  input.value = token;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
};

export default function PayOnline({ orderData }) {
  const router = useRouter();
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  const param = useSearchParams();
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offlineLoading, setOfflineLoading] = useState(false);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        if (orderData?.order?.paymentId) {
          const response = await getWayPayment(orderData.order.paymentId);
          if (response) {
            // مرتب‌سازی درگاه‌ها بر اساس priority
            const sortedGateways = response
              .filter((gateway) => gateway.isActive && !gateway.deleted)
              .sort((a, b) => b.priority - a.priority);
            setGateways(sortedGateways);
          }
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGateways();
  }, [orderData?.order?.paymentId]);

  const handleChangeToOffline = async () => {
    try {
      setOfflineLoading(true);
      if (orderData?.order?.id) {
        const data = {
          orderId: orderData.order.id,
          paymentType: "Offline",
        };

        await changePayment(data, token);

        Toast.fire({
          icon: "success",
          text: "روش پرداخت با موفقیت به آفلاین تغییر کرد",
          customClass: {
            container: "toast-modal",
          },
        });

        // ریفرش کردن صفحه برای دریافت مجدد اطلاعات از سرور
        router.refresh();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response?.data ? error.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setOfflineLoading(false);
    }
  };


  const payHandler = () => {
    const data = {
      orderId: Number(param.get("trackCode")),
      bank: "pasargad",
    };
    axios
      .post(`${mainDomain}/api/Payment/Pay`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        redirectWithToken(res.data.form[0].value, res.data.url);
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          text: error.response?.data ? error.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  return (
    <>
      <div className="lg:w-2/3 w-full lg:pl-5">
        <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
          {/* عنوان و توضیحات */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              پرداخت آنلاین
            </h2>
            <p className="text-gray-600 text-sm">
              لطفاً درگاه پرداخت مورد نظر خود را انتخاب کنید
            </p>
          </div>

          {/* لیست درگاه‌ها */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mb-6">
              {gateways.map((gateway) => (
                <div
                  key={gateway.id}
                  onClick={() =>
                    gateway.isActive && setSelectedGateway(gateway.id)
                  }
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg border-2 transition-all duration-200
                                        ${
                                          gateway.isActive
                                            ? selectedGateway === gateway.id
                                              ? "border-[#d1182b] bg-red-50"
                                              : "border-gray-200 hover:border-[#d1182b] hover:bg-red-50/50 cursor-pointer"
                                            : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                                        }`}
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm">
                    {gateway.image ? (
                      <img
                        src={mainDomainImg + gateway.image}
                        alt={gateway.id}
                        className="w-7 h-7 object-contain"
                      />
                    ) : (
                      <FaCreditCard className="text-xl text-[#d1182b]" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {gateway.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {gateway.summary || `پرداخت امن`}
                    </p>
                  </div>
                  {gateway.isActive && (
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                            ${
                                              selectedGateway === gateway.id
                                                ? "border-[#d1182b] bg-[#d1182b]"
                                                : "border-gray-300"
                                            }`}
                    >
                      {selectedGateway === gateway.id && (
                        <FaCheck className="text-white text-[10px]" />
                      )}
                    </div>
                  )}
                </div>
              ))}

              {!loading && gateways.length === 0 && (
                <div className="w-full text-center py-8 text-gray-500">
                  درگاه پرداختی یافت نشد
                </div>
              )}
            </div>
          )}

          {/* دکمه‌های عملیات */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => payHandler()}
              disabled={!selectedGateway}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer
                            ${
                              selectedGateway
                                ? "bg-[#d1182b] !text-white hover:bg-[#40768c]"
                                : "bg-gray-100 !text-gray-400 cursor-not-allowed"
                            }`}
            >
              <FaCreditCard />
              <span>انتقال به صفحه پرداخت</span>
            </button>

            <button
              onClick={handleChangeToOffline}
              disabled={offlineLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 !text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {offlineLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
              ) : (
                <>
                  <FaExchangeAlt />
                  <span>تغییر به پرداخت آفلاین</span>
                </>
              )}
            </button>

            <button
              onClick={() => router.push("/profile/orders")}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 !text-red-600 py-3 px-6 rounded-lg hover:bg-red-100 transition-colors duration-200 cursor-pointer"
            >
              <FaTimes />
              <span>انصراف از پرداخت</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
