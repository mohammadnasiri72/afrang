"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import { BiSortUp } from "react-icons/bi";

function ModalSelectCategoryBlog() {
  const [modalCategory, setModalCategory] = useState(false);
  const [titleModalCategory, setTitleModalCategory] = useState("دسته بندی ها");

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
          <Button
            onClick={() => {
              setTitleModalCategory("دسته یک");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "دسته یک" ? "#18d1be" : "",
              color: titleModalCategory === "دسته یک" ? "#fff" : "",
            }}
          >
            دسته یک
          </Button>
          <Button
            onClick={() => {
              setTitleModalCategory("دسته دو");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "دسته دو" ? "#18d1be" : "",
              color: titleModalCategory === "دسته دو" ? "#fff" : "",
            }}
          >
            دسته دو
          </Button>
          <Button
            onClick={() => {
              setTitleModalCategory("دسته سه");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "دسته سه" ? "#18d1be" : "",
              color: titleModalCategory === "دسته سه" ? "#fff" : "",
            }}
          >
            دسته سه
          </Button>
        </div>
        <div className=" mt-3 flex justify-center gap-3">
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
            onClick={() => {
              setTitleModalCategory("دسته بندی ها");
              setModalCategory(false);
            }}
          >
            پاک کردن
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ModalSelectCategoryBlog;
