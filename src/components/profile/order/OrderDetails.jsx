"use client";

import { useState, useEffect } from 'react';
import { FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave, FaUser, FaMapMarkerAlt, FaPhone, FaBarcode, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getOrderTrackCode } from '@/services/order/orderService';
import Cookies from 'js-cookie';
import { getImageUrl } from '@/utils/mainDomain';
import Loading from '@/components/Loading';

export default function OrderDetails({ trackCode }) {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);



    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
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
                // if (data) {
                //     if (!data.orderTotal && data.products) {
                //         data.orderTotal = data.products.reduce((total, product) => {
                //             return total + (product.salesPrice * product.qty);
                //         }, 0);
                //     }
                // }
                setOrderDetails(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (trackCode) {
            fetchOrderDetails();
        }
    }, [trackCode]);

    if (loading) {
        return <Loading />;
    }

    if (!orderDetails) {
        return null;
    }

    console.log(orderDetails);


    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">جزئیات سفارش</h2>
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#40768c] transition-colors cursor-pointer"
                >
                    <span>بازگشت به لیست سفارشات</span>
                    <FaArrowLeft />
                </button>
            </div>

            {/* Order Status and Date */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaBox className="text-gray-500 text-xl" />
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500">کد سفارش:</p>
                                <p className="font-bold text-lg text-[#40768c]">{trackCode}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-500 text-sm" />
                            <p className="text-sm text-gray-500">{new Date(orderDetails.order.createDate).toLocaleDateString('fa-IR')}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaMoneyBillWave className="text-gray-500 text-xl" />
                            <p className="text-sm text-gray-500">مبلغ کل سفارش</p>
                        </div>
                        <p className="font-bold text-lg text-[#40768c]">
                            {orderDetails?.order?.orderTotal.toLocaleString() || 0} تومان
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaTruck className="text-gray-500 text-xl" />
                            <p className="text-sm text-gray-500">وضعیت سفارش</p>
                        </div>
                        <p className="font-bold text-lg text-[#40768c]">{orderDetails.order.paymentStatusTitle}</p>
                    </div>
                </div>
            </div>

            {/* Order Items and Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Order Items */}
                <div className="xl:col-span-2 bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4">کالاهای سفارش</h3>
                    <div className="space-y-6">
                        {orderDetails.products.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-32 h-32 bg-white rounded-xl relative flex-shrink-0 block hover:opacity-90 transition-opacity border border-gray-100"
                                >
                                    <img src={getImageUrl(item.image)} alt={item.id} className="w-full h-full object-contain rounded-xl p-3" />
                                </a>
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                        <div className="w-full sm:w-auto">
                                            <div className="flex items-center gap-3 mb-2">
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-gray-800 text-lg hover:text-[#40768c] transition-colors"
                                                >
                                                    {item.title}
                                                </a>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <span>کد محصول: {item.productId}</span>
                                                <span>دسته‌بندی: {item.categoryId}</span>
                                                {item.warranty && (
                                                    <span className="text-green-600">گارانتی: {item.warranty}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end w-full sm:w-auto">
                                            {item.hasDiscount && (
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="line-through text-gray-400 text-sm whitespace-nowrap">
                                                        {item.originalPrice.toLocaleString()} تومان
                                                    </span>
                                                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                        {Math.round((item.discount / item.originalPrice) * 100)}% تخفیف
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col items-end">
                                                <span className="text-[#40768c] font-semibold text-lg whitespace-nowrap">
                                                    {item.salesPrice.toLocaleString()} تومان
                                                </span>
                                                <span className="text-sm text-gray-500 mt-1 whitespace-nowrap">
                                                    مالیات: {item.tax.toLocaleString()} تومان
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 mt-4 border-t border-gray-200">
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <span className={`px-3 py-1.5 rounded-lg ${item.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {item.isActive ? 'فعال' : 'غیرفعال'}
                                            </span>
                                            <span className="bg-[#40768c] text-white text-xs font-bold px-3 py-1.5 rounded-full min-w-[28px] h-7 flex items-center justify-center">
                                                {item.qty} عدد
                                            </span>
                                            {item.isCanceled && (
                                                <span className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg">لغو شده</span>
                                            )}
                                        </div>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#40768c] hover:text-[#2c5266] text-sm flex items-center gap-2"
                                        >
                                            مشاهده محصول
                                            <FaArrowLeft className="text-xs" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Details Sidebar */}
                <div className="space-y-4">
                    {/* Payment Information */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <FaMoneyBillWave className="text-[#40768c]" />
                            <h4 className="text-gray-800 font-bold">اطلاعات پرداخت</h4>
                        </div>
                        <div className="space-y-2">
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
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">مبلغ کل:</span>
                                <span className="font-semibold text-[#40768c]">
                                    {orderDetails?.order?.orderTotal.toLocaleString() || 0} تومان
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <FaTruck className="text-[#40768c]" />
                            <h4 className="text-gray-800 font-bold">اطلاعات ارسال</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 py-2 border-b border-gray-50">
                                <FaUser className="text-[#40768c]" />
                                <div className="flex-1 flex justify-between">
                                    <span className="text-gray-600">نام گیرنده:</span>
                                    <span className="font-medium">{orderDetails.userAddress.fullName}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 py-2 border-b border-gray-50">
                                <FaPhone className="text-[#40768c]" />
                                <div className="flex-1 flex justify-between">
                                    <span className="text-gray-600">شماره تماس:</span>
                                    <span className="font-medium">{orderDetails.userAddress.mobile}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 py-2 border-b border-gray-50">
                                <FaMapMarkerAlt className="text-[#40768c]" />
                                <div className="flex-1 flex justify-between">
                                    <span className="text-gray-600">آدرس:</span>
                                    <span className="font-medium text-right">
                                        {orderDetails.userAddress.provinceTitle}، {orderDetails.userAddress.cityTitle}، {orderDetails.userAddress.address}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 py-2 border-b border-gray-50">
                                <FaBarcode className="text-[#40768c]" />
                                <div className="flex-1 flex justify-between">
                                    <span className="text-gray-600">کد پستی:</span>
                                    <span className="font-medium">{orderDetails.userAddress.postalCode}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 py-2">
                                <FaTruck className="text-[#40768c]" />
                                <div className="flex-1 flex justify-between">
                                    <span className="text-gray-600">روش ارسال:</span>
                                    <span className="font-medium">{orderDetails.order.shipmentTitle}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            {orderDetails.payments && orderDetails.payments.length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">تاریخچه پرداخت‌ها</h3>
                    <div className="space-y-3">
                        {orderDetails.payments.map((payment) => (
                            <div key={payment.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
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
                                            <p className="font-semibold text-[#40768c]">{payment.amount.toLocaleString()} تومان</p>
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
    );
} 