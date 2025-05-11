import { useState } from "react";
import { deleteAddress } from "@/services/order/orderService";
import Cookies from "js-cookie";
import ConfirmModal from "./ConfirmModal";
import { FaTrashAlt } from "react-icons/fa";
import { Spin } from "antd";
import Swal from "sweetalert2";

function DeleteAddress({ id, getAddressFu, onAddressDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      const response = await deleteAddress(id, token);
      if (response) {
        setIsModalOpen(false);
        if (onAddressDelete) {
          onAddressDelete();
        }
        getAddressFu();
        Toast.fire({
          icon: "success",
          text: "آدرس با موفقیت حذف شد",
          customClass: "toast-modal",
        });
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-[100px]">
        <button
          disabled={isLoading}
          onClick={() => setIsModalOpen(true)}
          className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] p-2 ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? (
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
        title="حذف آدرس"
        message="آیا از حذف این آدرس اطمینان دارید؟"
      />
    </>
  );
}

export default DeleteAddress;
