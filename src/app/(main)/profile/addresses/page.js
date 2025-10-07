"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AddressList = dynamic(() =>
  import("@/components/profile/address/AddressList")
);

export default function AddressesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <>{mounted && <AddressList />}</>;
}
