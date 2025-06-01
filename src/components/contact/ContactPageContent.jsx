'use client';

import Container from "@/components/container";
import dynamic from 'next/dynamic';

const HeaderContact = dynamic(() => import("@/components/contact/HeaderContact"));
const BodyContact = dynamic(() => import("@/components/contact/BodyContact"));
const GoogleMap = dynamic(() => import("@/components/contact/GoogleMap"));

export default function ContactPageContent() {
  return (
    <div>
      <HeaderContact />
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <BodyContact />
        </Container>
        <GoogleMap />
      </div>
    </div>
  );
} 