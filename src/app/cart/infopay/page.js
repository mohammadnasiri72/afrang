import dynamic from 'next/dynamic';
import Container from "@/components/container";

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyPayment = dynamic(() => import("@/components/payment/BodyPayment"));

export default function CompletePay() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Container>
        <HeaderCard />
        <BodyPayment />
      </Container>
    </div>
  );
}
