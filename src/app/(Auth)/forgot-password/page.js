"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ForgotPassword = dynamic(() =>
  import("@/components/Auth/ForgotPassword/ForgotPassword")
);

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <div>{mounted && <ForgotPassword />}</div>;
}
