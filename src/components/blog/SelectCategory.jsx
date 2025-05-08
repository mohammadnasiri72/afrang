"use client";

import { Select } from "antd";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

function SelectCategory({ category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get("category");

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`?${params.toString()}`);
  };

  const options = [
    { value: "all", label: "همه دسته‌بندی‌ها" },
    ...category.map((cat) => ({
      value: cat.id.toString(),
      label: cat.title,
    })),
  ];

  return (
    <>
      <div className="lg:w-[250px] w-full ">
        <Select
          className="custom-select w-full"
          size="large"
          value={activeCategory || "all"}
          onChange={handleChange}
          style={{
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
          suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
          options={options}
        />
      </div>
    </>
  );
}

export default SelectCategory;
