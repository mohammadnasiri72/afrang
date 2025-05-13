"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import OrderDetails from './OrderDetails';

export default function BodyOrder({ orderData }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTrackCode = searchParams.get('id');

    const handlePayment = (trackCode) => {
        router.push(`/profile/orders?trackCode=${trackCode}`);
    };

    // اگر trackCode در URL وجود داشت، جزئیات سفارش رو نشون بده
    if (selectedTrackCode) {
        const selectedOrder = orderData?.find(order => order.trackCode === selectedTrackCode);
        if (selectedOrder) {
            return (
                <div className="mt-4">
                    <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                        <OrderDetails trackCode={selectedTrackCode} />
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="mt-4">
            <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                <h2 className="text-xl font-bold text-gray-800 mb-6">سفارشات من</h2>
                <div className="space-y-6">
                    {orderData?.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">شماره سفارش:</span>
                                        <span className="font-medium text-[#d1182b]">{order.trackCode}</span>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">تاریخ سفارش:</span>
                                        <span className="font-medium">{new Date(order.createDate).toLocaleDateString('fa-IR')}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">وضعیت پرداخت:</span>
                                        <span className={`font-medium ${order.paymentStatus === 1 ? 'text-green-600' : 'text-red-600'}`}>
                                            {order.paymentStatusTitle}
                                        </span>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">مبلغ کل:</span>
                                        <span className="font-semibold">{order.orderTotal?.toLocaleString()} تومان</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">وضعیت سفارش:</span>
                                        <span className={`font-medium ${order.status === 1 ? 'text-yellow-600' :
                                                order.status === 2 ? 'text-blue-600' :
                                                    order.status === 3 ? 'text-green-600' :
                                                        'text-gray-600'
                                            }`}>
                                            {order.statusTitle}
                                        </span>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">روش پرداخت:</span>
                                        <span className="font-medium">{order.paymentId === 2143 ? 'پرداخت آفلاین' : order.paymentId === 2142 ? 'پرداخت آنلاین' : 'نامشخص'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => router.push(`/profile/orders?id=${order.trackCode}`)}
                                        className="text-[#d1182b] hover:text-[#40768c] transition-colors cursor-pointer"
                                    >
                                        مشاهده جزئیات سفارش
                                    </button>
                                    {order.payable && (
                                        <button
                                            className="bg-[#d1182b] text-white px-4 py-2 rounded-lg hover:bg-[#40768c] transition-colors cursor-pointer"
                                            onClick={() => handlePayment(order.trackCode)}
                                        >
                                            پرداخت سفارش
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!orderData || orderData.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                            سفارشی یافت نشد
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
