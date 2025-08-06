import Container from "@/components/container";
import BodyUserAdd from "@/components/UserAdd/BodyUserAdd";
import FilterSec from "@/components/UserAdd/FilterSec";

export default async function UserAdd() {
  return (
    <>
    <Container>
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
