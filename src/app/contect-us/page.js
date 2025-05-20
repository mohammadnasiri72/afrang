import dynamic from 'next/dynamic';
import Container from "@/components/container";

const HeaderContact = dynamic(() => import("@/components/contact/HeaderContact"));
const BodyContact = dynamic(() => import("@/components/contact/BodyContact"));
const GoogleMap = dynamic(() => import("@/components/contact/GoogleMap"));

export default function Contact() {
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
