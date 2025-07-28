"use client";

import { Button, Tooltip } from "antd";
import { useRouter } from "next/navigation";

const CompareButtonBtn = ({ id }) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center">
      <Tooltip placement="left" title="مقایسه محصول" trigger={["hover"]}>
        <button
          onClick={() => {
            router.push(`/compare/${id}`);
          }}
          className="flex w-full justify-center items-center cursor-pointer py-2 px-2 transition-all duration-300 hover:bg-gray-300"
        >
          <img className="w-4" src="/images/icons/benchmark.png" alt="" />
        </button>
      </Tooltip>
    </div>
  );
};

export default CompareButtonBtn;
