"use client";

import { Button, Modal, message } from "antd";
import { useState, useEffect } from "react";
import { BiSortUp } from "react-icons/bi";
import { getCategory } from "@/services/Category/categoryService";
import { useRouter, useSearchParams } from "next/navigation";

function ModalSelectCategoryBlog({ onCategorySelect }) {
  const [modalCategory, setModalCategory] = useState(false);
  const [titleModalCategory, setTitleModalCategory] = useState("دسته بندی ها");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoryData = await getCategory({
        TypeId: 9,
        LangCode: 'fa',
      });

      if (categoryData.type === 'error') {
        message.error(categoryData.message);
        return;
      }

      setCategories(categoryData);
    } catch (error) {
      message.error(error.response?.data || "خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalCategory) {
      fetchCategories();
    }
  }, [modalCategory]);

  // خواندن پارامترهای URL در لود اولیه
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryId = Number(categoryParam);
      const category = categories?.find(cat => cat.id === categoryId);
      if (category) {
        setTitleModalCategory(category.title);
      }
    }
  }, [searchParams, categories]);

  const updateUrlParams = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category && category !== 0) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`);
  };

  const handleCategorySelect = (category) => {
    setTitleModalCategory(category.title);
    setModalCategory(false);
    if (onCategorySelect) {
      onCategorySelect(category.id);
    }
    updateUrlParams(category.id);
  };

  const handleClear = () => {
    setTitleModalCategory("دسته بندی ها");
    if (onCategorySelect) {
      onCategorySelect(0);
    }
    updateUrlParams(0);
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
          {loading ? (
            <div className="text-center py-4">در حال بارگذاری...</div>
          ) : (
            <>
              <Button
                onClick={() => handleCategorySelect({ id: 0, title: "همه دسته‌بندی‌ها" })}
                style={{
                  border: "none",
                  display: "flex",
                  justifyContent: "start",
                  backgroundColor: titleModalCategory === "همه دسته‌بندی‌ها" ? "#18d1be" : "",
                  color: titleModalCategory === "همه دسته‌بندی‌ها" ? "#fff" : "",
                }}
              >
                همه دسته‌بندی‌ها
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    border: "none",
                    display: "flex",
                    justifyContent: "start",
                    backgroundColor: titleModalCategory === category.title ? "#18d1be" : "",
                    color: titleModalCategory === category.title ? "#fff" : "",
                  }}
                >
                  {category.title}
                </Button>
              ))}
            </>
          )}
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

export default ModalSelectCategoryBlog;
