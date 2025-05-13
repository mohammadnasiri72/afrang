import HeaderCard from "@/components/Card/HeaderCard";
import CompeletePayWrapper from "@/components/CompeletePay/CompeletePayWrapper";
import Container from "@/components/container";

export default async function CompeletePay() {
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <HeaderCard />
          <CompeletePayWrapper />
        </Container>
      </div>
    </>
  );
}
