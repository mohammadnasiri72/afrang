"use client";

import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { GiScales } from "react-icons/gi";
import Loading from "../Loading";

const CompareButtonBtn = ({ id , startTransition}) => {
  const router = useRouter();
 
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <Tooltip placement="left" title="مقایسه محصول" trigger={["hover"]}>
          <button
            aria-label="مقایسه محصول"
            onClick={() => {
              startTransition(() => {
                router.push(`/compare/${id}`);
              });
            }}
            className="flex w-full justify-center items-center cursor-pointer py-2 px-2 transition-all duration-300 hover:bg-gray-300"
          >
            <GiScales className="text-[#666] text-[17px]" />
          </button>
        </Tooltip>
      </div>
     
    </>
  );
};

export default CompareButtonBtn;
