"use client";

import { setIdEdit } from "@/redux/slices/idEditSec";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";

function EditeProductSec({ id }) {
  const router = useRouter();
  const disPatch = useDispatch();

  return (
    <>
      <Tooltip placement="top" title={"ویرایش آگهی"} arrow={true}>
        <button
          onClick={() => {
            disPatch(setIdEdit(id));
            router.push(`/profile/second-hand/edit/${id}`);
          }}
          className="p-1.5 !text-gray-400 hover:!text-teal-500 transition-colors cursor-pointer"
        >
          <BiEdit className="text-lg" />
        </button>
      </Tooltip>
    </>
  );
}

export default EditeProductSec;
