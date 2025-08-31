"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Register = dynamic(() => import("@/components/Auth/Register/Register"));

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <div>{mounted && <Register />}</div>;
}
