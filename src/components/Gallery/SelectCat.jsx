"use client";

import { Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaCaretDown } from "react-icons/fa";
import Loading from "../Loading";

function SelectCat({ category }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    if (value === 0) {
      startTransition(() => {
        router.push("/gallery");
      });
    } else {
      const selectedCategoryData = category?.find(
        (item) => item.categoryKey === value
      );
      if (selectedCategoryData) {
        startTransition(() => {
          router.push(`/gallery/${selectedCategoryData.categoryKey}`);
        });
      }
    }
  };

  // تنظیم selectedCategory بر اساس categoryKey موجود در URL
  useEffect(() => {
    if (params?.slug?.[0]) {
      const categoryId = Number(params.slug[0]);
      const foundCategory = category?.find(
        (item) => Number(item.categoryKey) === categoryId
      );
      if (foundCategory) {
        setSelectedCategory(String(foundCategory.categoryKey));
      }
    } else {
      setSelectedCategory(0);
    }
  }, [params?.slug, category]);

  const categoryOptions = [
    { value: 0, label: "همه دسته‌بندی‌ها" },
    ...category.map((item) => ({
      value: item.categoryKey,
      label: item.title,
    })),
  ];

  return (
    <>
      <div className="lg:w-[250px] w-full">
        <Select
          className="custom-select w-full"
          size="large"
          placeholder="دسته بندی"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            border: "none",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
          suffixIcon={<FaCaretDown className="text-[#d1182b] text-lg" />}
          options={categoryOptions}
        />
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default SelectCat;
