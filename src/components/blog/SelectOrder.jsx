"use client";
import { Select } from "antd";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

function SelectOrder({ value }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 1) {
      params.delete("orderBy");
    } else {
      params.set("orderBy", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="lg:w-[300px] w-full ">
        <Select
          className="custom-select w-full border-none bg-[#f0f0f0] rounded-[8px]"
          size="large"
          value={Number(value)}
          onChange={handleChange}
          suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
          options={[
            {
              value: 1,
              label: "جدیدترین",
            },
            { value: 8, label: "بیشترین بازدید" },
            { value: 9, label: "بیشترین کامنت" },
          ]}
        />
      </div>
    </>
  );
}

export default SelectOrder;
