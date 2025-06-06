"use client";

import SelectCodeDiscount from "./SelectCodeDiscount";
import SelectWayPayment from "./SelectWayPayment";
import SummaryPayment from "./SummaryPayment";



export default function TitlePayment() {

    
    return (
        <>
            <div className="lg:w-3/4 w-full lg:pl-5">
                <SelectWayPayment />
                <SelectCodeDiscount />
                <SummaryPayment />
            </div>
        </>

    );
}
