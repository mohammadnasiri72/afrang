"use client";

import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import WarrantyModal from "./WarrantyModal";
import { getProductId } from "../../services/products/productService";
import { Modal, message } from "antd";

const AddToCartButton = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const productDetails = await getProductId(product.url);
      if (productDetails.items && productDetails.items[0]) {
        setSelectedProduct(productDetails.items[0]);
        setIsWarrantyModalOpen(true);
      } else {
        message.error("خطا در دریافت اطلاعات محصول");
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      message.error("خطا در دریافت اطلاعات محصول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={handleAddToCart}
        disabled={isLoading}
        className="flex items-center bg-[#d1182b] text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaCartShopping className="" />
        <span className="">{isLoading ? "در حال بارگذاری..." : "افزودن به سبد خرید"}</span>
      </button>

      {selectedProduct && (
        <WarrantyModal
          isOpen={isWarrantyModalOpen}
          onClose={() => setIsWarrantyModalOpen(false)}
          product={selectedProduct}
          onSuccess={() => setShowSuccessModal(true)}
        />
      )}

      <Modal
        title="موفقیت"
        open={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        footer={null}
      >
        <p className="text-center">محصول با موفقیت به سبد خرید اضافه شد</p>
      </Modal>
    </>
  );
};

export default AddToCartButton; 