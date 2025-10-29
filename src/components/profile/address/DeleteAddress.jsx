"use client";
import { deleteAddress } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import ConfirmModal from "@/components/CompeletePay/ConfirmModal";

function DeleteAddress({ id, getAddressFu, isOpen, onClose }) {
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
      
      const response = await deleteAddress(id, token);
      
      // اگر درخواست موفقیت‌آمیز بود (response مقدار داشته باشد)
      if (response) {
        await getAddressFu();
        Toast.fire({
          icon: "success",
          text: "آدرس مورد نظر با موفقیت حذف شد",
        });
      }
      onClose();
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data || "مشکلی در حذف آدرس پیش آمده است",
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
      title="حذف آدرس"
      message="آیا از حذف این آدرس اطمینان دارید؟"
      isLoading={isDeleting}
    />
  );
}

export default DeleteAddress; 