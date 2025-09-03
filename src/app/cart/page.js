"use client";
import Container from "@/components/container";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ToggleCart = dynamic(() => import("@/components/Card/ToggleCart"));
const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyCard = dynamic(() => import("@/components/Card/BodyCard"));

export default function Cart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      {mounted && (
        <Container>
          <ToggleCart />
          <HeaderCard />
          <div className="pb-10">
            <BodyCard />
          </div>
        </Container>
      )}
    </div>
  );
}
