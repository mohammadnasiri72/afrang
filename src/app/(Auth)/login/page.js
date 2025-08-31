"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Login = dynamic(() => import("@/components/Auth/Login/Login"));

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <div>{mounted && <Login />}</div>;
}
