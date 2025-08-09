import Container from "@/components/container";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import BreadCrumbUseds from "@/components/UserAdd/BreadCrumbUseds";
import FilterSec from "@/components/UserAdd/FilterSec";

export default async function UserAddDetails(props) {
  const prop = await props;
  const params = await prop.params;
  const slug = await params;
  const id = Number(slug.slug[0]);

  return (
    <>
      <Container>
        <BreadCrumbUseds />
        <div className="flex items-start">
          <div className="w-1/4 lg:block hidden px-3">
            <FilterSec />
          </div>
          <div className="lg:w-3/4 w-full">
            <BodyUserAdd />
          </div>
        </div>
      </Container>
    </>
  );
}
