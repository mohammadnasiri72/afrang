"use client";

import { message, Segmented, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { FaCaretDown, FaTelegram } from "react-icons/fa6";
import Container from "../container";
import ModalSelectCategoryBlog from "./ModalSelectCategoryBlog";
import ModalSelectSortBlog from "./ModalSelectSortBlog";
import { getCategory } from "@/services/Category/categoryService";
import { useRouter, useSearchParams } from "next/navigation";

function HeaderGallery() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSort, setSelectedSort] = useState("1");
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchCategory = async () => {
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

      setCategory(categoryData)
    } catch (error) {
      message.error(error.response?.data || "خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchCategory();
  },[])

  // خواندن پارامترهای URL در لود اولیه
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const orderByParam = searchParams.get('orderBy');
    
    if (categoryParam) setSelectedCategory(Number(categoryParam));
    else setSelectedCategory(0);
    
    if (orderByParam) setSelectedSort(orderByParam);
    else setSelectedSort("1");
  }, [searchParams]);

  const updateUrlParams = (category, orderBy) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    if (orderBy) {
      params.set('orderBy', orderBy);
    } else {
      params.delete('orderBy');
    }

    router.push(`?${params.toString()}`);
  };

  const categoryOptions = [
    { value: 0, label: "همه دسته‌بندی‌ها" },
    ...category.map(item => ({
      value: item.id,
      label: item.title
    }))
  ];

  const sortOptions = [
    { value: "1", label: "جدیدترین" },
    { value: "2", label: "قدیمی‌ترین" },
    { value: "3", label: "پربازدیدترین" },
    { value: "4", label: "پسندیده‌ترین" }
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    updateUrlParams(value === 0 ? null : value, selectedSort);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    updateUrlParams(selectedCategory, value);
  };

  return (
    <>
      <Container>
        <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
              <div className="sm:hidden flex w-full">
                <div className="w-1/2 px-3">
                  <ModalSelectCategoryBlog />
                </div>
                <div className="w-1/2 px-3">
                  <ModalSelectSortBlog />
                </div>
              </div>
              {/* <div className="lg:w-auto w-full SegmentedBlog">
                <Segmented
                  className="font-semibold text-3xl w-full "
                  dir="ltr"
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontFamily: "yekan",
                  }}
                  value={typeArticle}
                  onChange={(e) => {
                    setTypeArticle(e);
                  }}
                  options={["ویدئو ها", "عکس ها"]}
                />
              </div> */}
              <div className="lg:w-[300px] w-full sm:block hidden">
                {loading ? (
                  <Skeleton.Input active size="large" className="w-full" />
                ) : (
                  <Select
                    className="custom-select w-full border-none bg-[#f0f0f0] rounded-[8px]"
                    size="large"
                    placeholder="مرتب سازی بر اساس"
                    value={selectedSort}
                    onChange={handleSortChange}
                    suffixIcon={
                      <FaCaretDown className="text-[#d1182b] text-lg" />
                    }
                    options={sortOptions}
                  />
                )}
              </div>
              <div className="lg:w-[250px] w-full sm:block hidden">
                {loading ? (
                  <Skeleton.Input active size="large" className="w-full" />
                ) : (
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
                    suffixIcon={
                      <FaCaretDown className="text-[#d1182b] text-lg" />
                    }
                    options={categoryOptions}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center rounded-sm bg-[#18d1be] text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
              <FaTelegram className="text-lg" />
              <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                ارسال تصویر
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HeaderGallery;
