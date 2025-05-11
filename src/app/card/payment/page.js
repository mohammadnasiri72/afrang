import HeaderCard from "@/components/Card/HeaderCard";
import Container from "@/components/container";
import BodyPayment from "@/components/payment/BodyPayment";

export default async function CompeletePay() {
    return (
        <>
            <div className="bg-[#f6f6f6] overflow-hidden">
                <Container>
                    <HeaderCard />
                    <BodyPayment />
                </Container>
            </div>
        </>
    );
}
