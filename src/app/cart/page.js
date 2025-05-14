import BodyCard from "@/components/Card/BodyCard";
import HeaderCard from "@/components/Card/HeaderCard";
import ToggleCart from "@/components/Card/ToggleCart";
import Container from "@/components/container";

export default async function Card() {
 
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <ToggleCart />
          <HeaderCard />
          <BodyCard />
        </Container>
      </div>
    </>
  );
}
