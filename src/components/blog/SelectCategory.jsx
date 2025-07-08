"use client";

import { setLoadingBlog } from "@/redux/slices/blogSlice";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";

function SelectCategory({ category }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get("category");

  const handleChange = (value) => {
    dispatch(setLoadingBlog(true));
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
