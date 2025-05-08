"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import { BiSortUp } from "react-icons/bi";

function ModalSelectSortBlog() {
  const [modalCategory, setModalCategory] = useState(false);
  const [titleModalCategory, setTitleModalCategory] = useState("مرتب سازی بر اساس");

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
              setTitleModalCategory("پربازدید ترین");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "پربازدید ترین" ? "#18d1be" : "",
              color: titleModalCategory === "پربازدید ترین" ? "#fff" : "",
            }}
          >
            پربازدید ترین
          </Button>
          <Button
            onClick={() => {
              setTitleModalCategory("محبوب ترین");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "محبوب ترین" ? "#18d1be" : "",
              color: titleModalCategory === "محبوب ترین" ? "#fff" : "",
            }}
          >
            محبوب ترین
          </Button>
          <Button
            onClick={() => {
              setTitleModalCategory("جدید ترین");
              setModalCategory(false);
            }}
            style={{
              border: "none",
              display: "flex",
              justifyContent: "start",
              backgroundColor: titleModalCategory === "جدید ترین" ? "#18d1be" : "",
              color: titleModalCategory === "جدید ترین" ? "#fff" : "",
            }}
          >
            جدید ترین
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
              setTitleModalCategory("مرتب سازی بر اساس");
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

export default ModalSelectSortBlog;
