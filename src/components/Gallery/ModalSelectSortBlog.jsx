"use client";

import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { BiSortUp } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "1", title: "جدیدترین" },
  { value: "11", title: "قدیمی‌ترین" },
  { value: "8", title: "پربازدیدترین" },
  { value: "10", title: "پسندیده‌ترین" }
];

function ModalSelectSortBlog({ onSortSelect }) {
  const [modalCategory, setModalCategory] = useState(false);
  const [titleModalCategory, setTitleModalCategory] = useState("مرتب سازی بر اساس");
  const router = useRouter();
  const searchParams = useSearchParams();

  // خواندن پارامترهای URL در لود اولیه
  useEffect(() => {
    const orderByParam = searchParams.get('orderBy');
    if (orderByParam) {
      const sortOption = SORT_OPTIONS?.find(option => option.value === orderByParam);
      if (sortOption) {
        setTitleModalCategory(sortOption.title);
      }
    }
  }, [searchParams]);

  const updateUrlParams = (orderBy) => {
    const params = new URLSearchParams(searchParams.toString());

    if (orderBy && orderBy !== "1") {
      params.set('orderBy', orderBy);
    } else {
      params.delete('orderBy');
    }

    router.push(`?${params.toString()}`);
  };

  const handleSortSelect = (sortOption) => {
    setTitleModalCategory(sortOption.title);
    setModalCategory(false);
    if (onSortSelect) {
      onSortSelect(sortOption.value);
    }
    updateUrlParams(sortOption.value);
  };

  const handleClear = () => {
    setTitleModalCategory("مرتب سازی بر اساس");
    if (onSortSelect) {
      onSortSelect("1");
    }
    updateUrlParams("1");
  };

  return (
    <>
      <Button className="w-full" onClick={() => setModalCategory(true)}>
        <BiSortUp />
        <span>{titleModalCategory}</span>
      </Button>
      <Modal
        style={{ top: "100%", transform: "translateY(-100%)" }}
        closable={false}
        footer={null}
        open={modalCategory}
        onOk={() => setModalCategory(false)}
        onCancel={() => setModalCategory(false)}
      >
        <div className="flex flex-col gap-2">
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleSortSelect(option)}
              style={{
                border: "none",
                display: "flex",
                justifyContent: "start",
                backgroundColor: titleModalCategory === option.title ? "#18d1be" : "",
                color: titleModalCategory === option.title ? "#fff" : "",
              }}
            >
              {option.title}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-3">
          <Button
            style={{
              backgroundColor: "#d1182b",
              border: "none",
              color: "#fff",
            }}
            onClick={() => setModalCategory(false)}
          >
            بستن
          </Button>
          <Button
            style={{
              backgroundColor: "#40768c",
              border: "none",
              color: "#fff",
            }}
            onClick={handleClear}
          >
            پاک کردن
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ModalSelectSortBlog;
