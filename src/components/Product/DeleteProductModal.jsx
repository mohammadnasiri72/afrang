import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { deleteCartItem } from "@/services/cart/cartService";
import { fetchCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";

function DeleteProductModal({ isOpen, onClose, cartId, cartType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const userId = JSON.parse(Cookies.get("user"))?.userId;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCartItem(cartId, userId);
      dispatch(fetchCart(cartType));
      Toast.fire({
        icon: "success",
        text: "محصول با موفقیت از سبد خرید حذف شد",
        customClass: {
          container: "toast-modal",
        },
      });
      onClose();
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "مشکلی در حذف محصول پیش آمده است",
        customClass: {
          container: "toast-modal",
        },
      });
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />
      <div 
        className="relative bg-white rounded-lg p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100 opacity-100 shadow-xl"
        style={{
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">حذف از سبد خرید</h3>
          <p className="text-sm text-gray-600 mb-6">آیا از حذف این محصول از سبد خرید اطمینان دارید؟</p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${
              isLoading 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-gray-200 cursor-pointer"
            }`}
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-1">
                <FaSpinner className="animate-spin text-xs" />
                <span>در حال حذف</span>
              </div>
            ) : (
              "تایید"
            )}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default DeleteProductModal; 