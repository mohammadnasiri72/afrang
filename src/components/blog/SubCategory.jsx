"use client";

import { Segmented } from "antd";
import React, { useState } from "react";

function SubCategory() {
    const [typeArticle, setTypeArticle] = useState("ویدئو");
  return (
    <>
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
          options={["فتوگرافی", "ویدئو"]}
        />
      </div>
    </>
  );
}

export default SubCategory;
