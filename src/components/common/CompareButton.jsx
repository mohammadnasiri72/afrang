"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

const CompareButton = ({ id }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/compare/${id}`);
      }}
      className=" flex w-full items-center cursor-pointer py-1 px-1 rounded-lg transition-all duration-300"
    >
      <img className="w-4" src="/images/icons/benchmark.png" alt="" />
      <span className="text-xs font-medium px-2">مقایسه محصول</span>
    </Button>
  );
};

export default CompareButton;
