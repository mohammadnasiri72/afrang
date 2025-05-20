import Container from "@/components/container";
import dynamic from 'next/dynamic';

const ToggleCart = dynamic(() => import("@/components/Card/ToggleCart"));
const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyCard = dynamic(() => import("@/components/Card/BodyCard"));

export default function Cart() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden">
      <Container>
        <ToggleCart />
        <HeaderCard />
        <BodyCard />
      </Container>
    </div>
  );
}
