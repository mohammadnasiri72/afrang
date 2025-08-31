import Container from "../container";
import SelectCategory from "./SelectCategory";
import SelectOrder from "./SelectOrder";

async function HeaderBlog({ searchParams, category }) {

  return (
    <>
      <Container>
        <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="align-middle w-full">
              <h2 className="text-[20px] font-semibold whitespace-nowrap">
                اخبار و مقالات
                <span className="text-[#d1182b] px-1">افرنگ</span>
              </h2>
            </div>
            <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
              <SelectOrder value={searchParams?.orderBy || 1} currentSearchParams={searchParams} />
              <SelectCategory category={category} activeCategory={searchParams?.category} currentSearchParams={searchParams} />
            </div>
          </div>
        </div>
       
      </Container>
    </>
  );
}

export default HeaderBlog;
