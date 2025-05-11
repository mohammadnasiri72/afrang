"use client";

import SelectCodeDiscount from "./SelectCodeDiscount";
import SelectWayPayment from "./SelectWayPayment";
import SummaryPayment from "./SummaryPayment";



export default function TitlePayment({ estimateData }) {


    return (
        <>
            <div className="lg:w-3/4 w-full lg:pl-5">
                <SelectWayPayment estimateData={estimateData} />
                <SelectCodeDiscount estimateData={estimateData} />
                <SummaryPayment estimateData={estimateData} />
            </div>
        </>

    );
}
