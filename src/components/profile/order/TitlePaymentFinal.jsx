"use client";

import { FaExclamationCircle } from "react-icons/fa";

import PayOffline from "./payOffline";
import PayOnline from "./payOnline";

export default function TitlePaymentFinal({ orderData }) {



    if (!orderData) {
        return null;
    }
    if (orderData.order.paymentStatus <= 4) {
        if (orderData.order.paymentId === 2143) {
            return (
                <PayOffline orderData={orderData} />
            );
        }

        if (orderData.order.paymentId === 2142) {
            return (
                <PayOnline orderData={orderData} />
            );
        }

    } else {
        return (
            <div className="lg:w-2/3 w-full lg:pl-5">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FaExclamationCircle className="text-6xl text-[#d1182b]" />
                        <h3 className="text-xl font-bold text-gray-800">پرداخت مقدور نمی‌باشد</h3>
                        <p className="text-gray-600 text-center">
                            در این مرحله امکان پرداخت وجود ندارد. لطفاً با پشتیبانی تماس بگیرید.
                        </p>
                    </div>
                </div>
            </div>
        );
    }




}
