"use client";

import { useState } from "react";
import { Spin } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import ConfirmModal from "./ConfirmModal";
import { deleteLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";

function DeleteLegal({ id, onDelete, getLegalFu }) {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = Cookies.get("user");
    const token = JSON.parse(user).token;

    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deleteLegal(id, token);
            if (response) {
                setIsModalOpen(false);
                if (onDelete) {
                    onDelete();
                }
                if (getLegalFu) {
                    getLegalFu();
                }
                Toast.fire({
                    icon: "success",
                    text: "اطلاعات حقوقی با موفقیت حذف شد",
                    customClass: "toast-modal",
                });
            }
        } catch (err) {
            console.error("Error deleting legal:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-[100px]">
                <button
                    disabled={loading}
                    onClick={() => setIsModalOpen(true)}
                    className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] p-2 ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2 justify-center">
                            <span>درحال حذف</span>
                            <Spin className="white-spin" size="small" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <FaTrashAlt />
                            <span>حذف</span>
                        </div>
                    )}
                </button>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="حذف اطلاعات حقوقی"
                message="آیا از حذف این اطلاعات حقوقی اطمینان دارید؟"
            />
        </>
    );
}

export default DeleteLegal; 