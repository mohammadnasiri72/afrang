"use client";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";

function SelectOrderClient({ value, currentSearchParams }) {
  const router = useRouter();

  const handleChange = (newValue) => {
    const params = new URLSearchParams(currentSearchParams);
    if (newValue === 1) {
      params.delete("orderBy");
    } else {
      params.set("orderBy", newValue);
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

function SelectOrder({ value, currentSearchParams }) {
  return (
    <SelectOrderClient value={value} currentSearchParams={currentSearchParams} />
  );
}

export default SelectOrder;
