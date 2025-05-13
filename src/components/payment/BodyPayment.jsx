"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DescPayment from "./DescPayment";
import TitlePayment from "./TitlePayment";

export default function BodyPayment() {
    const estimateData = useSelector((state) => state.payment.estimateData);
    const router = useRouter();
    

    useEffect(() => {
        // اگر estimateData وجود نداشت، کاربر را به صفحه قبل برگردان
        if (!estimateData) {
            router.push("/card/infosend");
        }
    }, [estimateData, router]);

    if (!estimateData) {
        return null;
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
