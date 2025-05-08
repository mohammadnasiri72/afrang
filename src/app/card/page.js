import BodyCard from "@/components/Card/BodyCard";
import HeaderCard from "@/components/Card/HeaderCard";
import Container from "@/components/container";

export default async function Card() {
 
  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <HeaderCard />
          <BodyCard />
        </Container>
      </div>
    </>
  );
}
