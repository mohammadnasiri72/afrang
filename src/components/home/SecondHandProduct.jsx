import { FaCaretLeft } from "react-icons/fa6";
import ProductMain from "./ProductMain";
import ProductMainSecondHand from "./ProductMainSecondHand";

function SecondHandProduct() {
  return (
    <>
      {/* title-SecondHand relative */}

      <div className="sm:px-16 px-2">
        <div className="flex justify-between items-center sm:px-4">
          <div className="flex flex-wrap gap-4 items-center ">
            <button className="title-SecondHand relative text-[#222] duration-300 text-lg cursor-pointer font-semibold">
              دست دوم های پیشنهاد افــــرنـــــگ
            </button>
            <button className="relative text-[#777] duration-300 hover:text-[#000] text-lg cursor-pointer ">
              تازه های دست دوم
            </button>
          </div>
          <div className="flex whitespace-nowrap items-center cursor-pointer duration-300 hover:text-[#18d1be] font-medium">
            <span>نمایش همه</span>
            <FaCaretLeft className="text-[#18d1be]" />
          </div>
        </div>
        <div className="mt-10">
          <ProductMainSecondHand />
        </div>
      </div>
    </>
  );
}

export default SecondHandProduct;
