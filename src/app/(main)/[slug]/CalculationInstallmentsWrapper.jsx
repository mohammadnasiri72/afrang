"use client";

import dynamic from "next/dynamic";
import React from "react";
const CalculationInstallments = dynamic(
  () => import("./CalculationInstallments"),
  {
    ssr: false,
    loading: () => null,
  },
);

function CalculationInstallmentsWrapper({ slug }) {
  return <>{slug === "afrang-leasing" && <CalculationInstallments />}</>;
}

export default CalculationInstallmentsWrapper;
