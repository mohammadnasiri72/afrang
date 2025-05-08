import { Spin } from "antd";
import React from "react";

function loading() {
  return (
    <div
      style={{ zIndex: "5465465465465465" }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-white justify-center items-center flex"
    >
     <Spin size="large" />
    </div>
  );
}

export default loading;
