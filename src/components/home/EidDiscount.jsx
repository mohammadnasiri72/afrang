import { FaCaretLeft } from "react-icons/fa6";

export default function EidDiscount() {
  return (
    <>
      <div className="sm:hidden flex justify-center items-center pb-10">
        <div className="flex items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">فـــروش ویژه عید نوروز</h2>
          <img src="/images/icons/nowruz.png" alt="نوروز" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="sm:flex hidden items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">فـــروش ویژه عید نوروز</h2>
          <img src="/images/icons/nowruz.png" alt="نوروز" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#d1182b] font-bold text-lg cursor-pointer">
            دوربین
          </span>
          /
          <span className="text-lg cursor-pointer text-[#0008] duration-300 hover:text-[#000] font-medium">
            لنز
          </span>
          /
          <span className="text-lg cursor-pointer text-[#0008] duration-300 hover:text-[#000] font-medium">
            میکروفن
          </span>
        </div>
        <div className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium">
          <span>نمایش همه</span>
          <FaCaretLeft />
        </div>
      </div>
    </>
  );
}
