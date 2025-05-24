"use client";

import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";

function DeleteLegal({ id, onDelete, getLegalFu }) {
    const user = Cookies.get("user");
    const token = JSON.parse(user).token;

    const handleDelete = () => {
        Modal.confirm({
            title: "آیا از حذف این اطلاعات اطمینان دارید؟",
            icon: <ExclamationCircleOutlined />,
            content: "این عملیات غیرقابل بازگشت است.",
            okText: "بله",
            cancelText: "خیر",
            onOk: async () => {
                try {
                    await deleteLegal(id, token);
                    onDelete(id);
                    getLegalFu();
                } catch (error) {
                    console.error("Error deleting legal:", error);
                }
            },
        });
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete();
            }}
            className="w-full flex items-center justify-center gap-2 text-center text-[#fff] rounded-[5px] bg-[#d1182b] font-[600] px-4 py-2 cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            حذف
        </button>
    );
}

export default DeleteLegal; 