import HeaderCard from "@/components/Card/HeaderCard";
import BodyCompeletePay from "@/components/CompeletePay/BodyCompeletePay";
import DescCompeletePay from "@/components/CompeletePay/DescCompeletePay";
import Container from "@/components/container";

export default async function CompeletePay() {
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <HeaderCard />
          <div className="flex flex-wrap items-start">
          <BodyCompeletePay />
            
            <DescCompeletePay />
          </div>
        </Container>
      </div>
    </>
  );
}
