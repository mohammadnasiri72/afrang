"use client";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Tooltip } from "antd";
import { BiEdit } from "react-icons/bi";

function EditeProductSec({ setStepPage , id , setIdEdit}) {
 



  return (
    <>
      <Tooltip placement="top" title={"ویرایش آگهی"} arrow={true}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdEdit(id);
            setStepPage(1);
          }}
          className="p-1.5 text-gray-400 hover:text-teal-500 transition-colors cursor-pointer"
        >
          <BiEdit className="text-lg" />
        </button>
      </Tooltip>
    </>
  );
}

export default EditeProductSec;
