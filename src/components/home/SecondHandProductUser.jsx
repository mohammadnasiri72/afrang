"use client";
import { useRouter } from "next/navigation";
import { FaCaretLeft } from "react-icons/fa6";
import ProductMainUser from "./ProductMainUser";

function SecondHandProductUser({ filteredProducts }) {
  const router = useRouter();

  return (
    <>
      <div className="sm:px-16 px-2">
        {/* بخش موبایل */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="title-SecondHand relative text-[#222] duration-300 text-lg font-semibold">
              دست دوم های کاربران
            </h2>
            <button
              onClick={() => {
                router.push(`/useds/-1`);
              }}
              className="flex items-center gap-1 !text-[#d1182b] hover:!text-[#d1182b]/80 transition-colors cursor-pointer"
            >
              <span className="text-sm">نمایش همه</span>
              <FaCaretLeft className="text-sm" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center sm:px-4">
          <div className="lg:flex hidden flex-wrap gap-4 items-center">
            <button className="title-SecondHand relative !text-[#222] duration-300 text-lg font-semibold">
              دست دوم های کاربران
            </button>
          </div>

          {/* دکمه نمایش همه در دسکتاپ */}
          <div
            onClick={() => {
              router.push(`/useds/-1`);
            }}
            className="hidden lg:flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
        </div>
        <div className="mt-5">
          <ProductMainUser products={filteredProducts} />
        </div>
      </div>

     
    </>
  );
}

export default SecondHandProductUser;
