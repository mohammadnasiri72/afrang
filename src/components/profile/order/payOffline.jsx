"use client";
import { changePayment, getInfoPayOffline, getWayPayment, PaymentOffline } from "@/services/order/orderService";
import { Tooltip } from "@mui/material";
import { Divider, Modal, Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaCopy, FaCreditCard, FaExchangeAlt, FaPhone, FaTimes, FaUser } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

import Swal from "sweetalert2";

export default function PayOffline({ orderData }) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onlineLoading, setOnlineLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [paymentData, setPaymentData] = useState({
        referenceNumber: '',
        amount: '',
        paymentDate: null,
        paymentTime: ''
    });
    const router = useRouter();
    const user = Cookies.get("user");
    const token = JSON.parse(user).token;
    const [offlineGateways, setOfflineGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState(null);

    

    // Fetch payment info when component mounts
    useEffect(() => {
        const fetchPaymentInfo = async () => {
            if (orderData?.order?.paymentId) {
                try {
                    const data = await getInfoPayOffline(orderData.order.paymentId);
                    setPaymentInfo(data);
                } catch (error) {
                    console.error("Error fetching payment info:", error);
                }
            }
        };

        fetchPaymentInfo();
    }, [orderData?.order?.paymentId]);

    useEffect(() => {
        const fetchGateways = async () => {
            try {
                if (orderData?.order?.paymentId) {
                    const response = await getWayPayment(orderData.order.paymentId);
                    if (response) {
                        // مرتب‌سازی درگاه‌ها بر اساس priority
                        const sortedGateways = response
                            .filter(gateway => gateway.categoryKey === "offline")
                            .sort((a, b) => b.priority - a.priority);
                        setOfflineGateways(sortedGateways);
                    }
                }
            } catch (error) {
                console.error('Error fetching gateways:', error);
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
    

    // اضافه کردن useEffect برای تنظیم مبلغ پیش‌فرض
    useEffect(() => {
        if (isPaymentModalOpen && orderData?.order?.orderTotal) {
            // محاسبه مجموع مبالغ پرداخت شده
            const totalPaid = orderData.payments?.reduce((sum, payment) => {
                return sum + (payment.amount || 0);
            }, 0) || 0;

            // محاسبه مبلغ باقیمانده
            const remainingAmount = orderData.order.orderTotal - totalPaid;

            setPaymentData(prev => ({
                ...prev,
                amount: remainingAmount > 0 ? remainingAmount : 0
            }));
        }
    }, [isPaymentModalOpen, orderData?.order?.orderTotal, orderData?.payments]);

    // import sweet alert 2
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const handlePaymentSubmit = async () => {
        // اعتبارسنجی فرم
        const newErrors = {};
        if (!paymentData.referenceNumber) newErrors.referenceNumber = 'شماره ارجاع الزامی است';
        if (!paymentData.amount) newErrors.amount = 'مبلغ واریزی الزامی است';
        if (!paymentData.paymentDate) newErrors.paymentDate = 'تاریخ واریز الزامی است';
        if (!paymentData.paymentTime) newErrors.paymentTime = 'ساعت واریز الزامی است';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            // ساختار داده برای ارسال به API
            const requestData = {
                orderId: orderData.order.id,
                paymentWayId: selectedGateway,
                refId: paymentData.referenceNumber,
                trackId: "", // خالی طبق درخواست
                amount: parseInt(paymentData.amount),
                datePay: paymentData.paymentDate.split(" ")[0], // فقط تاریخ
                timePay: paymentData.paymentTime // ساعت
            };

            // ارسال درخواست به API
            await PaymentOffline(requestData, token);

            // بستن مودال و نمایش پیام موفقیت
            setIsPaymentModalOpen(false);
            Toast.fire({
                icon: "success",
                text: "اطلاعات پرداخت با موفقیت ثبت شد",
                customClass: {
                    container: "toast-modal",
                },
            });

            router.push(`/profile/orders?statusId=1&page=1`);
            
            // پاک کردن فرم
            setPaymentData({
                referenceNumber: '',
                amount: '',
                paymentDate: null,
                paymentTime: ''
            });
            setErrors({});

            // ریفرش کردن صفحه برای دریافت اطلاعات جدید
            // router.refresh();

        } catch (error) {
           
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

    

    const handleChangeToOnline = async () => {
        try {
            setOnlineLoading(true);
            if (orderData?.order?.id) {
                const data = {
                    orderId: orderData.order.id,
                    paymentType: "Online"
                };

                await changePayment(data, token);

                Toast.fire({
                    icon: "success",
                    text: "روش پرداخت با موفقیت به آنلاین تغییر کرد",
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
        }
    };


    return (
        <>
            <div className="lg:w-2/3 w-full lg:pl-5">
                <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                    {/* عنوان و توضیحات */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{paymentInfo?.title}</h2>
                        {/* <p className="text-gray-600 text-sm">sdfsdfsdf</p> */}
                    </div>

                    {/* اطلاعات پرداخت */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <p className="text-gray-700 mb-6 text-justify">
                            {paymentInfo?.summary}
                        </p>

                        <div className="space-y-4">
                            {offlineGateways.map((gateway) => (
                                <div key={gateway.id} className="space-y-4">
                                    <div 
                                        className={`bg-gray-50 p-4 rounded-lg cursor-pointer transition-colors ${
                                            selectedGateway === gateway.id ? 'ring-2 ring-[#d1182b]' : 'ring-2 ring-[#3338]'
                                        }`}
                                        onClick={() => setSelectedGateway(gateway.id)}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <input
                                                type="radio"
                                                name="paymentGateway"
                                                checked={selectedGateway === gateway.id}
                                                onChange={() => setSelectedGateway(gateway.id)}
                                                className="w-4 h-4 text-[#d1182b] border-gray-300 focus:ring-[#d1182b]"
                                            />
                                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                                <FaCreditCard className="text-[#d1182b]" />
                                                {gateway.title}
                                            </h3>
                                        </div>
                                        <div className="prose prose-sm max-w-none text-gray-600" 
                                            dangerouslySetInnerHTML={{ __html: gateway.summary }} 
                                        />
                                    </div>
                                    
                                    {gateway.id === "card-to-card" && gateway.summary.includes("6104") && selectedGateway === gateway.id && (
                                        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">شماره کارت</p>
                                                <p className="font-medium text-gray-800 font-mono">
                                                    {gateway.summary.match(/\d{4}[-]?\d{4}[-]?\d{4}[-]?\d{4}/)[0]}
                                                </p>
                                            </div>
                                            <Tooltip title="کپی شماره کارت" arrow placement="top">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(gateway.summary.match(/\d{4}[-]?\d{4}[-]?\d{4}[-]?\d{4}/)[0], 'شماره کارت');
                                                    }}
                                                    className="text-gray-400 hover:text-[#d1182b] transition-colors"
                                                >
                                                    <FaCopy />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    )}

                                    {gateway.id === "bank-transfer" && gateway.summary.includes("IR") && selectedGateway === gateway.id && (
                                        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">شماره شبا</p>
                                                <p className="font-medium text-gray-800 font-mono">
                                                    {gateway.summary.match(/IR\d+/)[0]}
                                                </p>
                                            </div>
                                            <Tooltip title="کپی شماره شبا" arrow placement="top">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(gateway.summary.match(/IR\d+/)[0], 'شماره شبا');
                                                    }}
                                                    className="text-gray-400 hover:text-[#d1182b] transition-colors"
                                                >
                                                    <FaCopy />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* <div className="flex items-center gap-2 text-gray-600 mt-6">
                                <FaPhone className="text-[#d1182b]" />
                                <p>در صورت نیاز به راهنمایی با شماره <span className="font-medium">09170009688</span> تماس بگیرید</p>
                            </div> */}
                        </div>
                    </div>

                    {/* دکمه‌های عملیات */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Tooltip 
                            title={!selectedGateway ? "لطفا ابتدا روش پرداخت را انتخاب کنید" : ""} 
                            arrow 
                            placement="top"
                        >
                            <button
                                onClick={() => setIsPaymentModalOpen(true)}
                                disabled={!selectedGateway}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors duration-200 ${
                                    selectedGateway 
                                        ? 'bg-[#d1182b] text-white hover:bg-[#40768c] cursor-pointer' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <FaCreditCard />
                                <span>ثبت اطلاعات پرداخت</span>
                            </button>
                        </Tooltip>

                        <button
                            onClick={handleChangeToOnline}
                            disabled={onlineLoading}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {onlineLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                            ) : (
                                <>
                                    <FaExchangeAlt />
                                    <span>تغییر به پرداخت آنلاین</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => router.push('/profile/orders')}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-6 rounded-lg hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                        >
                            <FaTimes />
                            <span>انصراف از پرداخت</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* مودال ثبت اطلاعات پرداخت */}
            <Modal
                title="ثبت اطلاعات پرداخت"
                open={isPaymentModalOpen}
                onCancel={() => setIsPaymentModalOpen(false)}
                width={{
                    xs: "95%",
                    sm: "80%",
                    md: "60%",
                    lg: "50%",
                    xl: "40%",
                    xxl: "35%",
                }}
                footer={[
                    <div key="footer" className="flex items-center gap-2 justify-end">
                        <button
                            disabled={loading}
                            onClick={handlePaymentSubmit}
                            className={`text-center text-[#fff] rounded-[5px] bg-[#d1182b] font-[500] px-4 py-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2 justify-center">
                                    <span>درحال ثبت</span>
                                    <Spin className="white-spin" size="small" />
                                </div>
                            ) : (
                                "ثبت پرداخت"
                            )}
                        </button>
                        <button
                            onClick={() => setIsPaymentModalOpen(false)}
                            className="text-[#545454] rounded-[5px] bg-[#eceded] font-[500] px-4 py-2 cursor-pointer"
                        >
                            بازگشت
                        </button>
                    </div>
                ]}
            >
                <Divider className="my-3" />
                <div className="space-y-4">
                    {/* شماره ارجاع */}
                    <div>
                        <label className="text-[#656565] text-sm block mb-1">
                            شماره ارجاع/پیگیری/سند*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-lg w-full px-3 py-2 flex items-center border ${errors.referenceNumber ? "border-red-500" : "border-[#0005]"}`}
                        >
                            <FaUser className="text-[#656565] text-sm" />
                            <input
                                type="text"
                                value={paymentData.referenceNumber}
                                onChange={(e) => {
                                    setPaymentData(prev => ({ ...prev, referenceNumber: e.target.value }));
                                    if (errors.referenceNumber) setErrors(prev => ({ ...prev, referenceNumber: '' }));
                                }}
                                className="mr-2 w-full bg-transparent text-right outline-none text-sm"
                                placeholder="شماره ارجاع/پیگیری/سند"
                            />
                        </div>
                        {errors.referenceNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.referenceNumber}</p>
                        )}
                    </div>

                    {/* مبلغ واریزی */}
                    <div>
                        <label className="text-[#656565] text-sm block mb-1">
                            مبلغ واریزی (تومان)*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-lg w-full px-3 py-2 flex items-center border ${errors.amount ? "border-red-500" : "border-[#0005]"}`}
                        >
                            <FaCreditCard className="text-[#656565] text-sm" />
                            <input
                                type="text"
                                value={paymentData.amount ? parseInt(paymentData.amount).toLocaleString() : ''}
                                onChange={(e) => {
                                    // حذف جداکننده‌ها و تبدیل به عدد
                                    const value = e.target.value.replace(/,/g, '');
                                    if (value === '' || /^\d+$/.test(value)) {
                                        setPaymentData(prev => ({ ...prev, amount: value }));
                                        if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                                    }
                                }}
                                className="mr-2 w-full bg-transparent text-right outline-none text-sm"
                                placeholder="مبلغ واریزی"
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                        )}
                    </div>

                    {/* تاریخ و ساعت */}
                    <div>
                        <label className="text-[#656565] text-sm block mb-1">
                            تاریخ و ساعت واریز*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-lg w-full px-3 py-2 flex items-center border ${errors.paymentDate ? "border-red-500" : "border-[#0005]"}`}
                        >
                            <FaCreditCard className="text-[#656565] text-sm flex-shrink-0" />
                            <div className="flex-1 w-full">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    value={paymentData.paymentDate}
                                    onChange={(date) => {
                                        if (date) {
                                            setPaymentData(prev => ({
                                                ...prev,
                                                paymentDate: date.format(),
                                                paymentTime: date.format("HH:mm")
                                            }));
                                            if (errors.paymentDate) setErrors(prev => ({ ...prev, paymentDate: '' }));
                                            if (errors.paymentTime) setErrors(prev => ({ ...prev, paymentTime: '' }));
                                        }
                                    }}
                                    format="YYYY/MM/DD HH:mm"
                                    plugins={[
                                        <TimePicker
                                            position="bottom"
                                            hideSeconds={true}
                                        />
                                    ]}
                                    inputClass="w-full text-right outline-none bg-transparent cursor-pointer text-sm mr-2"
                                    placeholder="تاریخ و ساعت واریز"
                                    className="rmdp-mobile w-full"
                                    containerClassName="w-full"
                                />
                            </div>
                        </div>
                        {errors.paymentDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.paymentDate}</p>
                        )}
                        {errors.paymentTime && (
                            <p className="text-red-500 text-xs mt-1">{errors.paymentTime}</p>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
