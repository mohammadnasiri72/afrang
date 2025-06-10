"use client";

import { message, Segmented, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { FaCaretDown, FaTelegram } from "react-icons/fa6";
import Container from "../container";
import ModalSelectCategoryBlog from "./ModalSelectCategoryBlog";
import ModalSelectSortBlog from "./ModalSelectSortBlog";
import { getCategory } from "@/services/Category/categoryService";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

function HeaderGallery() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSort, setSelectedSort] = useState("10");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  

  

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const categoryData = await getCategory({
        TypeId: 9,
        LangCode: 'fa',
        Page: 1,
        PageSize: 100
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

  useEffect(() => {
    fetchCategory();
  }, [])

  // تنظیم selectedCategory بر اساس categoryKey موجود در URL
  useEffect(() => {
    if (params?.slug?.[0]) {
      const categoryId = Number(params.slug[0]);
      const foundCategory = category.find(item => Number(item.categoryKey) === categoryId);
      if (foundCategory) {
        setSelectedCategory(String(foundCategory.categoryKey));
      }
    } else {
      setSelectedCategory(0);
    }
  }, [params?.slug, category]);

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
      value: item.categoryKey,
      label: item.title
    }))
  ];

  const sortOptions = [
    { value: "10", label: "پسندیده‌ترین" },
    { value: "1", label: "جدیدترین" },
    { value: "11", label: "قدیمی‌ترین" },
    { value: "8", label: "پربازدیدترین" }
  ];

  const handleCategoryChange = (value) => {
    
    setSelectedCategory(value);
    
    if (value === 0) {
      router.push('/gallery');
    } else {
      const selectedCategoryData = category.find(item => item.categoryKey === value);
      if (selectedCategoryData) {
        router.push(`/gallery/${selectedCategoryData.categoryKey}`);
      }
    }
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    
    // ساخت URL با پارامتر مرتب‌سازی
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?orderBy=${value}`;
    router.push(newUrl);
  };

  return (
    <>
      <Container>
        <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
              {/* <div className="sm:hidden flex w-full">
                <div className="w-1/2 px-3">
                  <ModalSelectCategoryBlog />
                </div>
                <div className="w-1/2 px-3">
                  <ModalSelectSortBlog />
                </div>
              </div> */}
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
              <div className="lg:w-[300px] w-full">
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
              <div className="lg:w-[250px] w-full">
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
            <Link href={'/profile/Send-Photo'}>
              <div className="flex items-center rounded-sm bg-[#18d1be] text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
                <FaTelegram className="text-lg" />
                <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                  ارسال تصویر
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HeaderGallery;
