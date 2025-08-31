"use client";
import TransactionResult from "@/components/TransactionResult/TransactionResult";
import { useEffect, useState } from "react";

export default function BankPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <div>{mounted && <TransactionResult status={"success"} />}</div>;
}
