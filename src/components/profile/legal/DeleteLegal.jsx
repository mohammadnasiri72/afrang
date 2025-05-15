"use client";

import { deleteLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import ConfirmModal from "@/components/CompeletePay/ConfirmModal";

function DeleteLegal({ id, getLegalFu, isOpen, onClose }) {
    const [isDeleting, setIsDeleting] = useState(false);

    // Toast notification setup
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const user = Cookies.get("user");
            const { token } = JSON.parse(user);
            
            const response = await deleteLegal(id, token);
            
            if (response) {
                await getLegalFu();
                Toast.fire({
                    icon: "success",
                    text: "اطلاعات حقوقی با موفقیت حذف شد",
                    customClass: {
                        container: "toast-modal",
                    },
                });
            }
            onClose();
        } catch (err) {
            Toast.fire({
                icon: "error",
                text: err.response?.data || "مشکلی در حذف اطلاعات حقوقی پیش آمده است",
                customClass: {
                    container: "toast-modal",
                },
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleDelete}
            title="حذف اطلاعات حقوقی"
            message="آیا از حذف این اطلاعات حقوقی اطمینان دارید؟"
            isLoading={isDeleting}
        />
    );
}

export default DeleteLegal; 