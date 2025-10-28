"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedPayment } from "@/redux/slices/paymentWaySlice";
import { useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";

export default function SelectWayPayment() {
    const dispatch = useDispatch();
    const estimateData = useSelector((state) => state.payment.estimateData);
    const selectedPayment = useSelector((state) => state.paymentWay.selectedPayment);

    // اگر فقط یک روش پرداخت وجود داشت، به صورت خودکار انتخاب کن
    useEffect(() => {
        if (estimateData.paymentWays?.length === 1) {
            dispatch(setSelectedPayment(estimateData.paymentWays[0]));
        } else if (estimateData.paymentWays?.length > 1) {
            // اگر چند روش پرداخت وجود داشت و هیچ کدام انتخاب نشده بود، انتخاب رو پاک کن
            dispatch(setSelectedPayment(null));
        }
    }, [estimateData.paymentWays]);

    const handlePaymentSelect = (payment) => {
        dispatch(setSelectedPayment(payment));
    };

    return (
        <>
            <div className="container mx-auto px-4">
                {/* باکس انتخاب روش پرداخت */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 !mb-4">
                        <FaCreditCard className="text-xl text-[#d1182b]" />
                        <span className="text-xl font-bold text-gray-800">انتخاب شیوه پرداخت</span>
                    </div>
                    {
                        estimateData.paymentWays?.length > 0 &&
                        <div className="space-y-3">
                            {estimateData.paymentWays?.map((payment) => (
                                <div
                                    key={payment.id}
                                    onClick={() => handlePaymentSelect(payment)}
                                    className={`
                                p-4 rounded-lg border transition-all duration-300 cursor-pointer
                                ${selectedPayment?.id === payment.id
                                            ? 'border-[#d1182b] bg-[#fff5f5]'
                                            : 'border-gray-200 hover:border-[#d1182b] hover:bg-[#fff5f5]'
                                        }
                            `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 text-justify">
                                            <div className="flex items-center gap-1">
                                                <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${selectedPayment?.id === payment.id ? 'border-[#d1182b]' : 'border-gray-300'}
                                `}>
                                                    {selectedPayment?.id === payment.id && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-[#d1182b]" />
                                                    )}
                                                </div>
                                                <h3 className="text-base font-medium text-gray-800 !mb-1">
                                                    {payment.title}
                                                </h3>

                                            </div>
                                            {payment.summary && (
                                                <p className="text-gray-500 text-sm">
                                                    {payment.summary}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {
                        estimateData.paymentWays?.length === 0 &&
                        <div className="text-gray-500 text-sm">
                            هیچ روش پرداختی وجود ندارد
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
