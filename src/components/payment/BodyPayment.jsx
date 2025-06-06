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

   

    return (
        <>
            <div className="flex flex-wrap items-start">
                <TitlePayment />
                <DescPayment estimateData={estimateData} />
            </div>
        </>
    );
}
