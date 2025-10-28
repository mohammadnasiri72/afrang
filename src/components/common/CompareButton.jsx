"use client";

import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { GiScales } from "react-icons/gi";
import Loading from "../Loading";

const CompareButton = ({ id }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Button
        onClick={() => {
          startTransition(() => {
            router.push(`/compare/${id}`);
          });
        }}
        className=" flex w-full items-center cursor-pointer py-1 px-1 rounded-lg transition-all duration-300"
      >
        {!isPending ? (
          <GiScales className="text-[17px]" />
        ) : (
          <Spin size="small" />
        )}

        <span className="text-xs font-medium px-2">مقایسه محصول</span>
      </Button>
      {isPending && <Loading />}
    </>
  );
};

export default CompareButton;
