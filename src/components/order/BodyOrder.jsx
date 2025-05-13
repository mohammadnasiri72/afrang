"use client";

import { useRouter } from 'next/navigation';

export default function BodyOrder({ orderData }) {
    const router = useRouter();

    const handlePayment = (trackCode) => {
        router.push(`/order?trackCode=${trackCode}`);
    };

    console.log(orderData);

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
                                        <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                            {order.paymentStatus === 'paid' ? 'پرداخت شده' : 'پرداخت نشده'}
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
                                        <span className={`font-medium ${order.orderStatus === 'pending' ? 'text-yellow-600' :
                                            order.orderStatus === 'processing' ? 'text-blue-600' :
                                                order.orderStatus === 'completed' ? 'text-green-600' :
                                                    'text-gray-600'
                                            }`}>
                                            {order.orderStatus === 'pending' ? 'در انتظار تایید' :
                                                order.orderStatus === 'processing' ? 'در حال پردازش' :
                                                    order.orderStatus === 'completed' ? 'تکمیل شده' :
                                                        'نامشخص'}
                                        </span>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <span className="text-gray-600">روش پرداخت:</span>
                                        <span className="font-medium">{order.paymentId === 2143 ? "پرداخت آفلاین" : order.paymentId === 2142 ? "پرداخت آنلاین" : 'نامشخص'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <button
                                        className="text-[#d1182b] hover:text-[#40768c] transition-colors"
                                        onClick={() => {/* اینجا می‌تونید لینک به صفحه جزئیات سفارش رو اضافه کنید */ }}
                                    >
                                        مشاهده جزئیات سفارش
                                    </button>
                                    {
                                    order.payable && 
                                    (
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
