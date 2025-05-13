"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DescPayment from "./DescPayment";
import TitlePayment from "./TitlePayment";
import Cookies from "js-cookie";

export default function BodyPayment() {
    const estimateData = useSelector((state) => state.payment.estimateData);
    const router = useRouter();
    
    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (!userCookie) {
            router.push("/cart");
            return;
        }

        try {
            const user = JSON.parse(userCookie);
            if (!user.token) {
                router.push("/cart");
                return;
            }

            // اگر estimateData وجود نداشت، کاربر را به صفحه قبل برگردان
            if (!estimateData) {
                router.push("/cart/infosend");
            }
        } catch (error) {
            console.error("Error parsing user cookie:", error);
            router.push("/cart");
        }
    }, [estimateData, router]);

    if (!estimateData) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-wrap items-start">
                <TitlePayment estimateData={estimateData} />
                <DescPayment estimateData={estimateData} />
            </div>
        </>
    );
}
