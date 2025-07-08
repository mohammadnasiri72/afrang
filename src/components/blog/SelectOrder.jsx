"use client";
import { setLoadingBlog } from "@/redux/slices/blogSlice";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";

function SelectOrder({ value }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    dispatch(setLoadingBlog(true));
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
