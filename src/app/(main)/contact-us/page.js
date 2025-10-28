import BreadcrumbMain from "@/components/BreadcrumbMain";
import Container from "@/components/container";
import { getItemByUrl } from "@/services/Item/item";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const HeaderContact = dynamic(() =>
  import("@/components/contact/HeaderContact")
);
const BodyContact = dynamic(() => import("@/components/contact/BodyContact"));
const GoogleMap = dynamic(() => import("@/components/contact/GoogleMap"));

export default async function Contact() {
  try {
    const data = await getItemByUrl("contect-us");

    return (
      <>
        <BreadcrumbMain breadcrumb={[{ title: "تماس باما" }]} />
        <div className="overflow-hidden max-w-[2000px] mx-auto">
          {data.image && <HeaderContact data={data} />}
          <div className="bg-[#f6f6f6] overflow-hidden">
            <Container>
              <BodyContact />
            </Container>
            <GoogleMap />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    notFound();
  }
}
