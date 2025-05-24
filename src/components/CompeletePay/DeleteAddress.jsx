import { useState } from "react";
import { deleteAddress } from "@/services/order/orderService";
import Cookies from "js-cookie";
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
      Toast.fire({
        icon: "error",
        text: error.response?.data?.message || "خطا در حذف آدرس",
        customClass: "toast-modal",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
        title="حذف"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-[20px]"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-md mx-auto shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <FaTrashAlt className="text-[#d1182b] text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">حذف آدرس</h3>
            </div>
            <p className="text-gray-600 mb-6">آیا از حذف این آدرس اطمینان دارید؟</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span>در حال حذف</span>
                    <Spin className="white-spin" size="small" />
                  </>
                ) : (
                  "حذف"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAddress;
