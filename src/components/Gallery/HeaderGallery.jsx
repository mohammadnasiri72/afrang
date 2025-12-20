import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";
import Container from "../container";
import SelectCat from "./SelectCat";
import SelectSort from "./SelectSort";

async function HeaderGallery({ category, searchParam }) {
  

  return (
    <>
      <Container>
        <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
              <SelectSort />
              <SelectCat category={category} searchParam={searchParam}/>
            </div>
            <Link href={"/profile/Send-Photo"}>
              <div className="flex items-center rounded-sm bg-[#18d1be] !text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
                <FaTelegram className="text-lg" />
                <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                  ارسال تصویر
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HeaderGallery;
