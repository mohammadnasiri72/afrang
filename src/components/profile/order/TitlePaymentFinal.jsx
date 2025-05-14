"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useDispatch, useSelector } from "react-redux";
import PayOffline from "./payOffline";
import PayOnline from "./payOnline";

export default function TitlePaymentFinal({ orderData }) {

    if (!orderData) {
        return null;
    }

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

    return (
        <div className="lg:w-2/3 w-full lg:pl-5">
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-gray-600 text-center">لطفاً روش پرداخت آنلاین را انتخاب کنید</p>
            </div>
        </div>
    );


}
