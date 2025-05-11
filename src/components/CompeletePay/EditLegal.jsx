"use client";

import { MdEditSquare } from "react-icons/md";

function EditLegal({ showModal }) {
    return (
        <button
            onClick={showModal}
            className="text-center text-[#fff] w-full rounded-[5px] bg-[#1677ff] block font-[600] p-2 cursor-pointer"
        >
            <div className="flex items-center justify-center">
                <MdEditSquare />
                <span>ویرایش</span>
            </div>
        </button>
    );
}

export default EditLegal; 