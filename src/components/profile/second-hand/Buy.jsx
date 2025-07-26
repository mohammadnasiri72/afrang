import React from 'react';
import { Empty } from "antd";

function Buy() {
  return (
    <div className="bg-white p-5 rounded-lg z-50 relative ">
      <div className=" gap-4 flex justify-center items-center h-full">
        <Empty
          description="در حال حاضر کالای دسته دومی موجود نیست"
          className="my-8"
        />
      </div>
    </div>
  );
}

export default Buy;
