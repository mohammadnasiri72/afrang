"use client";

import { Modal, Radio } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/cart/cartService";
import { fetchCart } from "../../redux/slices/cartSlice";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { extractProductId } from "../../services/products/productService";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

const WarrantyModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        throw new Error('لطفا ابتدا وارد حساب کاربری خود شوید');
      }
      const userData = JSON.parse(userCookie);
      const userId = userData.userId;

      if (!product?.url) {
        throw new Error('آدرس محصول نامعتبر است');
      }

      const productId = extractProductId(product.url);
      if (!productId) {
        throw new Error('شناسه محصول نامعتبر است');
      }

      await addToCart(productId, selectedWarranty, userId);
      dispatch(fetchCart());
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      Toast.fire({
        icon: "error",
        text: error.message || "خطا در افزودن به سبد خرید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
  };

  return (
    <Modal
      title="انتخاب گارانتی"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div className="flex flex-col gap-4">
        <Radio.Group 
          onChange={(e) => setSelectedWarranty(e.target.value)} 
          value={selectedWarranty}
          className="flex flex-col gap-2"
        >
          {product.warranties && Object.entries(product.warranties).map(([id, title]) => (
            <Radio key={id} value={id} className="text-right">
              {title}
            </Radio>
          ))}
        </Radio.Group>

        <button
          onClick={handleAddToCart}
          disabled={!selectedWarranty}
          className="flex items-center bg-[#d1182b] !text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </Modal>
  );
};

export default WarrantyModal; 