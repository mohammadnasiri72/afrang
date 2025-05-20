"use client";

import { useState, useEffect } from 'react';
import { FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getOrderTrackCode } from '@/services/order/orderService';
import Cookies from 'js-cookie';
import { getImageUrl } from '@/utils/mainDomain';

export default function OrderDetails({ trackCode }) {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => {
        router.push('/profile/orders');
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const userStr = Cookies.get('user');
                if (!userStr) {
                    throw new Error('اطلاعات کاربر یافت نشد');
                }

                const user = JSON.parse(userStr);
                const token = user?.token;
                if (!token) {
                    throw new Error('توکن یافت نشد');
                }

                const data = await getOrderTrackCode(trackCode, token);
                if (data) {
                    // Calculate total if not available
                    if (!data.orderTotal && data.products) {
                        data.orderTotal = data.products.reduce((total, product) => {
                            return total + (product.salesPrice * product.qty);
                        }, 0);
                    }
                    setOrderDetails(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        if (trackCode) {
            fetchOrderDetails();
        }
    }, [trackCode]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d1182b]"></div>
                <p className="text-gray-500">در حال بارگذاری اطلاعات سفارش...</p>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="text-center py-8 text-gray-500">
                سفارش مورد نظر یافت نشد
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 3: // تکمیل شده
                return <FaCheckCircle className="text-green-500" />;
            case 2: // در حال پردازش
                return <FaTruck className="text-blue-500" />;
            case 1: // در انتظار تایید
                return <FaClock className="text-yellow-500" />;
            default:
                return <FaTimesCircle className="text-red-500" />;
        }
    };

    const getPaymentStatusIcon = (status) => {
        switch (status) {
            case 1: // پرداخت شده
                return <FaCheckCircle className="text-green-500" />;
            case 4: // پرداخت ناکامل
                return <FaMoneyBillWave className="text-yellow-500" />;
            default:
                return <FaTimesCircle className="text-red-500" />;
        }
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">جزئیات سفارش</h2>
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#d1182b] transition-colors cursor-pointer"
                >
                    <span>بازگشت به لیست سفارشات</span>
                    <FaArrowLeft />
                </button>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm z-50 relative">
                <div className="flex items-center justify-between mb-6">
                    {/* <div className="flex items-center gap-3">
                       
                            <h3 className="font-medium text-gray-800">وضعیت سفارش :</h3>
                       <p className="font-semibold">{orderDetails.order.paymentStatusTitle}</p>
                    </div> */}
                    <div className="text-right">
                        <p className="text-sm text-gray-500">وضعیت سفارش :</p>
                        <p className="font-medium">{orderDetails.order.paymentStatusTitle}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-gray-500">تاریخ ثبت سفارش</p>
                        <p className="font-medium">{new Date(orderDetails.order.createDate).toLocaleDateString('fa-IR')}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">کالاهای سفارش</h3>
                    <div className="space-y-4">
                        {orderDetails.products.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg relative">
                                    <img src={getImageUrl(item.image)} alt={item.id} className="w-full h-full object-cover rounded-lg" />
                                    {
                                        item.qty > 1 &&
                                        <div className="absolute -top-2 -right-2 bg-[#d1182b] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                                            {item.qty}
                                        </div>
                                    }
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                                        {item.warranty && (
                                            <p className="text-sm text-gray-500 mt-1">گارانتی: {item.warranty}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {/* <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-600">تعداد:</span>
                                            <span className="font-medium">{item.qty}</span>
                                        </div> */}

                                        <div className="flex flex-col ju items-center text-sm">
                                            {item.hasDiscount && (
                                                <span className="line-through text-gray-400">
                                                    {item.originalPrice.toLocaleString()} تومان
                                                </span>
                                            )}
                                            <span className="text-[#d1182b] font-semibold">
                                                {item.salesPrice.toLocaleString()} تومان
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="font-bold text-gray-800 mb-6 text-xl">خلاصه سفارش</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Payment Information Box */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-4">
                                <FaMoneyBillWave className="text-[#d1182b] text-xl" />
                                <h4 className="text-gray-800 font-bold">اطلاعات پرداخت</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">روش پرداخت:</span>
                                    <span className="font-medium">{orderDetails.order.paymentTitle}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">وضعیت پرداخت:</span>
                                    <span className="font-medium">{orderDetails.order.paymentStatusTitle}</span>
                                </div>

                                {orderDetails.discountAmount > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50 text-green-600">
                                        <span>تخفیف:</span>
                                        <span className="font-semibold">{orderDetails.discountAmount.toLocaleString()} تومان</span>
                                    </div>
                                )}
                                {orderDetails.order.discountCodePrice > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50 text-green-600">
                                        <span>کد تخفیف:</span>
                                        <span className="font-medium">{orderDetails.order.discountCodePrice.toLocaleString()} تومان</span>
                                    </div>
                                )}
                                {orderDetails.order.shipmentCost > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50 text-red-600">
                                        <span>هزینه ارسال:</span>
                                        <span className="font-medium">{orderDetails.order.shipmentCost.toLocaleString()} تومان</span>
                                    </div>
                                )}
                                {orderDetails.order.shipmentCost === 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50 text-green-600">
                                        <span>هزینه ارسال:</span>
                                        <span className="font-medium">رایگان</span>
                                    </div>
                                )}
                                {orderDetails.order.sumTax > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50 text-red-600">
                                        <span>مالیات:</span>
                                        <span className="font-medium">{orderDetails.order.sumTax.toLocaleString()} تومان</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">مبلغ کل:</span>
                                    <span className="font-semibold text-[#d1182b]">
                                        {(orderDetails.orderTotal ||
                                            orderDetails.products?.reduce((total, product) =>
                                                total + (product.salesPrice * product.qty), 0) ||
                                            0).toLocaleString()} تومان
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Information Box */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-4">
                                <FaTruck className="text-[#d1182b] text-xl" />
                                <h4 className="text-gray-800 font-bold">اطلاعات ارسال</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">نام گیرنده:</span>
                                    <span className="font-medium">{orderDetails.userAddress.fullName}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">شماره تماس:</span>
                                    <span className="font-medium">{orderDetails.userAddress.mobile}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">آدرس:</span>
                                    <span className="font-medium text-right">
                                        {orderDetails.userAddress.provinceTitle}، {orderDetails.userAddress.cityTitle}، {orderDetails.userAddress.address}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">کد پستی:</span>
                                    <span className="font-medium">{orderDetails.userAddress.postalCode}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600">روش ارسال:</span>
                                    <span className="font-medium">{orderDetails.order.shipmentTitle}</span>
                                </div>
                                {orderDetails.shipmentCost > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-50">
                                        <span className="text-gray-600">هزینه ارسال:</span>
                                        <span className="font-medium">{orderDetails.shipmentCost.toLocaleString()} تومان</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                {orderDetails.payments && orderDetails.payments.length > 0 && (
                    <div className="border-t border-gray-100 pt-6 mt-6">
                        <h3 className="font-semibold text-gray-800 mb-4">تاریخچه پرداخت‌ها</h3>
                        <div className="space-y-4">
                            {orderDetails.payments.map((payment) => (
                                <div key={payment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="mt-1">
                                        {payment.isSuccess ?
                                            <FaCheckCircle className="text-green-500" /> :
                                            <FaTimesCircle className="text-red-500" />
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-gray-800">{payment.getWay}</p>
                                                {payment.transactionCode && (
                                                    <p className="text-sm text-gray-500 mt-1">کد تراکنش: {payment.transactionCode}</p>
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-[#d1182b]">{payment.amount.toLocaleString()} تومان</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(payment.created).toLocaleDateString('fa-IR')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 