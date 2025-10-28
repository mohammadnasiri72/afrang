"use client";

import { FaRegCalendarAlt } from "react-icons/fa";
import {
    FaRegCircleCheck,
    FaRegMoneyBill1
} from "react-icons/fa6";
import { MdListAlt } from "react-icons/md";
import { useSelector } from "react-redux";

export default function DescPaymentFinal({ orderData }) {
    const estimateData = useSelector((state) => state.payment.estimateData);


    

    return (
        <>
            <div className="lg:w-1/3 w-full lg:pl-5 sm:mt-0 mt-5">
                <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                    <h2 className="text-xl font-bold text-gray-800 !mb-6">جزئیات سفارش</h2>
                    {
                        orderData &&
                        <div className="space-y-4">
                            {/* شماره سفارش */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-[#d1182b]">
                                    <MdListAlt className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 !mb-1">شماره سفارش</p>
                                    <p className="font-medium text-gray-800">{orderData?.order?.trackCode}</p>
                                </div>
                            </div>

                            {/* تاریخ صدور */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-[#d1182b]">
                                    <FaRegCalendarAlt className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 !mb-1">تاریخ صدور</p>
                                    <p className="font-medium text-gray-800">{new Date(orderData?.order?.createDate).toLocaleDateString('fa-IR')}</p>
                                </div>
                            </div>

                            {/* وضعیت پرداخت */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-[#d1182b]">
                                    <FaRegCircleCheck className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 !mb-1">وضعیت پرداخت</p>
                                    <p className="font-medium text-gray-800">{orderData?.order?.paymentStatusTitle}</p>
                                </div>
                            </div>

                            {/* مبلغ قابل پرداخت */}
                            <div className="flex items-center gap-3 p-3 bg-[#d1182b] rounded-lg">
                                <div className="text-white">
                                    <FaRegMoneyBill1 className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm !text-white/80 !mb-1">مبلغ قابل پرداخت</p>
                                    <p className="font-medium !text-white text-lg">
                                        {orderData?.order?.orderTotal.toLocaleString()} تومان
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
