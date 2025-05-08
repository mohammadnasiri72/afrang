import BodyContact from "@/components/contact/BodyContact";
import GoogleMap from "@/components/contact/GoogleMap";
import HeaderContact from "@/components/contact/HeaderContact";
import Container from "@/components/container";

export default async function Contact() {
  return (
    <>
      <HeaderContact />
      <div className="bg-[#f6f6f6] overflow-hidden">
        <Container>
          <BodyContact />
        </Container>
        <GoogleMap />
      </div>
    </>
  );
}
