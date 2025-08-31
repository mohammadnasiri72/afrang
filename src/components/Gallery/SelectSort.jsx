"use client";

import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

function SelectSort() {
    const [selectedSort, setSelectedSort] = useState("10");

     const router = useRouter();

    const handleSortChange = (value) => {
    setSelectedSort(value);
    
    // ساخت URL با پارامتر مرتب‌سازی
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?orderBy=${value}`;
    router.push(newUrl);
  };

  const sortOptions = [
    { value: "10", label: "پسندیده‌ترین" },
    { value: "1", label: "جدیدترین" },
    { value: "11", label: "قدیمی‌ترین" },
    { value: "8", label: "پربازدیدترین" }
  ];
  return (
    <>
      <div className="lg:w-[300px] w-full">
       <Select
            className="custom-select w-full border-none bg-[#f0f0f0] rounded-[8px]"
            size="large"
            placeholder="مرتب سازی بر اساس"
            value={selectedSort}
            onChange={handleSortChange}
            suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
            options={sortOptions}
          />
      </div>
    </>
  );
}

export default SelectSort;
