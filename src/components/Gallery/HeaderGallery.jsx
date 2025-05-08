"use client";

import { Segmented, Select } from "antd";
import { useState } from "react";
import { FaCaretDown, FaTelegram } from "react-icons/fa6";
import Container from "../container";
import ModalSelectCategoryBlog from "./ModalSelectCategoryBlog";
import ModalSelectSortBlog from "./ModalSelectSortBlog";

function HeaderGallery() {
  const [typeArticle, setTypeArticle] = useState("عکس ها");
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
              <div className="lg:w-auto w-full SegmentedBlog">
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
              </div>
              <div className="lg:w-[300px] w-full sm:block hidden">
                <Select
                  className="custom-select w-full border-none bg-[#f0f0f0] rounded-[8px]"
                  size="large"
                  defaultValue="مرتب سازی بر اساس"
                  onChange={(e) => {
                    // console.log(e);
                  }}
                  suffixIcon={
                    <FaCaretDown className="text-[#d1182b] text-lg" />
                  }
                  options={[
                    {
                      value: "مرتب سازی بر اساس",
                      label: "مرتب سازی بر اساس",
                    },
                    { value: "تست1", label: "تست1" },
                    { value: "تست2", label: "تست2" },
                    // { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
              <div className="lg:w-[250px] w-full sm:block hidden">
                <Select
                  className="custom-select w-full "
                  size="large"
                  defaultValue="دسته بندی"
                  style={{
                    border: "none",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                  }}
                  onChange={(e) => {
                    // console.log(e);
                  }}
                  suffixIcon={
                    <FaCaretDown className="text-[#d1182b] text-lg" />
                  }
                  options={[
                    { value: "دسته بندی", label: "دسته بندی" },
                    { value: "تست1", label: "تست1" },
                    { value: "تست2", label: "تست2" },
                  ]}
                />
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
